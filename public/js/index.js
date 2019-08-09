var token = { token: localStorage.getItem("token") };
console.log(token);
// On page load send stored token to server
if (token !== "") {
  $.post("/token", token).then(function(res) {
    if (res.status === "valid") {
      // Change "Log in" to "Logout", change id to "logout" so database can be updated if clicked
      $("#loadLogin")
        .text("Logout")
        .attr({ id: "logout" });

      $("#options").append(
        // eslint-disable-next-line prettier/prettier
        "<div class=\"text-sm lg:flex-grow text-right w-1/12\"><a href=\"/profile\" class=\"block mt-4 lg:inline-block lg:mt-0 text-purple-800 hover:text-purple-400 mr-4 text-right\">Profile</a></div>"
      );

      $(".align")
        .removeClass("w-10/12")
        .addClass("w-9/12");
    }
  });
}

// EVENT PAGE EVENT CLICKS
// add in the event clicks for that ther
$("#eventSubmit").on("click", function(event) {
  event.preventDefault();

  var form = {
    eventName: $("#eventName").val(),
    eventType: $("#eventType").val(),
    eventLocation: $("#eventLocation").val(),
    eventLink: $("#eventLink").val(),
    eventImage: $("#eventImage").val(),
    eventDate: $("#eventDate").val(),
    eventDescription: $("#eventDescription").val(),
    eventPrice: $("#eventPrice").val()
  };

<<<<<<< HEAD
  // console.log(form);
  // event submit AJAX post
  $.post("/event-submit", form).then(function(req, res) {
    console.log("res post index.js" + res);
=======
  // event submit AJAX post
  $.post("/event-submit", form).then(function(req, res) {
    //
>>>>>>> c5e78b2c4120a02fa5cd5ed4951c29ce1ae826d9
  });
});

// Handle booking modal
$("#bookArtist").on("click", function() {
  $("#modal").toggleClass("hidden");
});

$("#modalClose").on("click", function() {
  $("#modal").toggleClass("hidden");
});

// Handle login buttons
// Show initial login button
$("#loadLogin").on("click", function(e) {
  e.preventDefault();
  // If user clicks "login" and newAccount is visible
  if (
    $("#newAccount").hasClass("visible") &&
    $("#existingAccount").hasClass("hidden")
  ) {
    // Then remove newAccount
    $("#newAccount")
      .toggleClass("hidden")
      .removeClass("visible");
  } else {
    $("#existingAccount")
      .toggleClass("hidden")
      .addClass("visible");
  }
});

// Switch to create account
$("#loadNewAccount").on("click", function(e) {
  e.preventDefault();
  $("#existingAccount")
    .toggleClass("hidden")
    .removeClass("visible");
  $("#newAccount")
    .toggleClass("hidden")
    .addClass("visible");
});

// Handle username and password creation
$("#createLogin").on("click", function(e) {
  e.preventDefault();

  var createLogin = {
    email: $("#createEmail").val(),
    password: $("#createPassword").val()
  };

  $.post("/login/create", createLogin, function(res) {
    localStorage.setItem("token", res.token);
    window.location.href = window.location.href;
  });
});

// Update profile
$("#profileSubmit").on("click", function(event) {
  event.preventDefault();
  var u = localStorage.getItem("user");

  var profile = {
    profileImage: $("#profileImage").val(),
    socialFacebook: $("#socialFacebook").val(),
    socialTwitter: $("#socialTwitter").val(),
    socialYoutube: $("#socialYoutube").val(),
    artistType: $("#artistType").val(),
    artistName: $("#artistName").val(),
    artistMedium: $("#artistGenre").val(),
    youtubeDemo: $("#youtubeDemo").val(),
    spofitfyDemo: $("#youtubeDemo").val(),
    artistAudience: $("#artistAudience").val(),
    artistPay: $("#artistPay").val(),
    rateNegotiable: $("#rateCheckBox").is(":checked"),
    user: u
  };

  var imageURL = $("#profileImage").val();
  var name = $("#artistName").val();
  var type = $("#artistType").val();
  var genre = $("#artistGenre").val();
  var audience = $("#artistAudience").val();
  var payrate = $("#artistPay").val();

  // Validate submission
  if (
    imageURL === "" ||
    name === "" ||
    type === "" ||
    genre === "" ||
    audience === "" ||
    (payrate === "" || isNaN(payrate))
  ) {
    $(".success-profile").html("");
    $(".submitProfileError").html(
      "<em>Please fill out all required fields</em>"
    );
  } else {
    $.post("/profile/update", profile).then(tabData());
  }
});

// Update contact
$("#contactSubmit").on("click", function(event) {
  event.preventDefault();
  var u = localStorage.getItem("user");

  var contact = {
    contactName: $("#contactName").val(),
    contactEmail: $("#contactEmail").val(),
    user: u
  };

  var contactFromName = $("#contactName").val();
  var contactFromEmail = $("#contactEmail").val();

  // Validate submission
  if (contactFromName === "" || contactFromEmail === "") {
    $(".success-contact").html("");
    $(".submitContactError").html(
      "<em>Please fill out all required fields</em>"
    );
  } else {
    $.post("/profile/update/contact", contact).then(tabData());
  }
});

// Show login button again if accidentally clicked "create account"
$("#returnLogin").on("click", function(e) {
  e.preventDefault();
  $("#newAccount")
    .toggleClass("hidden")
    .removeClass("visible");
  $("#existingAccount").toggleClass("hidden");
});

// Handle log in
$("#login").on("click", function(e) {
  e.preventDefault();

  $.post("/login", {
    email: $("#emailLogin").val(),
    password: $("#passwordLogin").val()
  }).then(function(res) {
    // If correct store session token
    localStorage.setItem("user", res.username);
    localStorage.setItem("token", res.token);

    if (res.message === undefined) {
      window.location.href = window.location.href;
    } else {
      // If error return reason
      $(".error").html(res.message);
    }
  });
});

// Handle log out
$(document).on("click", "#logout", function() {
  var token = { token: localStorage.getItem("token") };

  $.post("/logout", token).then(function(res) {
    console.log(res.message);
  });
});

// Handle dynamic tabs
// Admin
if (window.location.pathname === "/admin") {
  $(document).on("click", ".tab", function() {
    if ($(this).text() === "Approved") {
      updateTab("#approvedUsers", "#approvedTab");
    } else if ($(this).text() === "Rejected") {
      updateTab("#rejectedUsers", "#rejectedTab");
    } else {
      updateTab("#reviewUsers", "#reviewTab");
    }
  });
}

// Profile
if (window.location.pathname === "/profile/update") {
  var music = [
    "Acapella",
    "Acid Jazz",
    "Acid Punk",
    "Acid",
    "Acoustic",
    "Alternative",
    "AlternRock",
    "Ambient",
    "Avantgarde",
    "Ballad",
    "Bass",
    "Bebob",
    "Big Band",
    "Bluegrass",
    "Blues",
    "Booty Bass",
    "Cabaret",
    "Celtic",
    "Chamber Music",
    "Chanson",
    "Chorus",
    "Christian Rap",
    "Classic Rock",
    "Classical",
    "Club",
    "Comedy",
    "Country",
    "Cult",
    "Dance Hall",
    "Dance",
    "Darkwave",
    "Death Metal",
    "Disco",
    "Dream",
    "Drum Solo",
    "Duet",
    "Easy Listening",
    "Electronic",
    "Ethnic",
    "Euro-House",
    "Euro-Techno",
    "Eurodance",
    "Fast Fusion",
    "Folk-Rock",
    "Folk",
    "Folklore",
    "Freestyle",
    "Funk",
    "Fusion",
    "Gangsta",
    "Gospel",
    "Gothic Rock",
    "Gothic",
    "Grunge",
    "Hard Rock",
    "Hip-Hop",
    "House",
    "Humour",
    "Industrial",
    "Instrumental Pop",
    "Instrumental Rock",
    "Instrumental",
    "Jazz",
    "Jazz+Funk",
    "Jungle",
    "Latin",
    "Lo-Fi",
    "Meditative",
    "Metal",
    "Musical",
    "National Folk",
    "Native American",
    "New Age",
    "New Wave",
    "Noise",
    "Oldies",
    "Opera",
    "Other",
    "Polka",
    "Pop-Folk",
    "Pop",
    "Pop/Funk",
    "Porn Groove",
    "Power Ballad",
    "Pranks",
    "Primus",
    "Progressive Rock",
    "Psychadelic",
    "Psychedelic Rock",
    "Punk Rock",
    "Punk",
    "R&B",
    "Rap",
    "Rave",
    "Reggae",
    "Retro",
    "Revival",
    "Rhythmic Soul",
    "Rock & Roll",
    "Rock",
    "Samba",
    "Satire",
    "Showtunes",
    "Ska",
    "Slow Jam",
    "Slow Rock",
    "Sonata",
    "Soul",
    "Soundtrack",
    "Southern Rock",
    "Space",
    "Speech",
    "Swing",
    "Symphonic Rock",
    "Symphony",
    "Tango",
    "Techno-Industrial",
    "Techno",
    "Top 40",
    "Trailer",
    "Trance",
    "Tribal",
    "Trip-Hop",
    "Vocal"
  ];

  var artist = [
    "Architecture",
    "Carpentry",
    "Ceramics",
    "Drawing",
    "Electronic",
    "Film",
    "Food",
    "Glass",
    "Light",
    "Literature",
    "Natural World",
    "Painting",
    "Photography",
    "Printmaking",
    "Sculpture",
    "Sound",
    "Textiles"
  ];

  var performance = [
    "Circus Arts",
    "Dance",
    "Illusion",
    "Magic",
    "Mime",
    "Musical Theater",
    "Opera",
    "Pupetry",
    "Theatre",
    "Spoken Word"
  ];

  $("#artistType").on("change", function() {
    var select = $("#artistType").val();

    if (select === "Music") {
      $("#artistGenre").html("");
      for (var i = 0; i < music.length; i++) {
        $("#artistGenre").append("<option>" + music[i] + "</option>");
      }
    } else if (select === "Artist") {
      $("#artistGenre").html("");
      for (var i = 0; i < artist.length; i++) {
        $("#artistGenre").append("<option>" + artist[i] + "</option>");
      }
    } else if (select === "Performance Art") {
      $("#artistGenre").html("");
      for (var i = 0; i < performance.length; i++) {
        $("#artistGenre").append("<option>" + performance[i] + "</option>");
      }
    }
  });

  $(document).on("click", ".tab", function() {
    if ($(this).text() === "Profile Information") {
      updateTab("#profileInfo", "#profileTab");
    } else if ($(this).text() === "Contact Information") {
      updateTab("#contactInfo", "#contactTab");
    }
  });
}

// Tab selector logic
function updateTab(tab, activeTab) {
  $(".activeTab")
    .removeClass(
      "border-l border-t border-r rounded-t activeTab text-purple-700"
    )
    .addClass("text-purple-500");
  $(".active")
    .addClass("hidden")
    .removeClass("active");
  $(tab)
    .toggleClass("hidden")
    .addClass("active");
  $(activeTab)
    .removeClass("text-purple-500")
    .addClass("border-l border-t border-r rounded-t activeTab text-purple-700");
}

// If updating user profiles in admin store active tab so tab can be reselected after page reload
if (window.location.pathname === "/admin") {
  var u = localStorage.getItem("user");
  var checkActive = localStorage.getItem("active");

  if (u !== "admin") {
    window.location.href = "/error";
  } else if (checkActive !== null) {
    updateTab(
      "#" + localStorage.getItem("active"),
      "#" + localStorage.getItem("activeTab")
    );
    // Delete stored tab information once loaded
    localStorage.removeItem("active");
    localStorage.removeItem("activeTab");
  } else {
    // If no tab is stored default to review
    updateTab("#reviewUsers", "#reviewTab");
  }
}

// If updating user profiles in profile store active tab so tab can be reselected after page reload
if (window.location.pathname === "/profile/update") {
  var u = localStorage.getItem("user");
  var checkActive = localStorage.getItem("active");

  if (checkActive !== null) {
    var tab = localStorage.getItem("active");

    updateTab(
      "#" + localStorage.getItem("active"),
      "#" + localStorage.getItem("activeTab")
    );

    // Show success message based on tab updated
    if (tab === "contactInfo") {
      $(".success-contact").toggleClass("hidden");
    } else {
      $(".success-profile").toggleClass("hidden");
    }
    // Delete stored tab information once loaded
    localStorage.removeItem("active");
    localStorage.removeItem("activeTab");
  } else {
    // If no tab is stored default to review
    updateTab("#profileInfo", "#profileTab");
  }
}

// If updating user profiles in organizer store active tab so tab can be reselected after page reload

$(document).on("click", ".actionProfile", function() {
  var action = {
    userID: $(this).data("user"),
    action: $(this).data("outcome")
  };

  $.post("/admin/update", action).then(tabData());
});
<<<<<<< HEAD
=======

function tabData() {
  var active = $(".active").attr("id");
  var activeTab = $(".activeTab").attr("id");
  // Store active tab info
  localStorage.setItem("active", active);
  localStorage.setItem("activeTab", activeTab);
  // Reload
  window.location.href = window.location.href;
}

//LANDING PAGE JAVASCRIPT
var scrollpos = window.scrollY;
var header = document.getElementById("header");
var navcontent = document.getElementById("nav-content");
var navaction = document.getElementById("navAction");
// eslint-disable-next-line no-unused-vars
var brandname = document.getElementById("brandname");
var toToggle = document.querySelectorAll(".toggleColour");

document.addEventListener("scroll", function() {
  /*Apply classes for slide in bar*/
  scrollpos = window.scrollY;

  if (scrollpos > 10) {
    header.classList.add("bg-white");
    navaction.classList.remove("bg-white");
    navaction.classList.add("gradient");
    navaction.classList.remove("text-gray-800");
    navaction.classList.add("text-white");
    //Use to switch toggleColour colours
    for (var i = 0; i < toToggle.length; i++) {
      toToggle[i].classList.add("text-gray-800");
      toToggle[i].classList.remove("text-white");
    }
    header.classList.add("shadow");
    navcontent.classList.remove("bg-gray-100");
    navcontent.classList.add("bg-white");
  } else {
    header.classList.remove("bg-white");
    navaction.classList.remove("gradient");
    navaction.classList.add("bg-white");
    navaction.classList.remove("text-white");
    navaction.classList.add("text-gray-800");
    //Use to switch toggleColour colours
    for (var i = 0; i < toToggle.length; i++) {
      toToggle[i].classList.add("text-white");
      toToggle[i].classList.remove("text-gray-800");
    }

    header.classList.remove("shadow");
    navcontent.classList.remove("bg-white");
    navcontent.classList.add("bg-gray-100");
  }
});

var navMenuDiv = document.getElementById("nav-content");
var navMenu = document.getElementById("nav-toggle");

document.onclick = check;
function check(e) {
  var target = (e && e.target) || (event && event.srcElement);

  //Nav Menu
  if (!checkParent(target, navMenuDiv)) {
    // click NOT on the menu
    if (checkParent(target, navMenu)) {
      // click on the link
      if (navMenuDiv.classList.contains("hidden")) {
        navMenuDiv.classList.remove("hidden");
      } else {
        navMenuDiv.classList.add("hidden");
      }
    } else {
      // click both outside link and outside menu, hide menu
      // navMenuDiv.classList.add("hidden");
    }
  }
}
function checkParent(t, elm) {
  while (t.parentNode) {
    // eslint-disable-next-line eqeqeq
    if (t == elm) {
      return true;
    }
    t = t.parentNode;
  }
  return false;
}
>>>>>>> c5e78b2c4120a02fa5cd5ed4951c29ce1ae826d9
