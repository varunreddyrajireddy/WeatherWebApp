// Frontend JavaScript code
const searchEl = document.getElementById("search-location");
const tempEl = document.getElementById("temp-value");
const locEl = document.getElementById("location");
const weatherDesc = document.getElementById("weather-desc");
const searchBtn = document.getElementById("searchBtn");

searchBtn.onclick = async () => {
  try {
    const location = searchEl.value;
    if (location === "") {
      alert("Please enter a location");
      return;
    }

    const response = await fetch(
      `https://localhost:5500/weather?loc=${location}`
    );

    const data = await response.json();

    locEl.innerText = data.loc;
    weatherDesc.innerText = data.description;
    tempEl.innerText = data.temperature;

    searchEl.value = "";
  } catch (error) {
    alert("Enter a valid city");
  }
};

searchEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});
