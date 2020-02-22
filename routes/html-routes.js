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
    res.render("signup");
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login");
  });


  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    res.render("members");
  });

  app.get("/advancedsearch", isAuthenticated, function (req, res) {
    res.render("advancedsearch");
  });

  app.post("/search", isAuthenticated, function (req, res) {
    console.log("HERE")
    console.log(req.body)
    if (req.body.email) {
      db.User.findAll({
        where: {
          email: req.body.email
        }
      }).then(function (data) {
        console.log(data)
        res.render("search", data)
      })
    } else {
      db.User.findAll({
        where: {
          firstName: req.body.firstName,
          lastName: req.body.lastName
        }
      }).then(function (data) {
        console.log(data)
        res.render("search", data)
      })
    }
  })
  app.get("/profile", isAuthenticated, (req, res) => {
    res.render("profile");
  })

}
