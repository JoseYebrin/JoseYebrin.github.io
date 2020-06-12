$(document).ready(function () {
  if (window.matchMedia("(orientation: landscape)").matches) {
  }

  const container = $(".circle-container");
  const text = $("#text");

  const greet = $(".greet");
  const title = $("#title");
  const input = $("input");
  var json = {};

  const totalTime = 9500;
  const breatheTime = 3000;
  const holdTime = 1500;

  function breathe() {
    text.text(json.breathein);
    container.removeClass("shrink");
    container.addClass("grow");

    setTimeout(() => {
      text.text(json.hold);

      setTimeout(() => {
        text.text(json.breatheout);
        container.removeClass("grow");
        container.addClass("shrink");
      }, holdTime);
    }, breatheTime);
  }

  $("#en").click(function () {
    greet.animate({ opacity: 0 }, 600, function () {
      $.ajax({
        url: "assets/en.json",
        success: function (obj) {
          json = obj;
          title.text(json.gender);
          text.text(json.ready);
          $(".lang").hide();
          $("#male p").text(json.male);
          $("#female p").text(json.female);
          $("#relax p").text(json.relax);
          $(".gender").show();
          input.attr("data-tippy-content", "Invalid input");
          greet.animate({ opacity: 1 }, 600);
        },
        error: function (xhr, ajaxOptions, thrownError) {
          if (xhr.status == 200) {
            alert(ajaxOptions);
          } else {
            alert(xhr.status);
            alert(thrownError);
          }
        },
        cache: false,
      });
    });
  });

  $("#es").click(function () {
    $("#support").animate({ opacity: 0 }, 600);
    greet.animate({ opacity: 0 }, 600, function () {
      $.ajax({
        url: "assets/es.json",
        success: function (obj) {
          json = obj;
          title.text(json.gender);
          text.text(json.ready);
          $(".lang").hide();
          $("#male p").text(json.male);
          $("#female p").text(json.female);
          $("#relax p").text(json.relax);
          $(".gender").show();
          input.attr("data-tippy-content", "Ingreso invalido");
          $("#support").text(json.note);
          greet.animate({ opacity: 1 }, 600);
          $("#support").animate({ opacity: 1 }, 600);
        },
        error: function (xhr, ajaxOptions, thrownError) {
          if (xhr.status == 200) {
            alert(ajaxOptions);
          } else {
            alert(xhr.status);
            alert(thrownError);
          }
        },
        cache: false,
      });
    });
  });

  $(".gender").click(function () {
    greet.animate({ opacity: 0 }, 600, function () {
      title.text(json.age);
      $(".gender").hide();
      input.show();
      $("button").css("visibility", "visible");
      greet.animate({ opacity: 1 }, 600);
    });
  });

  $("button").click(function () {
    if (
      input.val() < 100 &&
      input.val() > 0 &&
      input.val().includes(".") == false
    ) {
      $(".greet-container")
        .children()
        .animate({ opacity: 0 }, 600, function () {
          $(".greet-container").children().hide();
          $("#relax").show();
          $("#relax").animate({ opacity: 1 }, 3000, function () {
            $(".greet-container").fadeOut(2000);
          });
        });
      setTimeout(function () {
        breathe();
        $(".pointer-container").addClass("rotate");
        setInterval(breathe, totalTime);
      }, 7000);
    } else {
      tippy("input", {
        showOnCreate: true,
        trigger: "manual",
        animation: "shift-toward",
      });
    }
  });
});
