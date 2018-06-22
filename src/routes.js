const AuthenticstionController = require('./controllers/authenticationController')
const AuthenticstionControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')
const image = require('./controllers/image')
var path = require('path')

module.exports = (app) => {

 // Users 
 app.post('/register', AuthenticstionControllerPolicy.register, AuthenticstionController.register)
 app.post('/login', AuthenticstionController.login)

 app.get('/', (req, res) => {
                        res.sendFile(path.join(__dirname, './dist', '/index.html'))
                })

// Songs
app.get('/songs', SongsController.index)
app.post('/songs', image.upload, SongsController.post)                     
app.get('/songs/:id', SongsController.show)
app.put('/songs/:id',   image.upload, SongsController.put)
app.delete('/songs/:id',   SongsController.delete)

// Bookmarks
app.get('/bookmarks', BookmarksController.index)
app.post('/bookmarks', BookmarksController.post)
app.delete('/bookmarks/:id', BookmarksController.delete)

}

