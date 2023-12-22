export function getHtml(
  location,
  weather,
  temp,
  humidity,
  sunrise,
  sunset,
  timezone
) {
  return `<h1>${location}:</h1>
    <h2>Today's weather is...${weather}!</h2>
    <p>Temperature: ${temp}°C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Sunrise: ${sunrise.toLocaleTimeString()}</p> 
    <p>Sunset: ${sunset.toLocaleTimeString()}</p>
    <p>Timezone: ${timezone}</p>`;
}
