var db = require("../models");
var express = require("express");
var router = express.Router();
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

module.exports = function(app) {
  // Get all events
  app.get("/events", function(req, res) {
    db.Events.findAll({}).then(function(dbEvents) {
      // console.log(dbEvents);
      res.render("events", { events: dbEvents });
    });
  });

  //SEARCH FUNCTION ON EVENT PAGE
  router.get("/search", (req, res) => {
    var { term } = req.query;
      console.log(term);
        db.Events.findAll({ where: { event_description: { [Op.like]: "%" + term + "%" } } })
          .then(events => res.render("events", { events: dbEvents }))
          .catch(err => console.log(err));
      });
  
  // Get all events
  app.get("/api/events", function(req, res) {
    db.Events.findAll({}).then(function(dbEvents) {
      res.json(dbEvents);
    });
  });

  // Create a new events
  app.post("/api/events", function(req, res) {
    db.Events.create(req.body).then(function(dbEvents) {
      res.json(dbEvents);
    });
  });

  // Delete an events by id
  //not in use
  app.delete("/api/events/:id", function(req, res) {
    db.Events.destroy({ where: { id: req.params.id } }).then(function(
      dbEvents
    ) {
      res.json(dbEvents);
    });
  });
};
