var citySearchFormEl = document.querySelector("#city-search-form");
var cityInputEl = document.querySelector("#city-search");
var currentWeatherEl = document.querySelector("#current-weather");
var fiveDayForecastEl = document.querySelector("#future-forecast");
var cardHolderEl = document.querySelector("#card-holder");
var searchHistoryEl = document.querySelector("#search-history-box");


var formSubmitHandler = function(event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
    if (city) {
      searchCityWeather(city);
      searchCityForecast(city);
      currentWeatherEl.textContent = "";
      fiveDayForecastEl.textContent = "";
      cityInputEl.value = "";
      displayForecastWeather();
      createSearchHistoryButton();
    } else {
      alert ("Please enter the name of a city.")
    }
};


var searchCityWeather = function(city) {
  var apiCurrentUrl ="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=523a8452a92059fd3b4bc789dcceccb3&units=imperial";
  fetch(apiCurrentUrl)
    .then(function(response) {
      // request was succesful
      if (response.ok) {
      response.json().then(function(data) {
      console.log(data);
      console.log(data.name);
      console.log(data.main.temp);
      console.log(data.wind.speed);
      console.log(data.main.humidity);
      console.log(data.weather[0].icon);
      //console.log(data.coord.lat);
      //console.log(data.coord.lon);
      var cityName = (data.name);
      var currentTemp = (data.main.temp);
      var currentWindSpeed = (data.wind.speed);
      var currentHumidity = (data.main.humidity);
      var currentWeatherIcon = (data.weather[0].icon);
      localStorage.setItem("#searchedCityName", cityName);
      localStorage.setItem("#searchedCityUrl", apiCurrentUrl)
      var cityLat = (data.coord.lat);
      var cityLon = (data.coord.lon);
      var apiOneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&appid=523a8452a92059fd3b4bc789dcceccb3&units=imperial";
      fetch(apiOneCallUrl)
        .then(function(response) {
          if (response.ok) {
          response.json().then(function(data) {
            localStorage.setItem("#currentWeatherUviUrl", apiOneCallUrl)
            var currentUvi = (data.current.uvi);
            console.log(currentUvi);
            displayCurrentWeather(cityName, currentTemp, currentWindSpeed, currentHumidity, currentWeatherIcon, currentUvi);
            })  
          } else {
            alert("Error - unable to connect");
          }
        })
      });
      } else {
       alert("Error");
      }
    })
    .catch(function(error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
     // alert("Unable to connect");
      });
}
      
var searchCityForecast = function(city) {
  var apiForecastUrl ="https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=523a8452a92059fd3b4bc789dcceccb3&units=imperial";
  fetch(apiForecastUrl)
    .then(function(response) {
      // request was succesful
      if (response.ok) {
        localStorage.setItem("#fiveDayForecastUrl", apiForecastUrl)
        response.json().then(function(data) {
        console.log(data);
        /*var forecastCityName = (data.city.name);
        var forecastTemp = ();
        
        var forecastWindSpeed = ();
        var forecastHumidity = ();
        var forecastWeatherIcon = ();*/


        });
      }  
    })
};    

