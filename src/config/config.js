const config = {
    port:3000,
    db: {
database: process.env.DB_NAME || 'tutorial',
user: process.env.DB_USER || 'tutorial',
password: process.env.DB_PASS || 'tutorial',
options:{
dialect: process.env.DIALECT || 'sqlite',
host: process.env.HOST || 'localhost',
storage: './tutorial.sqlit'
}
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}
module.exports = config;