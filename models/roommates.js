module.exports = function (sequelize, DataTypes) {
  var roommates = sequelize.define('roommmates', {
    ID: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    Email: DataTypes.STRING,
    Gender: DataTypes.STRING,
    Stars: DataTypes.STRING
  })
  roommates.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    roommates.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};
