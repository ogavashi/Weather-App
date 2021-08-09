import * as domFunc from "./domFunctions";
import * as apiFunc from "./apiFunctions";

const searchButton = document.querySelector("#search-btn");

searchButton.addEventListener("click", getWeatherData);

async function getWeatherData() {
  const city = domFunc.getLocation();

  if (!city) {
    return;
  }
  const link = apiFunc.makeRequest(city);

  const coords = await apiFunc.getCoordinates(link);
  if (!coords) {
    domFunc.nothingFound();
    return;
  }

  domFunc.setLocationName(coords);
  const forecastLink = apiFunc.makeRequestForecast(coords);

  console.log(forecastLink);

  const forecast = await apiFunc.getForecast(forecastLink);

  console.log(forecast);
  console.log(domFunc.showWeather(forecast));
  domFunc.showDailyWeather(forecast);

  const hourlyLink = apiFunc.makeHourlyRequest(coords);
  const hourlyForecast = await apiFunc.getHourlyForecast(hourlyLink);

  domFunc.showHourly(hourlyForecast);
}

async function initialLoad() {
  const coords = await apiFunc.getCoordinates(
    "https://api.openweathermap.org/data/2.5/weather?q=Kyiv&APPID=3d905e78a98f2c7c5aab470eae63c399"
  );
  domFunc.setLocationName(coords);
  const forecastLink = apiFunc.makeRequestForecast(coords);
  const forecast = await apiFunc.getForecast(forecastLink);
  const hourlyLink = apiFunc.makeHourlyRequest(coords);
  const hourlyForecast = await apiFunc.getHourlyForecast(hourlyLink);
  console.log(hourlyForecast);
  domFunc.showWeather(forecast);
  domFunc.showDailyWeather(forecast);
  domFunc.showHourly(hourlyForecast);
}
initialLoad();
