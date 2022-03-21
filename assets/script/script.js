var citySearchFormEl = document.querySelector("#city-search-form");
var cityInputEl = document.querySelector("#city-search");
var currentWeatherEl = document.querySelector("#current-weather");
var fiveDayForecastEl = document.querySelector("#future-forecast");
var cardHolderEl = document.querySelector("#card-holder");
var searchHistoryEl = document.querySelector("#search-history-box");
var searchHistoryFormEl = document.querySelector("#search-history-form")

var clickEventHandler = function(event) {
  event.preventDefault();
  var city = localStorage.getItem("#searchedCityName");
    if (city) {
      currentWeatherEl.textContent = "";
      fiveDayForecastEl.textContent = "";
      cityInputEl.value = "";
      searchCityWeather(city);
      searchCityForecast(city);
    } else {
      alert ("Please enter the name of a city.")
    }
};

var formSubmitHandler = function(event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
    if (city) {
      searchCityWeather(city);
      searchCityForecast(city);
      currentWeatherEl.textContent = "";
      fiveDayForecastEl.textContent = "";
      cityInputEl.value = "";
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
        
        var dayOneTemp = (data.list[3].main.temp);
        var dayOneWindSpeed = (data.list[3].wind.speed);
        var dayOneHumidity = (data.list[3].main.humidity);
        var dayOneWeatherIconCode = (data.list[3].weather[0].icon);
        console.log(dayOneWeatherIconCode);

        var dayTwoTemp = (data.list[11].main.temp);
        var dayTwoWindSpeed = (data.list[11].wind.speed);
        var dayTwoHumidity = (data.list[11].main.humidity);
        var dayTwoWeatherIconCode = (data.list[11].weather[0].icon);

        var dayThreeTemp = (data.list[19].main.temp);
        var dayThreeWindSpeed = (data.list[19].wind.speed);
        var dayThreeHumidity = (data.list[19].main.humidity);
        var dayThreeWeatherIconCode = (data.list[19].weather[0].icon);

        var dayFourTemp = (data.list[27].main.temp);
        var dayFourWindSpeed = (data.list[27].wind.speed);
        var dayFourHumidity = (data.list[27].main.humidity);
        var dayFourWeatherIconCode = (data.list[27].weather[0].icon);

        var dayFiveTemp = (data.list[35].main.temp);
        var dayFiveWindSpeed = (data.list[35].wind.speed);
        var dayFiveHumidity = (data.list[35].main.humidity);
        var dayFiveWeatherIconCode = (data.list[35].weather[0].icon);

        displayForecastWeather(dayOneTemp, dayOneWindSpeed, dayOneHumidity, dayOneWeatherIconCode, dayTwoTemp, dayTwoWindSpeed, dayTwoHumidity, dayTwoWeatherIconCode, dayThreeTemp, dayThreeWindSpeed, dayThreeHumidity, dayThreeWeatherIconCode, dayFourTemp, dayFourWindSpeed, dayFourHumidity, dayFourWeatherIconCode, dayFiveTemp, dayFiveWindSpeed, dayFiveHumidity, dayFiveWeatherIconCode);
        });
      }  
    })
};    

