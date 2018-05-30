const app = require('../app')
var socketio = app.get('socketio')
let users = 0

module.exports = (socket) => {
    var addedUser = false
    // let token = socket.handshake.query;
    console.log('connecting yo')
    // console.log(token)
    socket.on('login', (user) => {
        if (addedUser) return;        
        socket.user = user
        socket.id = user.id
        console.log(socket.user)
        console.log(socket.id)
        users++
        console.log(users)
        addedUser = true
        // 1 get followers from database then => socket.friends = user.friends
        // 2 tell this user who is online
        // 3 then emit login to friends
        socket.emit('login', {})
        socket.broadcast.emit('friendOnline', {
            // 1 get followers from database then => socket.friends = user.friends
            // 2 tell friends that user is online
            user: socket.user
        })
        socketio.emit('newUserAdded', {
            user: socket.id
        })
    })

    socket.on('message', (message) => {
        // if(data == 'بعبول'){
        //   console.log('babool')
        //    message = 'حمادة سيدك ياكلب';
        //    socket.broadcast.emit('message', {
        //     username: socket.username,
        //     message: message
        //   })
        // } 
        let namespace = null
        let ns = socketio.of(namespace || "/")
        let socket = ns.connected[message.to] // assuming you have  id of the socket
        if (socket) {
            console.log("Socket Connected, sent through socket")
            // we tell the client to execute 'new message'
            socket.emit("chatMessage", data)
        } else {
            console.log("Socket not connected, sending through push notification")
        }

    })


    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', () => {
        socket.broadcast.emit('typing', {
            user: socket.user
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stop typing', () => {
        socket.broadcast.emit('stop typing', {
            user: socket.user
        });
    });

    // socket.on('disconnect') not io.on('disconnect')
    socket.on('disconnect', () => {
        console.log('Disconnecting yo')
        console.log(socket.id)
        --users
        console.log(users)

        // let friends now user is offline
        // let namespace = null
        // let ns = socketio.of(namespace || "/")

        // for (var id = 0; id < socket.friends.length; id++) {
        //     let onlineFirends = ns.connected[id] // assuming you have  id of the socket
        //     if (onlineFirends) {
        //         console.log("Socket Connected, sent through socket")
        //         // we tell the client to execute 'new message'
        //         toFriends.emit("friendOffline", socket.id)
        //     }
        // }
    })

    socket.on('hello', (data) => {
        console.log(data)
    })

    socketio.emit('userAdded', {
        user: 'token'
    })
    socket.broadcast.emit('newUser', {
        user: 'email'
    })
}