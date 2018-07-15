const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

// if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
    // the application is executed on Heroku ... use the postgres database
    var sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
      user: 'xnambhdaayebef',
      password: '127b17f798408d13da8222133c77e5895e481d69c207f9cda14c930a4d83784b',
      dialect:  'postgres',
      protocol: 'postgres',
      port:     5432,
      host:    'ec2-54-225-103-255.compute-1.amazonaws.com',
      logging:  true //false
    }) 
    const models = {
        Bookmark: sequelize.import('./Bookmark'),
        History: sequelize.import('./History'),
        message: sequelize.import('./message'),
        Song: sequelize.import('./Song'),
        User: sequelize.import('./User'),
      };
// }
// else {
//         var sequelize = new Sequelize(
//             config.db.database,
//             config.db.user,
//             config.db.password,
//             config.db.options
//         )

        
// fs
// .readdirSync(__dirname)
// .filter((file) =>
//     file !== 'index.js'
// )
// .forEach((file) => {
//     const model = sequelize.import(path.join(__dirname, file))
//     db[model.name] = model
// })

//     }

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db