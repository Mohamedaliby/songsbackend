const {
    Histories,
    User,
    Song
} = require('../models')
const _ = require('lodash')

module.exports = {
    async index(req, res) {
        try {
               console.log(req.query)
            const userId = req.user.id
            const histories = await Histories.findAll({
                where: {
                    UserId: userId
                },
                include: [{
                        model: Song
                    }
                ],
                limit: 10
            })
            .map(history => history.toJSON())
            .map(history => _.extend({
               date: history.createdAt,
               historyId: history.id,
               artist: history.Song.artist,
               title: history.Song.title,
               songId:  history.Song.id}))
               console.log(histories)
            //    histories.map((history) => console.log(history.SongId))
             res.json(_.sortBy(_.uniqBy(histories, 'songId'), 'date'))
        } catch (error) {
            res.status(500).json({
                error
                // error: 'Sorry somthing is wrong.'
            })
            console.log(error)
        }
    },
    async post(req, res) {
        try {
            const userId = req.user.id
            const {songId} = req.body
            const history = await Histories.create({
                SongId: songId,
                UserId: userId
            })
            res.send(history)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'an error has occured trying to create the history object'
            })
        }
    },

}