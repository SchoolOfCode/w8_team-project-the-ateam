
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
