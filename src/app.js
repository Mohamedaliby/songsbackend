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

socketio.on('connect',()=>{
    console.log('connecting yo')
})

require('./routes')(app)

sequelize.sync()
    .then(() => {
        app.get('server').listen(process.env.PORT || config.port)
        // server.listen(process.env.PORT || config.port)
        console.log(`lestining on port ${config.port}`)
    })
    
    
module.exports = app