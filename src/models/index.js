const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}
const Op = Sequelize.Op
// if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
    // the application is executed on Heroku ... use the postgres database
    // var sequelize = new Sequelize(config.db.database,
    // {
    //   dialect:  'postgres',
    //   protocol: 'postgres',
    //   logging:  true //false
    // }) 
    // const models = {
    //     Bookmark: sequelize.import('./Bookmark'),
    //     History: sequelize.import('./History'),
    //     message: sequelize.import('./message'),
    //     Song: sequelize.import('./Song'),
    //     User: sequelize.import('./User'),
    //   };
// }
// else {
        // var sequelize = new Sequelize(
        //     config.heroku.database,
        //     config.heroku.user,
        //     config.heroku.password,
        //     config.heroku.options,
        //     config.heroku.options.operatorsAliases = {
        //         $and: Op.and,
        //         $or: Op.or,
        //         $eq: Op.eq,
        //         $gt: Op.gt,
        //         $lt: Op.lt,
        //         $lte: Op.lte,
        //         $like: Op.like
        //       },
        //         // {
        //         //     dialect:  'postgres',
        //         //     protocol: 'postgres',
        //         //     operatorsAliases: {
        //         //       $and: Op.and,
        //         //       $or: Op.or,
        //         //       $eq: Op.eq,
        //         //       $gt: Op.gt,
        //         //       $lt: Op.lt,
        //         //       $lte: Op.lte,
        //         //       $like: Op.like
        //         //     }
        //         // }
        // )

const sequelize = new Sequelize('postgres://xnambhdaayebef:127b17f798408d13da8222133c77e5895e481d69c207f9cda14c930a4d83784b@ec2-54-225-103-255.compute-1.amazonaws.com:5432/d3uoq91r3cvaq2');
            const models = {
        Bookmark: sequelize.import('./Bookmark'),
        History: sequelize.import('./History'),
        message: sequelize.import('./message'),
        Song: sequelize.import('./Song'),
        User: sequelize.import('./User'),
      };

        
fs
.readdirSync(__dirname)
.filter((file) =>
    file !== 'index.js'
)
.forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
})

    // }

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db