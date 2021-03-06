// VARIABLES
let userDetails = {
    name: "",
    location: "Birmingham",
    starsign: "Aries"
}
let date = new Date().toISOString().slice(0,10);
let newsItems;
let newsTopicsDropdown2 = document.getElementById("topics-2-dropdown");
let newsTypeSelection = "headlines";
let dropDownContainerId;
let dropDownSelection;
let weatherImage = document.getElementById("weather-icon");
let weatherTemperature = document.getElementById("temperature");
let weatherLocation = document.getElementById("weather-location");
let horoscopeImage = document.getElementById("horoscope-icon");
let horoscopeDescription = document.getElementById("horoscope-description");
let horoscopeTitle = document.getElementById("horoscope-title");

// DOM VARIABLES
let userInfoBox = document.querySelector("#user-info-box");
let userInfoBoxOpenButton = document.querySelector("#change-user-info-button");
let userInfoBoxCloseButton = document.querySelector("#close-modal");
let userDetailsButton = document.getElementById("change-user-info");
let backgroundImageButton = document.getElementById("info-button");
let forecastDropdown = document.getElementById("forecast-dropdown");
let newsTopicsDropdown1 = document.getElementById("topics-1-dropdown");

// EVENT LISTENERS
userInfoBoxOpenButton.addEventListener("click", openModal);
userInfoBoxCloseButton.addEventListener("click", closeModal);
backgroundImageButton.addEventListener("click", getRandomNasaBackground)
userDetailsButton.addEventListener("submit", setUserDetails);
forecastDropdown.addEventListener("change", setForecastSelection);
newsTopicsDropdown1.addEventListener("change", handleDropDown1Change);
newsTopicsDropdown2.addEventListener("change", handleDropDown2Change);

pageLoad();

// PAGE LOAD

function pageLoad () {
    weatherDisplay();
    displayBreakingNews();
    handleDropDown1Change();
    handleDropDown2Change();
    getRandomNasaBackground();
    // add twitter trending topics display
}

// USER INPUT FUNCTIONS
function openModal() {
    userInfoBox.style.display = "block";
}

function closeModal() {
    userInfoBox.style.display = "none";
}

function setUserDetails (event) {
    event.preventDefault();
    userDetails.name = document.querySelector("#user-name").value;
    if (userDetails.name === "") {
        userDetails.name = "friend";
     }
    userDetails.name = userDetails.name.toLowerCase();
    let userNameInitialLetter = userDetails.name[0];
    userNameInitialLetter = userNameInitialLetter.toUpperCase();
    let validatedUserName = userDetails.name.substring(1);
    validatedUserName = userNameInitialLetter + validatedUserName;
    userDetails.name = validatedUserName;
    userDetails.location = document.querySelector("#user-location").value;
    if (userDetails.location === "") {
        userDetails.location = "Birmingham";
     }
    userDetails.starsign = document.querySelector("#star-sign-dropdown").value;
    let heading = document.getElementById("heading");
    heading.innerText = `Welcome back, ${userDetails.name}!`
    closeModal();
    userDetailsButton.reset();
    if (userDetails.name !== "Friend") {
     userInfoBoxOpenButton.classList.remove("heartbeat");
     }
     if (forecastDropdown.value === "weather") {
    weatherDisplay();
     }
     horoscopeDisplay();
}

// DROPDOWN BOXES FUNCTIONS
function setForecastSelection () {
    let forecastSelection = document.getElementById("forecast-dropdown").value;
    if (forecastSelection === "horoscope") {
        horoscopeDisplay();
    }
    else weatherDisplay();  
}

function handleDropDown1Change (){
    dropDownSelection = "topics-1-dropdown";
    dropDownContainerId = "topics-1-headlines";
    newsItemsDisplay();
}

function handleDropDown2Change (){
    dropDownSelection = "topics-2-dropdown";
    dropDownContainerId = "topics-2-headlines";
    newsItemsDisplay();
}

// FETCH REQUESTS
async function fetchBreakingNews () {
    let response = await fetch(`http://api.mediastack.com/v1/news?access_key=d2e7cd704c760008100066b1a3258c3e&countries=gb&${date}&sources=bbc`, {
      method: 'GET',
      redirect: 'follow'
    })
    let breakingNews = await response.json();
    return breakingNews;
}

async function fetchHoroscope () {
    let sign = userDetails.starsign;
    let response = await fetch(`https://sameer-kumar-aztro-v1.p.rapidapi.com/?sign=${sign}&day=today`, {
        "method": "POST",
        "headers": {
            "x-rapidapi-key": "c6b7faf605msha0634e3b1f07049p1d0dbdjsn61e10d597152",
            "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com"
        }
    }
    )
    horoscope = await response.json();
    return horoscope;
}
  
