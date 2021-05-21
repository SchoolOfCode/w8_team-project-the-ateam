
// let horoscope = fetchHoroscope();
// let newsItems = fetchNews();
// let newsChoices =["", "section=sports", "section=technology", "section=film"];
// let signChoices = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
// let userDetails = {
//     name: "name",
//     location: "location",
//     starsign: "starsign"
// }
        
async function fetchHoroscope (sign) {
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

async function fetchWeather (location) {
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