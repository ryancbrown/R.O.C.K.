var db = require("../models");

module.exports = function(app) {
  // Get all events
  app.get("/api/events", function(req, res) {
    db.Example.findAll({}).then(function(dbEvents) {
      res.json(dbEvents);
    });
  });

  // Create a new event
  app.post("/api/events", function(req, res) {
    db.Events.create(req.body).then(function(dbEvents) {
      res.json(dbEvents);
    });
  });

  // Delete an example by id
  app.delete("/api/events/:id", function(req, res) {
    db.Events.destroy({ where: { id: req.params.id } }).then(function(
      dbEvents
    ) {
      res.json(dbEvents);
    });
  });
};
