const path = require('path')
// const dotenv = require('dotenv')

// if (dotenv.config()) {
// const result = dotenv.config()

// if (result.error) {
//  throw result.error
// }
// }

const config = {
    port: 3000,
    db: {
        database: process.env.DATABASE_URL || 'postgres://xnambhdaayebef:127b17f798408d13da8222133c77e5895e481d69c207f9cda14c930a4d83784b@ec2-54-225-103-255.compute-1.amazonaws.com:5432/d3uoq91r3cvaq2' ,
        user: process.env.DB_USER || 'xnambhdaayebef',
        password: process.env.DB_PASS || '127b17f798408d13da8222133c77e5895e481d69c207f9cda14c930a4d83784b',
        options: {
            // dialect: process.env.DIALECT || 'sqlite' || 'postgres',
            dialect: 'postgres',
            protocol: 'postgres',
            host: process.env.HOST || 'localhost' || 'ec2-54-225-103-255.compute-1.amazonaws.com',
            port :'5432',
            storage: './tutorial.sqlit',
        }
    },
    heroku: {
        database: 'postgres://xnambhdaayebef:127b17f798408d13da8222133c77e5895e481d69c207f9cda14c930a4d83784b@ec2-54-225-103-255.compute-1.amazonaws.com:5432/d3uoq91r3cvaq2' ,
        user:'xnambhdaayebef',
        password: '127b17f798408d13da8222133c77e5895e481d69c207f9cda14c930a4d83784b',
        options: {
            dialect: 'postgres',
            protocol: 'postgres',
            host: 'ec2-54-225-103-255.compute-1.amazonaws.com',
            port :'5432',
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET
    }
}
module.exports = config;