const path = require('path')
if (process.env.NODE_ENV  == 'dev') {
    const dotenv = require('dotenv')

    if (dotenv.config()) {
        const result = dotenv.config()

        if (result.error) {
            throw result.error
        }
    }
}

const config = {
    port: 3000,
    db: {
        database: process.env.DATABASE_URL,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        options: {
            dialect: process.env.DIALECT || 'sqlite' || 'postgres',
            host: process.env.HOST || 'localhost',
            storage: './tutorial.sqlit',
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET
    }
}
module.exports = config;