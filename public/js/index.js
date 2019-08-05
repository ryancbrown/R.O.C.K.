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
