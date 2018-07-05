module.exports = (sequelize, DataTypes) => {
    const Histories = sequelize.define('Histories', {})
  
    Histories.associate = function (models) {
      Histories.belongsTo(models.User)
      Histories.belongsTo(models.Song)
    }
  
    return Histories
  }