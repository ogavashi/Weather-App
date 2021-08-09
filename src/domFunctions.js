const searchField = document.querySelector("#location-input");

searchField.addEventListener("click", () => {
  searchField.placeholder = "Search location...";
  searchField.value = "";
});

searchField.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.querySelector("#search-btn").click();
  }
});

function getLocation() {
  const location = document.querySelector("#location-input");
  const city = location.value;

  if (city) {
    return city
      .replace(/(\s+$|^\s+)/g, "")
      .replace(/(,\s+)/g, ",")
      .replace(/(\s+,)/g, ",")
      .replace(/\s+/g, "+");
  }
  return "";
}

function showWeather(forecast) {
  const weatherIcon = document.querySelector("#icon");
  const temperature = document.querySelector("#temperature");
  const description = document.querySelector("#description");
  const windInfo = document.querySelector("#wind-info");
  const humidity = document.querySelector("#humidity-info");
  const sticky = document.querySelector("#sticky-part");

  const mainStatus = forecast.current.weather[0].main;

  temperature.innerText = Math.ceil(forecast.current.temp) + "°";
  description.innerText = mainStatus;
  windInfo.innerText = forecast.current.wind_speed + "km/h";
  humidity.innerText = forecast.current.humidity + "%";

  if (mainStatus == "Clear") {
    document.body.style.background = "var(--sunny)";
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
      sticky.style.background = "var(--sunny)";
    else sticky.style.background = "transparent";
    weatherIcon.src = "https://img.icons8.com/cute-clipart/256/000000/sun.png";
  }
  if (mainStatus == "Clouds") {
    document.body.style.background = "var(--cloud)";
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
      sticky.style.background = "var(--cloud)";
    else sticky.style.background = "transparent";
    weatherIcon.src = "https://img.icons8.com/cute-clipart/256/000000/cloud.png";
  }
  if (mainStatus == "Rain") {
    document.body.style.background = "var(--rain)";
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
      sticky.style.background = "var(--rain)";
    else sticky.style.background = "transparent";
    weatherIcon.src = "https://img.icons8.com/cute-clipart/256/000000/cloud-lighting.png";
  }

  console.log(forecast);
  return mainStatus;
}

function nothingFound() {
  const location = document.querySelector("#location-input");

  location.value = "";
  location.placeholder = "Location not found :(";
}

function setLocationName(coords) {
  const location = document.querySelector("#location-input");

  location.value = coords.name + ", " + coords.country;
}

function showDailyWeather(forecast) {
  let days = new Map();

  days.set(0, "Sunday");
  days.set(1, "Monday");
  days.set(2, "Tuesday");
  days.set(3, "Wednesday");
  days.set(4, "Thursday");
  days.set(5, "Friday");
  days.set(6, "Saturday");
  const dayCard = document.querySelectorAll(".day-card");

  const d = new Date();
  const today = d.getDay() + 1;

  let j = 0;
  for (let i = today; i < 7; i++) {
    console.log(days.get(i));
    dayCard[j].querySelector("#day").innerText = days.get(i);
    j++;
  }
  console.log(j);
  for (let i = 0; i < today; i++) {
    dayCard[j].querySelector("#day").innerText = days.get(i);
    j++;
  }

  dayCard.forEach((element, index) => {
    element.querySelector("#day-temperature").innerText =
      Math.ceil(forecast.daily[index + 1].temp.max) + "°";
    const mainStatus = forecast.daily[index].weather[0].main;
    if (mainStatus == "Clear") {
      element.querySelector("#img-day").src =
        "https://img.icons8.com/cute-clipart/256/000000/sun.png";
    }
    if (mainStatus == "Clouds") {
      element.querySelector("#img-day").src =
        "https://img.icons8.com/cute-clipart/256/000000/cloud.png";
    }
    if (mainStatus == "Rain") {
      element.querySelector("#img-day").src =
        "https://img.icons8.com/cute-clipart/256/000000/cloud-lighting.png";
    }
  });
}

function showHourly(forecast) {
  const hourContainer = document.querySelector("#hourly-weather");

  hourContainer.innerHTML = '';
  var d = new Date();
  var h = d.getHours();

  for (let i = 0; i < 24; i++) {
    if (h > 23) h = 0;
    const hour = document.createElement("div");
    hour.classList.add("hour");

    const time = document.createElement("span");
    time.setAttribute("id", "time");

    const timeWeather = document.createElement("span");
    timeWeather.setAttribute("id", "time-weather");

    const timeImg = document.createElement("img");
    timeImg.setAttribute("id", "time-img");

    const timeTemp = document.createElement("span");
    timeTemp.setAttribute("id", "time-temp");

    timeWeather.appendChild(timeImg);

    console.log(hour);

    hour.appendChild(time);
    hour.appendChild(timeWeather);
    hour.appendChild(timeTemp);
    hourContainer.appendChild(hour);

    time.innerText = h++;
    const mainStatus = forecast.hourly[i].weather[0].main;
    if (mainStatus == "Clear") {
      timeImg.src = "https://img.icons8.com/cute-clipart/256/000000/sun.png";
    }
    if (mainStatus == "Clouds") {
      timeImg.src = "https://img.icons8.com/cute-clipart/256/000000/cloud.png";
    }
    if (mainStatus == "Rain") {
      timeImg.src = "https://img.icons8.com/cute-clipart/256/000000/cloud-lighting.png";
    }
    timeTemp.innerText = Math.ceil(forecast.hourly[i].temp) + "°";
  }
}

export { getLocation, showWeather, nothingFound, setLocationName, showDailyWeather, showHourly };
