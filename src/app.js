const express = require('express')
var path = require('path')
const parser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')
var app = module.exports = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const jwt = require('jsonwebtoken')



/* old code
let sockets = require('./controllers/socketIo')
const I = require('socket.io')(server);
    sockets.init(I)*/

// middleware 
app.use(morgan('combine'))
app.use(parser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')))

// socket.io code
app.set('socketio', io)
app.set('server', server)
var socketio = app.get('socketio')
socketio.use((socket, next) => {
    let token = socket.handshake.query.token;
    console.log(token)
    // if is not working
    if (token == null || typeof token == 'null') {
        console.log('token is null yo')
        return next(new Error('authentication error'));
    }else{
        try {
            jwt.verify(token, 
             config.authentication.jwtSecret)
             console.log('verified yo')
          } catch(err) {
            console.log('no token yo')
            // socket.disconnect();
            // console.log(err)
            return next(new Error('authentication error'));
          }
          return next();
    }
  })
socketio.on('connect', (socket)=>{
    require('./controllers/socketController')(socket)
})

require('./routes')(app)

sequelize.sync()
    .then(() => {
        app.get('server').listen(process.env.PORT || config.port)
        // server.listen(process.env.PORT || config.port)
        console.log(`lestining on port ${config.port}`)
    })
    
    
module.exports = app