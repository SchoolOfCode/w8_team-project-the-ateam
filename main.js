let newsItems;
const userInfoBox = document.querySelector("#user-info-box");
const userInfoBoxOpenButton = document.querySelector("#change-user-info-button");
const userInfoBoxCloseButton = document.querySelector("#close-modal");

userInfoBoxOpenButton.addEventListener("click", openModal);
userInfoBoxCloseButton.addEventListener("click", closeModal);

function openModal() {
    userInfoBox.style.display = "block";
}
function closeModal() {
    userInfoBox.style.display = "none"
}

let userDetails = {
    name: "friend",
    location: "Birmingham",
    starsign: "Aries"
}

function setUserDetails (event) {
    event.preventDefault();
    console.log("buttonjoy");
    userDetails.name = document.querySelector("#user-name").value;
    userDetails.name = userDetails.name.toLowerCase();
    let userNameInitialLetter = userDetails.name[0];
    userNameInitialLetter = userNameInitialLetter.toUpperCase();
    let validatedUserName = userDetails.name.substring(1);
    validatedUserName = userNameInitialLetter + validatedUserName;
    console.log (validatedUserName);
    userDetails.name = validatedUserName;
    console.log (userDetails.name);
    userDetails.location = document.querySelector("#user-location").value;
    userDetails.starsign = document.querySelector("#star-sign-dropdown").value;
    let heading = document.getElementById("heading");
    heading.innerText = `Welcome back, ${userDetails.name}!`
    console.log(userDetails);

    closeModal();
    userDetailsButton.reset();
}

function pageLoad () {
    weatherDisplay();
    }

pageLoad();

function setForecastSelection () {
    let forecastSelection = document.getElementById("forecast-dropdown").value;
    console.log(forecastSelection);
    if (forecastSelection === "horoscope") {
        horoscopeDisplay();
    }
    else weatherDisplay();  
}

let userDetailsButton = document.getElementById("change-user-info");
userDetailsButton.addEventListener("submit", setUserDetails);
let forecastDropdown = document.getElementById("forecast-dropdown");
forecastDropdown.addEventListener("change", setForecastSelection);
let newsTopicsDropdown1 = document.getElementById("topics-1-dropdown");
newsTopicsDropdown1.addEventListener("change", handleDropDown1Change);
let newsTopicsDropdown2 = document.getElementById("topics-2-dropdown");
newsTopicsDropdown2.addEventListener("change", handleDropDown2Change);
let newsTypeSelection = "headlines";
let DropDownContainerId;
let DropDownSelection;

function handleDropDown1Change (){
    DropDownSelection = "topics-1-dropdown";
    DropDownContainerId = "topics-1-headlines";
    newsItemsDisplay();
}

function handleDropDown2Change (){
    DropDownSelection = "topics-2-dropdown";
    DropDownContainerId = "topics-2-headlines";
    newsItemsDisplay();
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
            console.log(horoscope.description);
            return horoscope;
        }
  
async function fetchNewsType (){
    console.log ("fetch request");
    let guardianApiKey = `ccf9a5bd-5549-4c8f-ae0c-62bfd3938f71`;
    newsTypeSelection = document.getElementById(`${DropDownSelection}`).value;
    console.log(DropDownContainerId);
    console.log(newsTypeSelection);
    let newsType = "";
    if (newsTypeSelection !== "headlines") {
          newsType = `section=${newsTypeSelection}`;
        }
    let response = await fetch(`http://content.guardianapis.com/search?${newsType}&api-key=${guardianApiKey}&show-fields=thumbnail`);
    newsItems = await response.json();
    console.log (response);
    console.log(newsType);
    console.log(newsItems);
    // console.log(newsItems.response.results[0].webTitle);
    // console.log(newsItems.response.results[0].webUrl);
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
    console.log(weather);
    console.log(weather.current.temp_c);
    console.log(weather.current.condition.icon);
    return weather;
}

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
    console.log(imageLink);
    document.body.style.backgroundImage = `url(${imageLink})`;
    console.log(nasaPicture);
    console.log(nasaPicture.title);
  }
  
  getRandomNasaBackground();

  async function weatherDisplay () {
      let weatherDetails = await fetchWeather();
      let weatherImage = document.getElementById("weather-icon");
      weatherImage.src = `${weatherDetails.current.condition.icon}`;
      let weatherTemperature = document.getElementById("temperature");
      weatherTemperature.innerText = `${weatherDetails.current.temp_c}°C`;
      let weatherLocation = document.getElementById("weather-location");
      weatherLocation.innerText = `${weatherDetails.location.name}`;
  }

async function newsItemsDisplay () {
     newsItems = await fetchNewsType();
     let ulTopics1 = document.getElementById(`${DropDownContainerId}`);
     console.log(DropDownContainerId + "ul ID");
     for (let i=0; i<4; i++) {
         console.log("for loop running");
         // add section
         let newsItemSection = document.createElement("section");
         newsItemSection.classList.add("headline");
         // add title in section as link
         let newsItemTitle = document.createElement("a");
         newsItemTitle.classList.add("link");
         newsItemTitle.innerText = newsItems.response.results[i].webTitle;
         newsItemTitle.href = newsItems.response.results[i].webUrl;
         // add image in section
         let newsItemImage = document.createElement("img");
         newsItemImage.src=newsItems.response.results[i].fields.thumbnail;
        //  console.log(newsItems.response.results[i].fields.thumbnail)
         newsItemImage.classList.add("headline-image");
         // create section in DOM
         ulTopics1.appendChild(newsItemSection);
         // add section in DOM
         newsItemSection.appendChild(newsItemTitle);
         newsItemSection.appendChild(newsItemImage);
        }
     }

   async function horoscopeDisplay () {
      let horoscopeDetails = await fetchHoroscope();
      let horoscopeImage = document.getElementById("horoscope-icon");
      horoscopeImage.src = `/images/${userDetails.starsign}.png`;
      let horoscopeDescription = document.getElementById("horoscope-description");
      horoscopeDescription.innerText = `"${horoscopeDetails.description}"`;
      console.log(horoscopeImage.src);
      console.log(horoscopeDescription);
  }

