module.exports = function (sequelize, DataTypes) {
    var reviews = sequelize.define('reviews', {

<<<<<<< HEAD
        stars: {
            type: DataTypes.INTEGER,
        },
        review: {
            type: DataTypes.TEXT
        },
=======
        stars: DataTypes.INTEGER,

        review: DataTypes.TEXT
        
>>>>>>> d58c422c62646a004cb08410968db1a3936d5bc4
      

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