async function fetchNewsType (){
    let guardianApiKey = `ccf9a5bd-5549-4c8f-ae0c-62bfd3938f71`;
    newsTypeSelection = document.getElementById(`${dropDownSelection}`).value;
    let newsType = "";
    if (newsTypeSelection !== "headlines") {
          newsType = `section=${newsTypeSelection}`;
        }
    let response = await fetch(`http://content.guardianapis.com/search?${newsType}&api-key=${guardianApiKey}&show-fields=thumbnail`);
    newsItems = await response.json();
    return newsItems;
}

async function fetchWeather () {
    let location = userDetails.location;
    let response = await fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "c6b7faf605msha0634e3b1f07049p1d0dbdjsn61e10d597152",
            "x-rapidapi-host": "weatherapi-com.p.rapidapi.com"
        }
    })
    let weather = await response.json();
    return weather;
}

// DISPLAY FUNCTIONS 
async function getRandomNasaBackground() {
    const NasaApiKey = "d1I88fYYUtxlURwBFr15pmDXpsIb0sAADqcKSHnh";
    let nasaBackgrounds = [     // Check over these images later on for sizing, colours etc.
        "2021-03-01", 
        "2021-03-08", 
        "2021-03-23", 
        "2021-03-30", 
        "2021-04-07", 
        "2021-05-05", 
        "2021-05-11", 
        "2021-05-13", 
        "2021-05-19", 
        "2021-05-21"];
    let randomNasaBackground = nasaBackgrounds[Math.floor(Math.random()*nasaBackgrounds.length)];
    let apiLink = `https://api.nasa.gov/planetary/apod?api_key=${NasaApiKey}&date=${randomNasaBackground}`;
    const nasaResponse = await fetch(apiLink);
    const nasaPicture = await nasaResponse.json();
    let imageLink = nasaPicture.url;
    document.body.style.background = `url(${imageLink}) no-repeat fixed center`;
    document.body.style.backgroundSize = "100%";
  }

async function displayBreakingNews () {
    let breakingNewsItems = await fetchBreakingNews();
    let breakingNewsSection = document.getElementById("breaking-news");
    for (i=0; i<10; i++) {
        if (breakingNewsItems.data[i].title !== breakingNewsItems.data[i+1].title){
         breakingNewsDiv = document.createElement("div");
         breakingNewsDiv.classList.add("ticker-item");
         breakingNewsTitle = document.createElement("a");
         breakingNewsTitle.classList.add("breaking-link");
         breakingNewsTitle.innerText = breakingNewsItems.data[i].title;
         breakingNewsTitle.href = breakingNewsItems.data[i].url;
         breakingNewsTitle.target="_blank";
         breakingNewsSection.appendChild(breakingNewsDiv);
         breakingNewsDiv.appendChild(breakingNewsTitle);
       }
     }
  }
  
async function weatherDisplay () {
      clearHoroscopeDisplay();
      let weatherDetails = await fetchWeather();
      weatherImage.src = `${weatherDetails.current.condition.icon}`;
      weatherTemperature.innerText = `${weatherDetails.current.temp_c}??C`;
      weatherLocation.innerText = `${weatherDetails.location.name}`;
      forecastDropdown.value = "weather";
  }

async function newsItemsDisplay () {
     let ulTopics = document.getElementById(`${dropDownContainerId}`);
     ulTopics.innerHTML = "";
     newsItems = await fetchNewsType();
         for (let i=0; i<4; i++) {
         let newsItemSection = document.createElement("section");
         newsItemSection.classList.add("headline");
         let newsItemTitle = document.createElement("a");
         newsItemTitle.classList.add("link");
         newsItemTitle.innerText = newsItems.response.results[i].webTitle;
         newsItemTitle.href = newsItems.response.results[i].webUrl;
         newsItemTitle.target="_blank";
         let newsItemImage = document.createElement("img");
         newsItemImage.src=newsItems.response.results[i].fields.thumbnail;
         newsItemImage.classList.add("headline-image");
         ulTopics.appendChild(newsItemSection);
         newsItemSection.appendChild(newsItemTitle);
         newsItemTitle.appendChild(newsItemImage);
        }
     }

async function horoscopeDisplay () {
    clearWeatherDisplay();
    let horoscopeDetails = await fetchHoroscope();
    horoscopeImage.src = `images/${userDetails.starsign}.png`;
    horoscopeDescription.innerText = `"${horoscopeDetails.description}"`;  
    let horoscopeTitle = document.getElementById("horoscope-title");
    horoscopeTitle.innerText = userDetails.starsign;
    forecastDropdown.value = "horoscope";
  }

function clearWeatherDisplay () {
    weatherImage.src = "";
    weatherTemperature.innerText = "";
    weatherLocation.innerText = "";
  }

function clearHoroscopeDisplay () {
    horoscopeImage.src = "";
    horoscopeDescription.innerText = "";
    horoscopeTitle.innerText = "";
  }