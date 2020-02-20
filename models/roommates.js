module.exports = function(sequelize, DataTypes) {
    var roommates = sequelize.define('roommmates', {
        ID:   DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        Email: DataTypes.STRING,
        Gender: DataTypes.STRING,
        Stars: DataTypes.STRING
    })}

