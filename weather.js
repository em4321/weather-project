const rootRef = document.getElementById("root");
const searchRef = document.getElementById("search");
const buttonRef = document.getElementById("getLocation");

import { getHtml } from "./html.js";
import { getLocation } from "./location.js";

const spinner = `<div class="lds-ripple">
<div></div>
<div></div>
</div>`;
// function gthat gets the weather based on longitude and latitude
async function getWeather(latitude, longitude) {
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=09bd509dc3f293584e3d0a44061be1ce&units=metric`
  );

  console.log(data);
  const { name } = data;
  const { description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { sunrise, sunset } = data.sys;
  const { timezone } = data;

  const stringLocation = name;
  const stringWeather = description;
  const stringTemp = temp;
  const stringHumidity = humidity;
  const stringSunrise = new Date(sunrise * 1000);
  const stringSunset = new Date(sunset * 1000);
  const stringTimezone = timezone;

  rootRef.innerHTML = getHtml(
    stringLocation,
    stringWeather,
    stringTemp,
    stringHumidity,
    stringSunrise,
    stringSunset,
    stringTimezone
  );
}
// fucntion that listens for a click and triggers getting users location
buttonRef.addEventListener("click", async () => {
  rootRef.innerHTML = spinner;
  try {
    const { coords } = await getLocation();

    const { latitude, longitude } = coords;
    getWeather(latitude, longitude);
  } catch (err) {
    rootRef.innerHTML = `Can't access location, please try again`;
  }
});
// fucntion the converts user input into longitude and latitude
async function nameToCoords(value) {
  rootRef.innerHTML = spinner;
  try {
    const coords = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=1&appid=09bd509dc3f293584e3d0a44061be1ce`
    );
    const { lat, lon } = coords.data[0];
    getWeather(lat, lon);
  } catch (err) {
    rootRef.innerHTML = `Can't access location, please try again`;
  }
}
// function that listens for user input
searchRef.addEventListener("input", (e) => {
  nameToCoords(e.target.value);
});
