var request = new XMLHttpRequest();
var cityName = document.querySelector("#cityName");
var tempToday = document.querySelector("#tempToday"); 
var todayStatusIcon = document.querySelector("#todayStatusIcon");
var todayStatusText = document.querySelector("#todayStatusText");
var todayName = document.querySelector("#todayName");
var todayDate = document.querySelector("#todayDate");
var tomorrowName = document.querySelector("#tomorrowName");
var tomorrow2Name = document.querySelector("#tomorrow2Name");
var tomorrowStatusIcon = document.querySelector("#tomorrowStatusIcon");
var tomorrowStatus = document.querySelector("#tomorrowStatus");
var tomorrowMaxTemp = document.querySelector("#tomorrowMaxTemp");
var tomorrowMinTemp = document.querySelector("#tomorrowMinTemp");
var tomorrow2StatusIcon = document.querySelector("#tomorrow2StatusIcon");
var tomorrow2Status = document.querySelector("#tomorrow2Status");
var tomorrow2MaxTemp = document.querySelector("#tomorrow2MaxTemp");
var tomorrow2MinTemp = document.querySelector("#tomorrow2MinTemp");
request.open("GET","http://api.weatherapi.com/v1/forecast.json?key=2f8decbf816447469f8142742242404&q=London&days=3&aqi=no&alerts=no");

request.send();
request.responseType = "json"
const today = new Date();
const monthName = today.toLocaleString('default', { month: 'long' });
console.log(monthName); // e.g., "July"
// Get day name (e.g., "Wednesday")
const dayName = today.toLocaleString('default', { weekday: 'long' });

// Get day number (e.g., 3)
const dayNumber = today.getDate();

const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(today.getDate() + 2);

// Get weekday names
const options = { weekday: 'long' };
const nameTomorrow = tomorrow.toLocaleString('default', options);
const dayAfterTomorrowName = dayAfterTomorrow.toLocaleString('default', options);

request.addEventListener("load",function(){
    console.log(request.response);
    cityName.textContent = request.response.location.name;
    tempToday.innerHTML = `${request.response.current.temp_c}<sup>o</sup> C`;
    todayStatusIcon.setAttribute("src",`https:${request.response.current.condition.icon}`);
    todayStatusText.textContent = request.response.current.condition.text;
    todayName.textContent = dayName;
    todayDate.textContent = dayNumber + " " + monthName;
    tomorrowName.textContent = nameTomorrow;
    tomorrow2Name.textContent = dayAfterTomorrowName;
    tomorrowMaxTemp.textContent = request.response.forecast.forecastday[1].day.maxtemp_c;
    tomorrowMinTemp.textContent = request.response.forecast.forecastday[1].day.mintemp_c;
    tomorrowStatusIcon.setAttribute("src",`https:${request.response.forecast.forecastday[1].day.condition.icon}`);
    tomorrowStatus.textContent = request.response.forecast.forecastday[1].day.condition.text;
    tomorrow2MaxTemp.textContent = request.response.forecast.forecastday[2].day.maxtemp_c;
    tomorrow2MinTemp.textContent = request.response.forecast.forecastday[2].day.mintemp_c;
    tomorrow2StatusIcon.setAttribute("src",`https:${request.response.forecast.forecastday[2].day.condition.icon}`);
    tomorrow2Status.textContent = request.response.forecast.forecastday[2].day.condition.text;
})
