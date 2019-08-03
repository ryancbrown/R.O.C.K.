var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Events.findAll({}).then(function(dbEvents) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbEvents
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/events/:id", function(req, res) {
    db.Events.findOne({ where: { id: req.params.id } }).then(function(
      dbEvents
    ) {
      res.render("event", {
        example: dbEvents
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
