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



// let horoscope = fetchHoroscope();
// let newsItems = fetchNews();
let userDetails = {
    name: "name",
    location: "wolverhampton",
    starsign: "gemini"
}


function setUserDetails (event) {
    event.preventDefault();
    console.log("buttonjoy");
    userDetails.name = document.querySelector("#user-name").value;
    userDetails.location = document.querySelector("#user-location").value;
    userDetails.starsign = document.querySelector("#star-sign-dropdown").value;
    console.log(userDetails);
}

let userDetailsButton = document.getElementById("change-user-info");
userDetailsButton.addEventListener("submit", setUserDetails);

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
        
async function fetchNews(type){ // type = "section=type"
    let guardianApiKey = `ccf9a5bd-5549-4c8f-ae0c-62bfd3938f71`;
    let newsType = type;
    let response = await fetch(`http://content.guardianapis.com/search?${newsType}&api-key=${guardianApiKey}`);
    let newsItems = await response.json();
    console.log(newsType);
    console.log(newsItems.response.results[0].webTitle);
    console.log(newsItems.response.results[0].webUrl);
    return newsItems;
}

async function fetchWeather () {
    let location = userDetails.location;
    let response = await fetch(`https://yahoo-weather5.p.rapidapi.com/weather?location=${location}&format=json&u=c`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "c6b7faf605msha0634e3b1f07049p1d0dbdjsn61e10d597152",
		"x-rapidapi-host": "yahoo-weather5.p.rapidapi.com"
	}
})
    let weather = await response.json();
    console.log(weather);
    console.log(weather.current_observation.condition.temperature);
    console.log(weather.current_observation.condition.text);
    return weather;
}
