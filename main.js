
let horoscope = "";
let sign = "scorpio";
let bingHeadlines = "test";
const newsAPIKey = "2b579cc8000b4b4ab8cb316fff3abf87";
let newsFromDate = "2021-05-15"
let newsCategory = "sports"
let newsHeadlines = fetchNewsHeadlines();


var requestOptions = {
    method: 'GET',
    headers: {
          "Content-Type":"application/json; charset=UTF-8"},
    redirect: 'follow'
  };

async function fetchHoroscope () {
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

async function fetchBingHeadlines () {
    let response = await fetch("https://bing-news-search1.p.rapidapi.com/news?textFormat=Raw&safeSearch=Off&setLang=en-GB", {
        "method": "GET",
        "headers": {
            "x-bingapis-sdk": "true",
            "x-rapidapi-key": "c6b7faf605msha0634e3b1f07049p1d0dbdjsn61e10d597152",
            "x-rapidapi-host": "bing-news-search1.p.rapidapi.com"
        }
        // this fetch request doesn't work when adding a category
    }
    )
    bingHeadlines = await response.json();
    return bingHeadlines;
}

var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: {
        'content-type': 'application/json',
        'X-API-KEY':'2b579cc8000b4b4ab8cb316fff3abf87'},
}

  
  async function fetchNewsHeadlines () {
      let response = await fetch("https://newsapi.org/v2/top-headlines?q=&from=2021-05-15&sortBy=popularity&apiKey=2b579cc8000b4b4ab8cb316fff3abf87&category=sports&country=gb");
      let newsHeadlines = await response.json();
      return newsHeadlines;
    }