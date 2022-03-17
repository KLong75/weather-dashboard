var citySearchFormEl = document.querySelector("#city-search-form");
var cityInputEl = document.querySelector("#city-search");
var currentWeatherEl = document.querySelector("#current-weather");
var fiveDayForecastEl = document.querySelector("#future-forecast")
var searchHistoryEl = document.querySelector("#search-history-box")


var formSubmitHandler = function(event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
    if (city) {
      searchCityWeather(city);
      currentWeatherEl.textContent = "";
      fiveDayForecastEl.textContent = "";
      cityInputEl.value = "";
    } else {
      alert ("Please enter the name of a city.")
    }
};





var searchCityWeather = function(city) {
  console.log(city);

var apiUrl ="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=523a8452a92059fd3b4bc789dcceccb3&units=imperial";
fetch(apiUrl)
      .then(function(response) {
        // request was succesful
        if (response.ok) {
          response.json().then(function(data) {
            console.log(data);
          });
        } else {
        alert("Error");
        }
      })
      .catch(function(error) {
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connect");
      });

}

citySearchFormEl.addEventListener("submit", formSubmitHandler);