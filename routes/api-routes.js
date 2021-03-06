// Requiring our models and passport as we've configured it
let db = require("../models");
let passport = require("../config/passport");
let isAuthenticated = require("../config/middleware/isAuthenticated");
const { QueryTypes } = require('sequelize');

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        gender: req.user.gender,
        pets: req.user.pets,
        job: req.user.job,
        children: req.user.children,
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/api/user_data/:id", (req, res) => {
    db.User.findOne({ where: { id: req.params.id } }).then(function (dbUser) {
      res.json(dbUser);
    })
  })


  app.post("/search", isAuthenticated, function (req, res) {
    console.log("HERE")
    console.log(req.user)
    console.log("USER")
    if (req.body.email) {
      db.User.findAll({
        where: {
          email: req.body.email
        }
      }).then(function (data) {
        let send = ""
        data.forEach(element => {
          send += element.dataValues.id + ","
        });
        res.send('/search/' + send);
      });
    } if (req.body.firstName && req.body.lastName) {
      db.User.findAll({
        where: {
          firstName: req.body.firstName,
          lastName: req.body.lastName
        }
      }).then(function (data) {
        let send = ""
        data.forEach(element => {
          send += element.dataValues.id + ","
        });
        res.send('/search/' + send);
      })

    } else {
      db.User.findAll({
        where: {
          firstName: req.body.firstName
        }
      }).then(function (data) {
        let send = ""
        data.forEach(element => {
          send += element.dataValues.id + ","
        });
        res.send('/search/' + send);
      })
    }
  })

  app.post("/api/searchbar", isAuthenticated, function (req, res) {
    console.log("HERE")
    console.log(req.body)

    if (req.body.search.trim().indexOf("@") > -1) {
      db.User.findAll({
        where: {
          email: req.body.search.trim()
        }
      }).then(function (data) {
        let send = ""
        data.forEach(element => {
          send += element.dataValues.id + ","
        });
        res.send('/search/' + send);
      });


    } if (req.body.search.trim().indexOf(" ") > -1) {
      let name = req.body.search.trim().split(" ")
      db.User.findAll({
        where: {
          firstName: name[0],
          lastName: name[1]
        }
      }).then(function (data) {
        let send = ""
        data.forEach(element => {
          send += element.dataValues.id + ","
        });
        res.send('/search/' + send);
      })

    } else {
      db.User.findAll({
        where: {
          firstName: req.body.search.trim()
        }
      }).then(function (data) {
        let send = ""
        data.forEach(element => {
          send += element.dataValues.id + ","
        });
        res.send('/search/' + send);
      })
    }
  })

  app.post("/api/review_data", (req, res) => {
    console.log(res.body)
    db.reviews.create({
      review: req.body.content,
      reviewed_id: req.body.reviewee,
      reviewer_id: req.body.reviewer,
      stars: req.body.stars
    }).then(function(data){
      res.send("/members")
    })
  })

  app.get("/api/review_data", (req, res) => {
    res.json({
      stars: req.reviews.firstName,
      review: req.reviews.review,
      id: req.reviews.id
    });
  });
  app.patch("/api/user", (req, res) => {
    console.log("you did it")
    console.log(req.body)
    db.User.update({ avatar: req.body.url },
      {
        where: {
          id: req.user.id
        }
      }

    ).then(function (data) {
      res.send.data
    })
  })
  app.post("/api/user", (req, res) => {
    console.log("you did it")
    console.log(req.body)
    db.User.update(
      { 
      gender: req.body.gender,
      pets: req.body.pets,
      children: req.body.children,
      job: req.body.jobs
    },
      {
        where: {
          id: req.user.id
        }
      }

    ).then(function (data) {
      res.send("/profile")
    })
  })


  //app.get("/api/profile"), (req, res) => {
  //console.log(req.user)
  //res.json({
  //firstName: req.user.firstName, 
  //lastName: req.user.lastName,
  //gender: req.user.gender, 
  //stars: req.user.stars
  // });
  // }}

  app.get("/reviews/:id", isAuthenticated, (req, res) => {
    sequelize.query(`SELECT reviews, stars, concat(a.firstName,' ',a.lastName) as 'reviwee', concat(b.firstName,' ',b.lastName) as 'reviwer' from reviews left join users a on reviewed_id = b.id left join users b on reviewer_id = b.id where id = "${req.params.id}" `)
      .then(function (dbReviews) {
        console.log(dbReviews);
        res.render("viewReviews");
      })
  })

}
