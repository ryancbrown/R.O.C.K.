/* eslint-disable camelcase */
var db = require("../models");
var express = require("express");
var router = express.Router();
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

module.exports = function(app) {
  // Get all events
  app.get("/events", function(req, res) {
    db.Events.findAll({}).then(function(dbEvents) {
      res.render("events", { events: dbEvents });
    });
  });

  //music only
  app.get("/music", function(req, res) {
    db.Events.findAll({
      where: {
        event_type: "Music"
      }
    }).then(function(dbEvents) {
      res.render("music", { events: dbEvents });
    });
  });

  //art only
  app.get("/art", function(req, res) {
    db.Events.findAll({
      where: {
        event_type: "Art"
      }
    }).then(function(dbEvents) {
      res.render("art", { events: dbEvents });
    });
  });

  //performance art only
  app.get("/permart", function(req, res) {
    db.Events.findAll({
      where: {
        event_type: "Performance Arts"
      }
    }).then(function(dbEvents) {
      res.render("permart", { events: dbEvents });
    });
  });

  //other display
  app.get("/other", function(req, res) {
    db.Events.findAll({
      where: {
        event_type: "Other"
      }
    }).then(function(dbEvents) {
      res.render("other", { events: dbEvents });
    });
  });

  // Get all events and display in JSON
  app.get("/api/events", function(req, res) {
    db.Events.findAll({}).then(function(dbEvents) {
      res.json(dbEvents);
    });
  });

  // Create a new events via JSON
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

  app.get("/api/events", function(req, res) {
    db.Events.findAll({
      where: {
        event_type: "Other"
      }
    }).then(function(dbEvents) {
      res.render("other", { events: dbEvents });
    });
  });
};
