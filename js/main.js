var search = document.getElementById("search");
async function getWeather(city) {
  var w = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=312700b4adb542beaa7210646240512&q=${city}&days=3`
  );
  var data = await w.json();
  displayCurrentDay(data.current, data.location);
  displayNextDays(data.forecast.forecastday);
  console.log(data);
}
function getGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        getWeatherByCoords(lat, lon);
      }, function(error) {
        alert("you didn’t allow your location,search for a city");
      });
    } 
}
async function getWeatherByCoords(lat, lon) {
      var w = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=312700b4adb542beaa7210646240512&q=${lat},${lon}&days=3`
      );
      var data = await w.json();
      displayCurrentDay(data.current, data.location);
      displayNextDays(data.forecast.forecastday);
    } 
var months = [
  "January",
  "Febreuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function displayCurrentDay(curr, loc) {
  var date = new Date(curr.last_updated);
  var card1 = `<div class="col-md-6 col-lg-4" id="card1">
            <div class="inner sec-color left-rounded">
              <div
                class="top-card left-rounded rounded-bottom-0 d-flex justify-content-between align-items-center px-2 py-2 sec-card text-color"
              >
                <p class="mb-0">${days[date.getDay()]}</p>
                <p class="mb-0">${date.getDate() + months[date.getMonth()]}</p>
              </div>
              <p class="text-color fs-5 ps-3 my-4">${loc.name}</p>
              <div
                class="degree d-flex justify-content-between align-items-center px-3"
              >
                <h1 class="text-white">${curr.temp_c}<sup>o</sup>C</h1>
                <img src="https:${curr.condition.icon}" alt="" />
              </div>
              <p class="text-primary ps-3 my-3">${curr.condition.text}</p>
              <div class="allStatus d-flex gap-5 ps-3 mt-2">
                <div class="text-color d-flex align-items-baseline gap-1">
                  <i class="fa-solid fa-umbrella"></i>
                  <p>${curr.humidity}%</p>
                </div>
                <div class="text-color d-flex align-items-baseline gap-1">
                  <i class="fa-solid fa-wind"></i>
                  <p>${curr.wind_kph} km/h</p>
                </div>
                <div class="text-color d-flex align-items-baseline gap-1">
                  <i class="fa-solid fa-compass"></i>
                  <p>East</p>
                </div>
              </div>
            </div>
            </div>`;
  document.getElementById("cards").innerHTML = card1;
}
function displayNextDays(forc) {
  var cartoona = "";
  for (var i = 1; i < forc.length; i++) {
    var dateNext = new Date(forc[i].date);
    cartoona += `<div class="col-md-6 col-lg-4" >
    <div class="inner sec-card" id="card2">
              <p
                class="text-color rounded-bottom-0 main-color text-center mb-0 py-2"
              >
                ${days[dateNext.getDay()]}
              </p>
              <img src="https:${
                forc[i].day.condition.icon
              }" class="d-block m-auto mt-5" alt="" />
              <div class="degree text-center my-4">
                <h3 class="text-white">${
                  forc[i].day.maxtemp_c
                }<sup>o</sup>C</h3>
                <p class="text-color">${forc[i].day.mintemp_c}<sup>o</sup>C</p>
              </div>
              <p class="text-primary text-center pb-4">${
                forc[i].day.condition.text
              }</p>
            </div>
            </div>`;
  }
  document.getElementById("cards").innerHTML += cartoona;
}
window.onload = function() {
    getGeolocation();
};
getWeather("london");
search.addEventListener('keyup', function(e){
    if(e.target.value == ''){
        getGeolocation()
    }else{
        getWeather(e.target.value)
    }
    
})