const path = require('path')
require('dotenv').config();

const config = {
    port: process.env.DATABASE_URL || 3000,
    db: {
        database: process.env.DATABASE_URL ,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './tutorial.sqlit'
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET
    }
}
module.exports = config;