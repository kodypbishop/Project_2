module.exports = function (sequelize, DataTypes) {
    var reviews = sequelize.define('reviews', {
        ID: DataTypes.STRING,
        Stars_ID: DataTypes.STRING,
        roommatesId: DataTypes.STRING

    })
    reviews.associate = function (models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        reviews.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Post;
};