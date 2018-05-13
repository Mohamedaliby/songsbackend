const AuthenticstionController = require('./controllers/authenticationController')
const AuthenticstionControllerPolicy = require('./policies/AuthenticationControllerPolicy')
var path = require('path')

module.exports = (app) => {
 app.post('/register',
                        AuthenticstionControllerPolicy.register,
                        AuthenticstionController.register),
app.post('/login',
                        AuthenticstionController.login),

app.get('/', (req, res) => {
                        res.sendFile(path.join(__dirname, './dist', '/index.html'));
                })
}