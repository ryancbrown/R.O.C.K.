//EVENT PAGE EVENT CLICSKS
// add in the event licks for that there
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

  console.log("form" + JSON.stringify(form));
  // event submit AJAX post
  $.post("/event-submit", form).then(function(req, res) {
    console.log(res);
  });
});

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

/* Login */
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

$("#loadNewAccount").on("click", function(e) {
  e.preventDefault();
  $("#existingAccount")
    .toggleClass("hidden")
    .removeClass("visible");
  $("#newAccount")
    .toggleClass("hidden")
    .addClass("visible");
});

$("#returnLogin").on("click", function(e) {
  e.preventDefault();
  $("#newAccount")
    .toggleClass("hidden")
    .removeClass("visible");
  $("#existingAccount").toggleClass("hidden");
});

$("#createLogin").on("click", function(e) {
  e.preventDefault();

  var createLogin = {
    email: $("#createEmail").val(),
    password: $("#createPassword").val()
  };

  $.post("/login/create", createLogin).then(function(res) {
    console.log(res);
  });
});

$("#login").on("click", function(e) {
  e.preventDefault();

  var findLogin = {
    email: $("#emailLogin").val(),
    password: $("#passwordLogin").val()
  };

  $.post("/login", findLogin).then(function(res) {
    console.log(res);
    $(".error").html(res.message);
  });
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
