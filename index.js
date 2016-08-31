/* Works in Edge & Firefox, 
not supported in Chrome */
$(document).ready(function() {
  init();
});

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showUserPosition, errorHandler);
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

function showUserPosition(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  var appId = "585bc5da6feebc5fef1125a42387df28";
  var units = "metric";
  var url = "http://api.openweathermap.org/data/2.5/weather?";
  var custom = "lat=" + lat + "&lon=" + lon + "&APPID=" + appId + "&units=" + units;
  url += custom;
  /* give us our custom url, for api call */
  $.ajax({
   type: 'GET',
    url: url,
    error: function(xhr, status, error) {
      if (status === "timeout") {
        alert(xhr.status + ": " + error);
      } else if (status === "error") {
        alert(xhr.status + ": " + error);
      } else if (status === "abort") {
        alert(xhr.status + ": " + error);
      } else if (status === "parsererror") {
        alert(xhr.status + ": " + error);
      } else {
        alert(xhr.status + ": " + error)
      }
    },
    success: function(data, status, xhr) {
      var city = data.name;
      var country = data.sys.country;
      var Location = city + ", " + country;
      var weatherCategory = data.weather[0].main;
      var weatherID = data.weather[0].id;
      var temp = Math.trunc(data.main.temp);
      /* get data from server, store in variables */
      $(".location").html('<p>' + Location + '</p>');
      /* set location info */
      convert(temp);
      changeBackground(weatherCategory);
      icons(weatherID);
      /* pass required data to other functions */
    }
  }); 
}

function errorHandler(error) {
  if (error.code === error.PERMISSION_DENIED) {
    alert("Error, permission to access user's location was denied.");
  } else if (error.code === error.POSITION_UNAVAILABLE) {
    alert("Error, access to location information is unavailable.");
  } else if (error.code === error.TIMEOUT) {
    alert("Error, The request to get user location timed out.");
  } else if (error.code === error.UNKNOWN_ERROR) {
    alert("An unknown error occurred.");
  }
}

function convert(celsius) {
  var C = celsius;
  var F = C * 9 / 5 + 32;
  $(".temperature").html("<p>" + C + " °C" + "</p>");
  /* display temperature in celsius by default*/
  $(".celsius").click(function() {
    $(".temperature").html("<p>" + C + " °C" + "</p>");
  });
  $(".fahrenheit").click(function() {
    $(".temperature").html("<p>" + F + " °F" + "</p>")
  });
  /* convert temperature's html depending on unit measurement choice */
}

function changeBackground(weather) {
  var imgUrl = "";
  if (weather === "Thunderstorm") {
    imgUrl = "http://s1172.photobucket.com/user/SW1992/media/Local%20Weather%20App/flash-1043778_960_720_zps8gf4twfc.jpg.html"
    $(".description").html("<p>" + weather + "</p>")
    $("body").css('background-image', 'url(' + imgUrl + ')')
  } else if (weather === "Drizzle") {
    imgUrl =  "http://s1172.photobucket.com/user/SW1992/media/Local%20Weather%20App/drizzle-874041_960_720_zpslwfkjxkg.jpg.html"
    $(".description").html("<p>" + weather + "</p>")
    $("body").css('background-image', 'url(' + imgUrl + ')')
  } else if (weather === "Rain") {
    imgUrl = "http://i1172.photobucket.com/albums/r576/SW1992/Local%20Weather%20App/raindrops-828954_1280_zpsqqeakfxp.jpg"
    $(".description").html("<p>" + weather + "</p>")
    $("body").css('background-image', 'url(' + imgUrl + ')')
  } else if (weather === "Snow") {
    imgUrl = "http://i1172.photobucket.com/albums/r576/SW1992/Local%20Weather%20App/winter-20234_960_720_zpsequtx5ab.jpg"
    $(".description").html("<p>" + weather + "</p>")
    $("body").css('background-image', 'url(' + imgUrl + ')')
  } else if (weather === "Atmosphere") {
    imgUrl = "http://s1172.photobucket.com/user/SW1992/media/Local%20Weather%20App/atmospheric-1149222_960_720_zps1qq9wcjg.jpg.html"
    $(".description").html("<p>" + weather + "</p>")
    $("body").css('background-image', 'url(' + imgUrl + ')')
  } else if (weather === "Clear") {
    imgUrl = "http://i1172.photobucket.com/albums/r576/SW1992/Local%20Weather%20App/clear-21717_960_720_zpst9uhyckt.jpg"
    $(".description").html("<p>" + weather + "</p>")
    $("body").css('background-image', 'url(' + imgUrl + ')')
  } else if (weather === "Clouds") {
    imgUrl = "http://i1172.photobucket.com/albums/r576/SW1992/Local%20Weather%20App/clouds-1236768_960_720_zpskisratxu.jpg"
    $(".description").html("<p>" + weather + "</p>")
    $("body").css('background-image', 'url(' + imgUrl + ')')
  } else if (weather === "Extreme") {
    imgUrl = "http://i1172.photobucket.com/albums/r576/SW1992/Local%20Weather%20App/extreme-86025_960_720_zpsydwlkjr0.jpg"
    $(".description").html("<p>" + weather + "</p>")
    $("body").css('background-image', 'url(' + imgUrl + ')')
  } else {
    imgUrl = "http://i1172.photobucket.com/albums/r576/SW1992/Local%20Weather%20App/sky-1194915_960_720_zpscbibcli7.jpg"
    $(".description").html("<p>" + weather + "</p>")
    $("body").css('background-image', 'url(' + imgUrl + ')')
  }
}

function icons(id) {
  switch (id) {
    case 200:
    case 201:
    case 202:
    case 210:
    case 211:
    case 212:
    case 221:
    case 230:
    case 231:
    case 232:
      $(".icons").attr("src", "http://openweathermap.org/img/w/11d.png")
      break;
    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321:
      $(".icons").attr("src", "http://openweathermap.org/img/w/09d.png");
      break;
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
    case 511:
    case 520:
    case 521:
    case 522:
    case 531:
      $(".icons").attr("src", "http://openweathermap.org/img/w/10d.png");
      break;
    case 600:
    case 601:
    case 602:
    case 611:
    case 612:
    case 615:
    case 616:
    case 620:
    case 621:
    case 622:
      $(".icons").attr("src", "http://openweathermap.org/img/w/13d.png");
      break;
    case 701:
    case 711:
    case 721:
    case 731:
    case 741:
    case 751:
    case 761:
    case 762:
    case 771:
    case 781:
      $(".icons").attr("src", "http://openweathermap.org/img/w/50d.png");
      break;
    case 800:
      $(".icons").attr("src", "http://openweathermap.org/img/w/01d.png");
      break;
    case 801:
      $(".icons").attr("src", "http://openweathermap.org/img/w/02d.png");
      break;
    case 802:
      $(".icons").attr("src", "http://openweathermap.org/img/w/03d.png");
      break;
    case 803:
    case 804:
      $(".icons").attr("src", "http://openweathermap.org/img/w/04d.png");
      break;
    case 900:
    case 901:
    case 903:
    case 904:
    case 905:
    case 906:
     $(".icons").attr("src", "http://openweathermap.org/img/w/11d.png")
      break;
    case 950:
    case 951:
    case 952:
    case 953:
    case 954:
    case 955:
    case 956:
    case 957:
    case 958:
    case 959:
    case 960:
    case 961:
    case 962:
      $(".icons").attr("src", "http://openweathermap.org/img/w/50d.png");
      break;
    default:
      $(".icons").attr("src", "http://openweathermap.org/img/w/03d.png")
  }
}

function init() {
  getUserLocation();
}
