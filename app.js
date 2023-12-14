let searchEl = document.getElementById("search-location");
let tempEl = document.getElementById("temp-value");
let locEl = document.getElementById("location");
let weatherDesc = document.getElementById("weather-desc");
let searchBtn = document.getElementById("btn");
let icon = document.getElementById("icon");

const apiKey = '2d9ae582a06d51e56941b7accde258e7';

searchBtn.onclick = () => {
  if(searchEl.value === ""){
    alert("Please enter a location");
  }else{
    loc = searchEl.value;
    url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}`
    fetch(url).then(res => res.json())
    .then(data => {
      console.log(data);
      const{name} = data;
      const{feels_like} = data.main;
      const{description} = data.weather[0];
      tempEl.innerText = Math.floor(((feels_like - 273.15) * 1.8 + 32));
      locEl.innerText = name.toUpperCase();
      weatherDesc.innerText = description.toUpperCase();
    })
    .catch(() => {
      alert("Enter a valid city");
    })
    searchEl.value = ""
  }
};

searchEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});
