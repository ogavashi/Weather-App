function makeRequest(city) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3d905e78a98f2c7c5aab470eae63c399`;
}

function makeRequestForecast(coord) {
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=hourly&units=metric&appid=3d905e78a98f2c7c5aab470eae63c399`;
}

function makeHourlyRequest(coord) {
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=daily&units=metric&appid=3d905e78a98f2c7c5aab470eae63c399`;
}

async function getCoordinates(link) {
  const response = await fetch(link);
  const weatherData = await response.json();
  if (weatherData.cod == "404") return 0;
  const { coord } = weatherData;
  coord.name = weatherData.name;
  coord.country = weatherData.sys.country;
  return coord;
}

async function getForecast(link) {
  const response = await fetch(link);
  const forecastData = await response.json();
  return forecastData;
}

async function getHourlyForecast(link) {
  const response = await fetch(link);
  const forecastData = await response.json();
  return forecastData;
}

export {
  makeRequest,
  makeRequestForecast,
  getCoordinates,
  getForecast,
  getHourlyForecast,
  makeHourlyRequest,
};
