// Our Event controller
// =====================
// This file uses Sequelize to manage data manipulation
// for all apropos http requests.
// NOTE: This is the same file from last unit's homework,
// but with each route gutted and replaced with sequelize queries
// where references to our outmoded ORM file once sat.
var express = require("express");

var router = express.Router();
// edit event model to match sequelize
var db = require("../models/");

// get route -> index
router.get("/", function(req, res) {
  // send us to the next get function instead.
  res.redirect("/events");
});

// get route, edited to match sequelize
router.get("/events", function(req, res) {
  // replace old function with sequelize function
  db.Event.findAll()
    // use promise method to pass the events...
    .then(function(dbEvent) {
      console.log(dbEvent);
      // into the main index, updating the page
      var hbsObject = { event: dbEvent };
      return res.render("index", hbsObject);
    });
});

// post route to create events
router.post("/events/create", function(req, res) {
  // edited event create to add in a event_name
  db.Event.create({
    event_name: req.body.event_name
  })
    // pass the result of our call
    .then(function(dbEvent) {
      // log the result to our terminal/bash window
      console.log(dbEvent);
      // redirect
      res.redirect("/");
    });
});

// put route to devour a event
router.put("/events/update/:id", function(req, res) {
  // update one of the events
  db.Event.update({
    devoured: true
  },
  {
    where: {
      id: req.params.id
    }
  }
  ).then(function(dbEvent) {
    res.json("/");
  });
});

module.exports = router;
