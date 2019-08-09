//LANDING PAGE JAVASCRIPT

var scrollpos = window.scrollY;
var toToggle = document.querySelectorAll(".toggleColour");

document.addEventListener("scroll", function() {
  /*Apply classes for slide in bar*/
  scrollpos = window.scrollY;

  if (scrollpos > 10) {
    $("#header").addClass("bg-white");
    $("#navaction").remove("bg-white");
    $("#navaction").addClass("bg-white");
    $("#navaction").remove("text-gray-800");
    $("#navaction").addClass("text-white");
    for (var i = 0; i < toToggle.length; i++) {
      toToggle[i].classList.add("text-gray-800");
      toToggle[i].classList.remove("text-white");
    }
    $("#header").addClass("shadow");
    $("#navcontent").remove("bg-gray-100");
    $("#navcontent").addClass("bg-white");
  } else {
    $("#header").remove("bg-white");
    $("#navaction").remove("gradient");
    $("#navaction").addClass("bg-white");
    $("#navaction").remove("text-white");
    $("#navaction").addClass("text-gray-800");
    //Use to switch toggleColour colours
    for (var i = 0; i < toToggle.length; i++) {
      toToggle[i].classList.add("text-white");
      toToggle[i].classList.remove("text-gray-800");
    }
    $("#header").remove("shadow");
    $("#navcontent").remove("bg-white");
    $("#navcontent").addClass("bg-gray-100");
  }
});

//navbar issue when console logged -- error
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
        $("#navMenuDiv").remove("hidden");
      } else {
        $("#navMenuDiv").addClass("hidden");
      }
    } else {
      // click both outside link and outside menu, hide menu
      $("#navMenuDiv").addClass("hidden");
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
