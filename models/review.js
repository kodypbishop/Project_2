module.exports = function (sequelize, DataTypes) {
    var reviews = sequelize.define('reviews', {

        stars: DataTypes.INTEGER,

        review: DataTypes.TEXT
        
    })
    reviews.associate = function (models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        reviews.belongsTo(models.User, {
            foreignKey: "reviewed_id",
            as: "reviewed"
        });
        reviews.belongsTo(models.User, {
            foreignKey: "reviewer_id",
            as: "reviewer"
        });
    };

    return reviews;
    console.log(reviews);
};
