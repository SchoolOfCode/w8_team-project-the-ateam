
// let horoscope = fetchHoroscope();
// let newsItems = fetchNews();
// let newsChoices =["", "section=sports", "section=technology", "section=film"];
// let signChoices = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

// var requestOptions = {
    //     method: 'GET',
    //     headers: {
        //           "Content-Type":"application/json; charset=UTF-8"},
        //     redirect: 'follow'
        //   };
        
async function fetchHoroscope (starsign) {
            let sign = starsign;
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
        
async function fetchNews(type){ // Technology news
    let guardianApiKey = `ccf9a5bd-5549-4c8f-ae0c-62bfd3938f71`;
    let newsType = type;
    response = await fetch(`http://content.guardianapis.com/search?${newsType}&api-key=${guardianApiKey}`);
    let newsItems = await response.json();
    console.log(newsType);
    console.log(newsItems.response.results[0].webTitle);
    console.log(newsItems.response.results[0].webUrl);
    return newsItems;
}

async function fetchTechNews(){ // Technology news
    let apiLink = `http://content.guardianapis.com/search?section=technology&api-key=${guardianApiKey}`;
    response = await fetch(apiLink)
    let technologyArticles = await response.json();
    return technologyArticles;
}

async function fetchFilmNews(){ // Film news
    let apiLink = `http://content.guardianapis.com/search?section=film&api-key=${guardianApiKey}`;
    response = await fetch(apiLink)
    let filmArticles = await response.json();
    return filmArticles;
}

async function fetchHeadlineNews(){ // Headline news
    let apiLink = `http://content.guardianapis.com/search?&api-key=${guardianApiKey}`;
    response = await fetch(apiLink)
    let headlineArticles = await response.json();
    return headlineArticles;
}
