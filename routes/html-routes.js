// Requiring path to so we can use relative routes to our HTML files
let path = require("path");
let db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
let isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login");
  });

  app.get("/signup", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signup");
  });


  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    res.render("members");
  });

  app.get("/advancedsearch", isAuthenticated, function (req, res) {
    res.render("advancedsearch");
  });

  app.get("/search/:data", isAuthenticated, function (req, res) {
    console.log(req.params.data)
    id = req.params.data.split(",")
    id.pop()
    for (let i = 0; i < id.length; i++) {
      id[i] = + id[i];
    }
    console.log(id)

    db.User.findAll({
      where: {
        id: id
      }
    }).then(function (data) {
      let send = []
      data.forEach(element => {
        console.log(element.dataValues)
        let person;
        if (element.dataValues.avatar != null){
            person = {
              id: element.dataValues.id,
              name: element.dataValues.firstName + " " + element.dataValues.lastName,
              avatar: element.dataValues.avatar
            };
        } else {
            person = {
                id: element.dataValues.id,
                name: element.dataValues.firstName + " " + element.dataValues.lastName,
                avatar: "../images/placeholder.png"
              };
        }
        send.push(person)
      });
      console.log(send)
      res.render("search", { person: send });
    })
  })

  app.get("/profile", isAuthenticated, (req, res) => {
        let user = {
          firstName: req.user.firstName,
          lastName: req.user.lastName,
        }
    res.render("profile", user);
  })

  app.get("/rating", isAuthenticated, (req, res) => {
    res.render("rating");
  })

  app.get("/reviews", isAuthenticated, (req, res) => {
    res.render("rating");
  })

  app.get("/review/:id", isAuthenticated, (req, res) => {
    let reviewObj = {
      reviewerId: req.user.id,
      revieweeId: req.params.id
    }
    res.render("rating", reviewObj);
  })

  app.get("/reviews/:id", isAuthenticated, (req, res) => {
    db.sequelize.query(`SELECT review, stars, concat(a.firstName ,' ', a.lastName) as 'reviewee', concat(b.firstName, ' ', b.lastName) as 'reviewer' from reviews left join users a on reviewed_id = a.id left join users b on reviewer_id = b.id where reviewed_id = "${req.params.id}" `)
      .then(function (dbReviews) {
        res.render("viewReviews",{review : dbReviews[0], reviwee : dbReviews[0][0].reviwee});
      })
  })

  
  app.get("/edit-profile", isAuthenticated, (req, res) => {
      console.log(req.user);
      let user = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        gender: req.user.gender,
        pets: req.user.pets,
        children: req.user.children,
      }
      res.render("editProfile", user);
    })
}

