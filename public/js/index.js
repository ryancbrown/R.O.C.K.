var token = { token: localStorage.getItem("token") };

// On page load send stored token to server
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

  console.log(form);
  // event submit AJAX post
  $.post("/event-submit", form).then(function(req, res) {
    console.log(res);
  });
});

// Handle booking modal
//PROFILE CLICKS
$("#profileSubmit").on("click", function(event) {
  event.preventDefault();

  var form = {
    contactName: $("#realName").val(),
    contactEmail: $("#email").val(),
    profileImage: $("#profileImage").val(),
    artistName: $("#artistName").val(),
    artistMedium: $("#artistGenre").val(),
    youtubeDemo: $("#youtubeDemo").val(),
    spofitfyDemo: $("#youtubeDemo").val(),
    artistAudience: $("#artistAudience").val(),
    socialFacebook: $("#socialFacebook").val(),
    socialTwitter: $("#socialTwitter").val(),
    socialYoutube: $("#socialYoutube").val(),
    artistPay: $("#artistPay").val(),
    rateNegotiable: $("#rateCheckBox").is(":checked")
  };

  $.post("/profile", form).then(function(req, res) {
    console.log(res);
  });
});

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
    window.location = res.redirect;
  });
});

// Create profile
$("#profileSubmit").on("click", function(event) {
  event.preventDefault();

  var form = {
    contactName: $("#realName").val(),
    contactEmail: $("#email").val(),
    profileImage: $("#profileImage").val(),
    artistName: $("#artistName").val(),
    artistMedium: $("#artistGenre").val(),
    youtubeDemo: $("#youtubeDemo").val(),
    spofitfyDemo: $("#youtubeDemo").val(),
    artistAudience: $("#artistAudience").val(),
    socialFacebook: $("#socialFacebook").val(),
    socialTwitter: $("#socialTwitter").val(),
    socialYoutube: $("#socialYoutube").val(),
    artistPay: $("#artistPay").val(),
    rateNegotiable: $("#rateCheckBox").is(":checked")
  };

  $.post("/profile", form).then(function(req, res) {
    console.log(res);
  });
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

  var findLogin = {
    email: $("#emailLogin").val(),
    password: $("#passwordLogin").val()
  };

  $.post("/login", findLogin).then(function(res) {
    // If correct store session token
    localStorage.setItem("token", res.token);
    // If error return reason
    $(".error").html(res.message);
  });
});

$(document).on("click", "#logout", function() {
  var token = { token: localStorage.getItem("token") };

  $.post("/logout", token).then(function(res) {
    console.log(res.message);
  });
});

// Handle dynamic tabs
// Admin
$(document).on("click", ".tab", function() {
  if ($(this).text() === "Approved") {
    updateTab("#approvedUsers", "#approvedTab");
  } else if ($(this).text() === "Rejected") {
    updateTab("#rejectedUsers", "#rejectedTab");
  } else {
    updateTab("#reviewUsers", "#reviewTab");
  }
});

// Tab logic
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

$(document).on("click", ".actionProfile", function() {
  var action = {
    userID: $(this).data("user"),
    action: $(this).data("outcome")
  };

  $.post("/admin", action).then(location.reload());
});
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
