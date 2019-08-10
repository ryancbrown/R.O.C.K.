/* eslint-disable camelcase */
var db = require("../models");
var bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");
var moment = require("moment");
var saltRounds = 10;

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
    db.Artist.findAll({}).then(function(results) {
      res.render("admin", { profiles: results });
    });
  });

  // Handle approval or rejection of profiles
  app.post("/admin/update", function(req, res) {
    if (req.body.action === "approve") {
      db.Artist.update(
        { profile__approved: true, profile__rejected: false },
        { where: { id: req.body.userID } }
      );
    } else {
      db.Artist.update(
        { profile__rejected: true, profile__approved: false },
        { where: { id: req.body.userID } }
      );
    }
  });

  ///////////////////////////////
  //          PROFILE          //
  ///////////////////////////////

  app.get("/profile/update", function(req, res) {
    res.render("profile-input");
  });

  app.post("/profile/update", function(req, res) {
    var request = req.body;
    var route = request.artistName;
    route = route.replace(/\s+/g, "-").toLowerCase();
    var youtubeID = ytParse(request.youtubeDemo);

    db.Artist.update(
      {
        artist__name: request.artistName,
        artist__route_name: route,
        artist__type: request.artistType,
        artist__medium_genre: request.artistMedium,
        artist__audience: request.artistAudience,
        artist__demo_youtube: youtubeID,
        artist__demo__spotify: request.spotifyDemo,
        artist__profile_image: request.profileImage,
        artist__pay_rate: request.artistPay,
        artist__rate_negotiable: request.rateNegotiable,
        artist__social_facebook: request.socialFacebook,
        artist__social_twitter: request.socialTwitter,
        artist__social_youtube: request.socialYoutube
      },
      { where: { artist__login_email: request.user } } // TODO FIGURE OUT HOW TO CHOOSE PROFILE
    );
  });

  function ytParse(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  }

  app.post("/profile/update/contact", function(req, res) {
    var request = req.body;
    db.Artist.update(
      {
        artist__real_name: request.contactName,
        artist__email: request.contactEmail
      },
      { where: { artist__login_email: request.user } } // TODO FIGURE OUT HOW TO CHOOSE PROFILE
    ).then(function(result) {
      console.log("Profile updated!");
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
    var token = Math.random()
      .toString(13)
      .replace(".", "");
    var expireToken = moment().add(6, "h");

    userExists(req.email, hash, token, expireToken); // L77
    res.status(200).json({ token: token });
  });

  function userExists(email, hash, tok, expire) {
    db.Users.findAndCountAll({
      where: {
        email: email
      }
    }).then(function(results) {
      // Check if the email exists
      if (results.count === 1) {
        // eslint-disable-next-line prettier/prettier
        console.log("User \"" + email + "\" exists.");
      } else {
        // If email does not exist add
        db.Users.create({
          email: email,
          password: hash,
          token: tok,
          token_expiration: expire
        }).then(function() {
          createProfile(email);
          assignToken(email, tok, expire);
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
        return res.status(200).json({ message: "Invalid email or password" });
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
            res.status(200).json({ username: req.body.email, token: token });
          } else {
            // Otherwise incorrect password
            return res.status(200).json({
              message: "Invalid email or password"
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
        res.status(200).json({ status: "valid", user: result.email });
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
    db.Users.update({ token: "" }, { where: { token: req.body.token } }).then(
      function(results) {
        res.status(200).json({ token: results.token });
      }
    );
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
    var req = req.body; //form
    var route = req.eventName;
    route = route.replace(/\s+/g, "-").toLowerCase();

    db.Events.create({
      events_route: route,
      event_name: req.eventName,
      event_type: req.eventType,
      event_date: req.eventLocation,
      event_link: req.eventLink,
      event_location: req.eventLocation,
      event_description: req.eventDescription,
      event_image: req.eventImage,
      event_price: req.eventPrice
    }).then(function(err, res) {
      if (err) {
        throw err;
      }
    });
  });

  app.post("/profile/email", function(req, res) {
    db.Artist.findOne({
      where: { artist__route_name: req.body.artist }
    }).then(function(results) {
      console.log("email " + results.artist__route_name);
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PW
        }
      });

      var mailOptions = {
        from: req.body.organizerContact,
        to: results.artist__email,
        subject: req.body.emailSubject,
        text: req.body.emailMessage
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    });
  });

  app.get("/organizer", function(req, res) {
    db.Artist.findAll({
      where: { profile__approved: true }
    }).then(function(results) {
      res.render("organizer", { profiles: results });
    });
  });

  app.get("/error", function(req, res) {
    res.render("error");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
