const {
    User
} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const sockets = require('./socketIo');
const app = require('../app')

var socketio = app.get('socketio')

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    register(req, res) {
        console.log(req.body)
        const user = User.create(req.body)
            .then((user) => {
                const userJson = user.toJSON()
                let sentUser = {
                    email: userJson.email,
                    id: userJson.id
                }
                res.json({
                    user: sentUser,
                    token: jwtSignUser(sentUser)
                })

            })
            .catch((err) => {
                let error = 'Email already in use'
                // console.log(err)
                res.status(405).json(error)
            })
    },

    login(req, res) {
        console.log(req.body)
        const {
            email,
            password
        } = req.body;
        const user = User.findOne({
                where: {
                    email: email
                }
            })
            .then((user) => {

                if (!user) {
                    let error = 'the login information was incorrect'
                    res.status(403).json(error)
                }
                if (user) {
                    // console.log(password)
                    user.comparePassword(password)
                        .then(result => {
                            if (!result) {
                                // console.log(result)
                                let error = 'the login information was incorrect'
                                res.status(403).json(error)
                            } else {
                                const userJson = user.toJSON()
                                let sentUser = {
                                    email: userJson.email,
                                    id: userJson.id
                                }
                                res.json({
                                    user: sentUser,
                                    token: jwtSignUser(sentUser)
                                })

                            }
                        })
                        .catch(err => {
                            let error = 'something is wrong'
                            res.status(403).json(err)
                        })

                    /* without promises
                     if (!isPasswordValid) {
                         let error = 'the login information was incorrect'
                         res.status(403).json(error)
                     } else {
                         const userJson = user.toJSON()
                         res.json({
                             user: userJson,
                             token: jwtSignUser(userJson)
                         })
                     } */
                }
            })
        // .catch((err) => {
        //     console.log(err)
        //     let error ='no user found'
        //     res.status(500).json(error)
        // })
    }
}





/* using promises

function createUser(body) {
    return new Promise((resolve, reject) => {
        const user = User.create(body)
        if (err) {
            reject(err)
        } else {
            resolve(user)
        }
    })

}
module.exports = {
    register(req, res) {
        console.log(req.body)
        createUser(req.body)
            .then((user) => {
                // console.log(user)
                res.send(user.toJson())
            })
            .catch((err) => {
                console.log("something's worng")
                // res.status(405).send("wrong")
            })
    }
} */


/* using async

async register(req, res) {
    try {
        const user = await User.create(req.body)
        console.log(user)
        res.send(user.toJson())
    } catch (err) {
        res.status(400).send({
            error: 'this account is already in use'
        })
    }

} */