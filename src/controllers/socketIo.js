let io;
let eSocket;
function init(_io) {
  console.log('sockets')
  io = _io
  io.on('connect', onConnect)
//   io.on('hello',(data)=>{
//     console.log('yes')
// })

}
// io.on('connect', onConnect)
function onConnect(socket) {
  eSocket = socket
  console.log('connecting yo')
  socket.on('hello',(data)=>{
    console.log('data')
})
socket.on('disconnect', () => {
  let user = {
    name:'qwer'
  }
    // echo globally that this client has left
    socket.broadcast.emit('user left', user);
  
});
}
function hello(data) {
  console.log('hello working')
 io.emit('hello', data)
}
module.exports = {
init,
io:io,
hello
}

// io = module.exports = io