var displayCurrentWeather = function(cityName, currentTemp, currentWindSpeed, currentHumidity, currentWeatherIcon, currentUvi) {

  createSearchHistoryButton(cityName);

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

var displayForecastWeather = function(dayOneTemp, dayOneWindSpeed, dayOneHumidity, dayOneWeatherIconCode, dayTwoTemp, dayTwoWindSpeed, dayTwoHumidity, dayTwoWeatherIconCode, dayThreeTemp, dayThreeWindSpeed, dayThreeHumidity, dayThreeWeatherIconCode, dayFourTemp, dayFourWindSpeed, dayFourHumidity, dayFourWeatherIconCode, dayFiveTemp, dayFiveWindSpeed, dayFiveHumidity, dayFiveWeatherIconCode) {

  var forecastCityTextFormat = document.createElement("span");
    forecastCityTextFormat.id ="five-day-forecast";
    forecastCityTextFormat.className ="five-day-forecast row col-sm-12";
    forecastCityTextFormat.textContent = "5-Day Forecast: ";
    fiveDayForecastEl.appendChild(forecastCityTextFormat);

  var dayOneDate = moment().add(1, 'd').format("dddd, MMMM Do YYYY");
    document.getElementById("future-forecast").append(dayOneDate);

  var  forecastDayOne= document.createElement("div");
    var dayOneWeatherIcon = document.createElement("img");  
      dayOneWeatherIcon.src="http://openweathermap.org/img/wn/" + dayOneWeatherIconCode + "@2x.png"
      fiveDayForecastEl.appendChild(dayOneWeatherIcon); 
    forecastDayOne.id ="day-one-box";
    forecastDayOne.className ="text-center";
    forecastDayOne.textContent = "Temp: " + dayOneTemp + " Wind Speed: " + dayOneWindSpeed + " Humidity: " + dayOneHumidity;
    fiveDayForecastEl.appendChild(forecastDayOne);

  var dayTwoDate = moment().add(2, 'd').format("dddd, MMMM Do YYYY");
    document.getElementById("future-forecast").append(dayTwoDate);

  var  forecastDayTwo= document.createElement("div");
  var dayTwoWeatherIcon = document.createElement("img");  
      dayTwoWeatherIcon.src="http://openweathermap.org/img/wn/" + dayTwoWeatherIconCode + "@2x.png"
      fiveDayForecastEl.appendChild(dayTwoWeatherIcon);
    forecastDayTwo.id ="day-two-box";
    forecastDayTwo.className ="text-center";
    forecastDayTwo.textContent = "Temp: " + dayTwoTemp + " Wind Speed: " + dayTwoWindSpeed + " Humidity: " + dayTwoHumidity; 
    fiveDayForecastEl.appendChild(forecastDayTwo);

  var dayThreeDate = moment().add(3, 'd').format("dddd, MMMM Do YYYY");
    document.getElementById("future-forecast").append(dayThreeDate);  

  var  forecastDayThree= document.createElement("div");
    var dayThreeWeatherIcon = document.createElement("img");  
        dayThreeWeatherIcon.src="http://openweathermap.org/img/wn/" + dayThreeWeatherIconCode + "@2x.png"
        fiveDayForecastEl.appendChild(dayThreeWeatherIcon);
    forecastDayThree.id ="day-three-box";
    forecastDayThree.className ="text-center";
    forecastDayThree.textContent = "Temp: " + dayThreeTemp + " Wind Speed: " + dayThreeWindSpeed + " Humidity: " + dayThreeHumidity;
    fiveDayForecastEl.appendChild(forecastDayThree);

  var dayFourDate = moment().add(4, 'd').format("dddd, MMMM Do YYYY");
    document.getElementById("future-forecast").append(dayFourDate);

  var  forecastDayFour= document.createElement("div");
  var dayFourWeatherIcon = document.createElement("img");  
      dayFourWeatherIcon.src="http://openweathermap.org/img/wn/" + dayFourWeatherIconCode + "@2x.png"
      fiveDayForecastEl.appendChild(dayFourWeatherIcon);
    forecastDayFour.id ="day-four-box";
    forecastDayFour.className ="text-center";
    forecastDayFour.textContent = "Temp: " + dayFourTemp + " Wind Speed: " + dayFourWindSpeed + " Humidity: " + dayFourHumidity;
    fiveDayForecastEl.appendChild(forecastDayFour);

  var dayFiveDate = moment().add(5, 'd').format("dddd, MMMM Do YYYY");
    document.getElementById("future-forecast").append(dayFiveDate);
  
  var  forecastDayFive = document.createElement("div");
  var dayFiveWeatherIcon = document.createElement("img");  
      dayFiveWeatherIcon.src="http://openweathermap.org/img/wn/" + dayFiveWeatherIconCode + "@2x.png"
      fiveDayForecastEl.appendChild(dayFiveWeatherIcon);
    forecastDayFive.id ="day-five-box";
    forecastDayFive.className ="text-center";
    forecastDayFive.textContent = "Temp: " + dayFiveTemp + " Wind Speed: " + dayFiveWindSpeed + " Humidity: " + dayFiveHumidity;
    fiveDayForecastEl.appendChild(forecastDayFive);
}

var createSearchHistoryButton = function(cityName) {
  var searchedCityName = document.createElement("button");
  searchedCityName.id="history-btn";
  searchedCityName.type="button";
  searchedCityName.class ="btn container-fluid";
  searchedCityName.innerHTML = cityName;
  searchHistoryFormEl.appendChild(searchedCityName);
};

citySearchFormEl.addEventListener("submit", formSubmitHandler);
searchHistoryEl.addEventListener("click", clickEventHandler);