var displayCurrentWeather = function(cityName, currentTemp, currentWindSpeed, currentHumidity, currentWeatherIcon, currentUvi) {

  var currentDate = moment().format("dddd, MMMM Do YYYY");
    currentDate.class = "row col-sm-12"
    document.getElementById("current-weather").append(currentDate);

  var currentCityName = document.createElement("h2");
    currentCityName.id="current-city-name";
    currentCityName.class ="current-city  row col-sm-12 ";
    currentCityName.textContent = cityName;
    currentWeatherEl.appendChild(currentCityName);

  var currentCityTextFormat = document.createElement("span");
    currentCityTextFormat.id ="current";
    currentCityTextFormat.className ="current row col-sm-12";
    currentCityTextFormat.textContent = "Current Weather: ";
    currentWeatherEl.appendChild(currentCityTextFormat);

  var currentCityWeatherIcon = document.createElement("img");  
  currentCityWeatherIcon.src="http://openweathermap.org/img/wn/" + currentWeatherIcon + "@2x.png"
  currentWeatherEl.appendChild(currentCityWeatherIcon);  

  var currentCityTemp = document.createElement("span");
    currentCityTemp.id ="current-city-temp";
    currentCityTemp.className ="current-city-weather  row col-sm-12";
    currentCityTemp.textContent = "Temp: " + currentTemp;
    currentWeatherEl.appendChild(currentCityTemp);

  var currentCityWind = document.createElement("span");
    currentCityWind.id="current-city-wind";
    currentCityWind.class ="current-city-weather row col-sm-12";
    currentCityWind.textContent = "Wind Speed: " + currentWindSpeed;
    currentWeatherEl.appendChild(currentCityWind);

  var currentCityHumidity = document.createElement("span");
      currentCityHumidity.id ="current-city-humidity";
      currentCityHumidity.className ="current-city-weather row col-sm-12";
      currentCityHumidity.textContent = "Humidity: " + currentHumidity;
      currentWeatherEl.appendChild(currentCityHumidity);

  var currentCityUvi = document.createElement("span");
      currentCityUvi.id ="current-city-uvi";
      currentCityUvi.className ="current-city-weather row col-sm-12";
      currentCityUvi.textContent = "UVI: " + currentUvi;
      currentWeatherEl.appendChild(currentCityUvi);
      if (currentUvi <=2) {
        var currentUviBadge = document.createElement("span");
        currentUviBadge.className = "badge bg-success";
        currentUviBadge.textContent = "favorable";
        currentWeatherEl.appendChild(currentUviBadge);
      } else if (currentUvi >=8) {
        var currentUviBadge = document.createElement("span");
        currentUviBadge.className = "badge bg-danger";
        currentUviBadge.textContent = "severe";
        currentWeatherEl.appendChild(currentUviBadge);  
      } else {
          var currentUviBadge = document.createElement("span");
          currentUviBadge.className = "badge bg-warning";
          currentUviBadge.textContent = "moderate";
          currentWeatherEl.appendChild(currentUviBadge);
      }

   
}

var displayForecastWeather = function() {

  /*var forecastCityName = document.createElement("h2");
    forecastCityName.id="forecast-city-name";
    forecastCityName.class ="forecast-city  row col-sm-12 ";
    forecastCityName.textContent = "city name";
    fiveDayForecastEl.appendChild(forecastCityName);*/

  var forecastCityTextFormat = document.createElement("span");
    forecastCityTextFormat.id ="five-day-forecast";
    forecastCityTextFormat.className ="five-day-forecast row col-sm-12";
    forecastCityTextFormat.textContent = "5-Day Forecast: ";
    fiveDayForecastEl.appendChild(forecastCityTextFormat);

  var  forecastDayOne= document.createElement("div");
    forecastDayOne.id ="day-one-box";
    forecastDayOne.className ="forecast-box  col-sm-12";
    forecastDayOne.textContent = "Day One";
    fiveDayForecastEl.appendChild(forecastDayOne);

  var  forecastDayTwo= document.createElement("div");
    forecastDayTwo.id ="day-two-box";
    forecastDayTwo.className ="forecast-box col-sm-12";
    forecastDayTwo.textContent = "Day Two";
    fiveDayForecastEl.appendChild(forecastDayTwo);

  var  forecastDayThree= document.createElement("div");
    forecastDayThree.id ="day-three-box";
    forecastDayThree.className ="forecast-box col-sm-12";
    forecastDayThree.textContent = "Day Three";
    fiveDayForecastEl.appendChild(forecastDayThree);

  var  forecastDayFour= document.createElement("div");
    forecastDayFour.id ="day-four-box";
    forecastDayFour.className ="forecast-box col-sm-12";
    forecastDayFour.textContent = "Day Four";
    fiveDayForecastEl.appendChild(forecastDayFour);
  
  var  forecastDayFive = document.createElement("div");
    forecastDayFive.id ="day-five-box";
    forecastDayFive.className ="forecast-box col-sm-12";
    forecastDayFive.textContent = "Day Five";
    fiveDayForecastEl.appendChild(forecastDayFive);

 /* var currentCityWind = document.createElement("span");
    currentCityWind.id="current-city-wind";
    currentCityWind.class ="current-city-weather row col-sm-12";
    currentCityWind.textContent = "Wind Speed: ";
    currentWeatherEl.appendChild(currentCityWind);

  var currentCityHumidity = document.createElement("span");
      currentCityHumidity.id ="current-city-humidity";
      currentCityHumidity.className ="current-city-weather row col-sm-12";
      currentCityHumidity.textContent = "Humidity: ";
      currentWeatherEl.appendChild(currentCityHumidity);*/

}

var createSearchHistoryButton = function() {
  var searchedCityName = document.createElement("button");
  searchedCityName.id="history-one-btn";
  searchedCityName.type="submit";
  searchedCityName.class ="btn container-fluid";
  searchedCityName.textContent = "city name";
  searchHistoryEl.appendChild(searchedCityName);
};




citySearchFormEl.addEventListener("submit", formSubmitHandler);