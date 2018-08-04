// const router = express.Router()
const AuthenticstionController = require('./controllers/authenticationController')
const AuthenticstionControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')
const HistoriesController = require('./controllers/historiesController')
const isAuthenticated = require('./policies/isAuthenticated')

const image = require('./controllers/image')
var path = require('path')

module.exports = (app) => {

        // passport
        // app.post('*', isAuthenticated)
        app.put('*', isAuthenticated)
        app.delete('*', isAuthenticated)

        // Users 
        app.post('/register', AuthenticstionControllerPolicy.register, AuthenticstionController.register)
        app.post('/login', AuthenticstionController.login)

        app.get('/', (req, res) => {
                res.sendFile(path.join(__dirname, './dist', '/index.html'))
        })

        // Songs
        app.get('/songs', SongsController.index)
        // app.post('/songs', isAuthenticated, image.upload, SongsController.post)

        app.post('/songs', image.memoryUpload, SongsController.post)
        // app.post('/songs', image.memoryUpload, (req, res) => {
        //         console.log('Upload Image')
        //         let file = req.file;
        //         console.log(file)

        //         if (file) {
        //           image.upload(file).then((success) => {
        //             res.status(200).send({
        //               status: 'success'
        //             })
        //           }).catch((error) => {
        //                 res.status(504).json({
        //                         error: error
        //                       })
        //             console.error(error);
        //           })
        //         }
        //       })
        app.get('/songs/:id', SongsController.show)
        app.put('/songs/:id', image.upload, SongsController.put)
        app.delete('/songs/:id', SongsController.delete)

        // Bookmarks
        app.get('/bookmarks', isAuthenticated, BookmarksController.index)
        // app.get('/bookmarks/all', BookmarksController.getall) only for debugging
        app.post('/bookmarks', isAuthenticated, BookmarksController.post)
        app.delete('/bookmarks/:id', BookmarksController.delete)

        // History and recent views
        app.get('/history', isAuthenticated, HistoriesController.index)
        app.post('/history', isAuthenticated, HistoriesController.post)

}