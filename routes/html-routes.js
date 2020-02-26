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
    for(let i=0; i<id.length;i++){
     id[i] = + id[i];
    }
    console.log(id)

    db.User.findAll({
      where: {
        id : id
      }
    }).then(function (data) {
      let send = []
      data.forEach(element => {
        console.log(element.dataValues)
       let person ={
         id:element.dataValues.id,
         name : element.dataValues.firstName + " " + element.dataValues.lastName,

       };
        send.push(person)
      });
      console.log(send)
      res.render("search",{person:send});
    })
  })

  app.get("/profile", isAuthenticated, (req, res) => {
    res.render("profile");
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
    //   db.reviews.findAll({where: {reviewed_id: req.params.id},
      db.reviews.findAll({where: {reviewed_id: req.params.id},
        
        include: db.Users
        
    
        
    }).then(function(dbReviews) {
        console.log(dbReviews);
        res.render("viewReviews");
      })
  })


}
