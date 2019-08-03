$("#profileSubmit").on("click", function(event) {
  event.preventDefault();

  var social = JSON.stringify([
    {
      facebook: $("#facebookAdd").val(),
      twitter: $("#twitterAdd").val(),
      youtube: $("#youtubeAdd").val()
    }
  ]);

  var form = {
    contactName: $("#realName").val(),
    contactEmail: $("#email").val(),
    profileImage: $("#profileImage").val(),
    artistName: $("#artistName").val(),
    artistMedium: $("#artistMedium").val(),
    artistDemo: $("#artistDemo").val(),
    artistAudience: $("#artistAudience").val(),
    artistSocial: social,
    artistPay: $("#artistPay").val(),
    rateNegotiable: $("#rateCheckBox").is(":checked")
  };

  $.post("/profile", form).then(function(req, res) {
    console.log(res);
  });
});

$(document).on("click", ".social", function() {
  if ($(this).prop("id") === "facebook") {
    $(".fb").toggleClass("hidden");
  } else if ($(this).prop("id") === "twitter") {
    $(".twitter").toggleClass("hidden");
  } else {
    $(".youtube").toggleClass("hidden");
  }
});
