let searchEl = document.getElementById("search-location");
let tempEl = document.getElementById("temp-value");
let locEl = document.getElementById("location");
let weatherDesc = document.getElementById("weather-desc");
let searchBtn = document.getElementById("btn");
let icon = document.getElementById("icon");

const apiKey = "2d9ae582a06d51e56941b7accde258e7";

searchBtn.onclick = async () => {
  try {
    if (searchEl.value === "") {
      alert("Please enter a location");
    } else {
      loc = searchEl.value;
      url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}`;
      let res = await fetch(url);
      let data = await res.json();
      locEl.innerText = data.name.toUpperCase();
      weatherDesc.innerText = data.weather[0].description.toUpperCase();
      tempEl.innerText = Math.floor((data.main.feels_like - 273.15) * 1.8 + 32);
      searchEl.value = "";
    }
  } catch {
    alert("Enter a valid city");
  }
};

searchEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});
