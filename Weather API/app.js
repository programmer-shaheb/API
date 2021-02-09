window.addEventListener("load", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=8b9003c1daf2a423374e61cfc28f168f`;

      fetch(api)
        .then((res) => res.json())
        .then((data) => displayWeather(data));
    });
  }
});

const displayWeather = (weather) => {
  const tempDeg = document.querySelector(".temperature-degree");
  const tempDescription = document.querySelector(".temperature-description");
  const location = document.querySelector(".location-timezone");
  const degsec = document.querySelector(".degree-section");
  const degsecSpan = document.querySelector(".degree-section span");
  const weatherIcon = document.querySelector(".weather-icon");
  const { icon } = weather.weather[0];

  weatherIcon.innerHTML = `
  <img src="icons/${icon}.png">
  `;

  const tempDegKelvin = weather.main.temp;
  const tempDegCelcius = Math.round(tempDegKelvin - 273);

  tempDeg.innerHTML = tempDegCelcius + "&deg;";

  degsec.addEventListener("click", () => {
    if (degsecSpan.textContent === "C") {
      degsecSpan.textContent = "F";
      tempDeg.innerHTML = Math.round(tempDegCelcius * 1.8 + 32) + "&deg;";
    } else {
      degsecSpan.textContent = "C";
      tempDeg.innerHTML = tempDegCelcius + "&deg;";
    }
  });

  const tempDesText = weather.weather[0].description;
  tempDescription.textContent = tempDesText.toUpperCase();

  location.textContent = weather.sys.country;
};
