/* eslint-disable camelcase */
var db = require("../models");
var bcrypt = require("bcrypt");
var moment = require("moment");
var saltRounds = 10;

//dispaly events page
// module.exports = function(app) {

// };

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Events.findAll({}).then(function() {
      res.render("index", { layout: "landing" });
    });
  });

  ///////////////////////////////
  //           ADMIN           //
  ///////////////////////////////

  // Load admin page with accounts needing review
  app.get("/admin", function(req, res) {
    db.Artist.findAll({
      where: { profile__approved: false }
    }).then(function(results) {
      res.render("admin", { profiles: results });
    });
  });

  // Handle approval or rejection of profiles
  app.post("/admin", function(req, res) {
    if (req.body.action === "approve") {
      db.Artist.update(
        { profile__approved: true },
        { where: { id: req.body.userID } }
      );
    } else {
      db.Artist.update(
        { profile__rejected: true },
        { where: { id: req.body.userID } }
      );
    }
    res.status(200);
  });

  ///////////////////////////////
  //          PROFILE          //
  ///////////////////////////////

  app.get("/profile", function(req, res) {
    res.render("profile-input");
  });

  app.post("/profile", function(req, res) {
    var req = req.body;
    var route = req.artistName;
    route = route.replace(/\s+/g, "-").toLowerCase();

    db.Artist.update({
      artist__route_name: route,
      artist__real_name: req.contactName,
      artist__name: req.artistName,
      artist__email: req.contactEmail,
      artist__medium_genre: req.artistMedium,
      artist__audience: req.artistAudience,
      artist__demo_youtube: req.youtubeDemo,
      artist__demo__spotify: req.spotifyDemo,
      artist__profile_image: req.profileImage,
      artist__pay_rate: req.artistPay,
      artist__rate_negotiable: req.rateNegotiable,
      artist__social_facebook: req.socialFacebook,
      artist__social_twitter: req.socialTwitter,
      artist__social_youtube: req.socialYoutube
    }).then(function(result) {
      //
    });
  });

  app.get("/profile/:routename", function(req, res) {
    db.Artist.findOne({
      where: { artist__route_name: req.params.routename }
    }).then(function(artistdb) {
      res.render("profile", {
        artistProfile: artistdb
      });
    });
  });

  ///////////////////////////////
  //           LOGIN           //
  ///////////////////////////////

  // Handle user creation
  // Collect email and password
  // Salt password and store
  app.post("/login/create", function(req, res) {
    var req = req.body;
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(req.password, salt);

    userExists(req.email, hash); // L77
    res.status(200).json({ redirect: "/profile" });
  });

  function userExists(email, hash) {
    db.Users.findAndCountAll({
      where: {
        email: email
      }
    }).then(function(results) {
      // Check if the email exists
      if (results.count === 1) {
        // eslint-disable-next-line prettier/prettier
        console.log("User \"" + email + "\" created.");
      } else {
        // If email does not exist add
        db.Users.create({
          email: email,
          password: hash
        }).then(function() {
          var token = Math.random()
            .toString(13)
            .replace(".", "");
          var expireToken = moment().add(6, "h");
          createProfile(email);
          assignToken(email, token, expireToken);
          // eslint-disable-next-line prettier/prettier
          console.log("User \"" + email + "\" created.");
        });
      }
    });
  }

  // Handle log in
  // Lookup to see if user exists
  // If so check if password is correct
  app.post("/login", function(req, res) {
    db.Users.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(user) {
      // If user does not exist then return account does not exist
      if (!user) {
        return res.status(200).json({ message: "Invalid email" });
      } else {
        // If exists, then check password
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          // Password is correct
          if (result === true) {
            // Generate session token with expiration
            var token = Math.random()
              .toString(13)
              .replace(".", "");
            var expireToken = moment().add(6, "h");
            // Assign access token to user in database
            assignToken(req.body.email, token, expireToken);
            // Check if Artist profile has been created for user, if not then create one // L77
            checkProfile(req.body.email);
            // Pass access token to client for storage
            res.status(200).json({ token: token, redirect: "/" });
          } else {
            // Otherwise incorrect password
            return res.status(200).json({
              message: "Invalid password"
            });
          }
        });
      }
    });
  });

  // Route to check if stored token is valid
  app.post("/token", function(req, res) {
    db.Users.findOne({
      where: { token: req.body.token }
    }).then(function(result) {
      if (req.body.token === "" || req.body.token === undefined) {
        console.log("No token present.");
      } else if (new Date(result.token_expiration) > new Date()) {
        res.status(200).json({ status: "valid" });
      } else {
        res.status(200).json({ status: "invalid" });
      }
    });
  });

  function assignToken(email, token, tokenExpiration) {
    db.Users.update(
      { token: token, token_expiration: tokenExpiration },
      { where: { email: email } }
    ).then(function() {
      // eslint-disable-next-line prettier/prettier
      console.log("Token updated for \"" + email + "\".");
    });
  }

  function checkProfile(email) {
    db.Artist.findAndCountAll({
      where: {
        artist__login_email: email
      }
    }).then(function(results) {
      if (results.count === 1) {
        // eslint-disable-next-line prettier/prettier
        console.log("Profile for \"" + email + "\" exists.");
      } else {
        createProfile(email);
      }
    });
  }

  function createProfile(email) {
    db.Artist.create({
      artist__route_name: "",
      artist__name: "",
      artist__real_name: "",
      artist__email: "",
      artist__medium_genre: "",
      aritist__audience: "",
      artist__demo_youtube: "",
      artist__demo_spotify: "",
      artist__profile_image: "",
      artist__pay_rate: 0,
      artist__rate_negotiable: false,
      artist__social_facebook: "",
      artist__social_twitter: "",
      artist__social_youtube: "",
      artist__login_email: email
    }).then(function(result) {
      // eslint-disable-next-line prettier/prettier
      console.log("Profile for \"" + email + "\" has been created.");
    });
  }

  // Handle log out
  app.post("/logout", function(req, res) {
    db.Users.update(
      { token_expiration: moment()._d },
      { where: { token: req.body.token } }
    ).then(function() {
      res.status(200).json({ message: "Logout successful" });
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

  //single display of page
  app.get("/events/:route", function(req, res) {
    db.Artist.findOne({
      where: { event_route: req.params.route }
    }).then(function(eventsdb) {
      res.render("events-display", {
        eventsPage: eventsdb
      });
    });
  });

  app.get("/profile/:routename", function(req, res) {
    db.Artist.findOne({
      where: { artist__route_name: req.params.routename }
    }).then(function(artistdb) {
      res.render("profile", {
        artistProfile: artistdb
      });
    });
  });

  ///////////////////////////////
  //          EVENTS          //
  ///////////////////////////////

  //loading the events-submit page
  app.get("/event-submit", function(req, res) {
    res.render("event-submit");
  });

  // eslint-disable-next-line no-unused-vars
  app.post("/event-submit", function(req, res) {
    var request = req.body; //form
    var route = request.eventName; //looking in the form for eventName
    route = route.replace(/\s+/g, "-").toLowerCase(); //remove space for -

    console.log("req body", req.body);

    db.Events.create({
      events_route: route,
      event_name: request.eventName,
      event_type: request.eventType,
      event_date: request.eventLocation,
      event_link: request.eventLink,
      event_location: request.eventLocation,
      event_description: request.eventDescription,
      event_image: request.eventImage,
      event_price: request.eventPrice
    }).then(function(err, res) {
      if (err) {
        throw err;
      }
      console.log("res: ", res);
    });
  });

  app.get("/organizer", function(req, res) {
    db.Artist.findAll({
      where: { profile__approved: true }
    }).then(function(results) {
      res.render("organizer", { profiles: results });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
