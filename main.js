
let horoscope = "";
let sign = "scorpio";

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