module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Message', {
        body: DataTypes.STRING,
        sender: DataTypes.STRING
    }, {
        hooks: {
            //  beforeCreate: hashPassword,
            // beforeUpdate: hashPassword,
            //   beforeSave: hashPassword
        }
    })

    return User
}