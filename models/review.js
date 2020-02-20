module.exports = function(sequelize, DataTypes) {
    var reviews = sequelize.define('reviews', {
        ID: DataTypes.STRING,
        Stars_ID: DataTypes.STRING,
        roommatesId: DataTypes.STRING

    })}