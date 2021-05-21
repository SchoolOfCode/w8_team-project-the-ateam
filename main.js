// modal box 
const userInfoBox = document.querySelector("#user-info-box");
const userInfoBoxOpenButton = document.querySelector("#change-user-info-button");
const userInfoBoxCloseButton = document.querySelector("#close-modal");

userInfoBoxOpenButton.addEventListener("click", openModal);
userInfoBoxCloseButton.addEventListener("click", closeModal);

function openModal() {
    userInfoBox.style.display = "block";
}
function closeModal() {
    userInfoBox.style.display = "none";
}

// search bar
const searchBar = document.querySelector("#search-bar");
const userSearch = document.querySelector("#user-search");

let userSearchQuery = userSearch.value 

function convertUserSearch(word) {
    return word.replace(` `,`+`);
    // only replaces first instance of " " with "+" deffo needs changing
}

searchBar.addEventListener("submit", googleSomething);

function googleSomething() {
    let search = convertUserSearch(userSearchQuery);
    searchBar.action = `https://www.google.com/search?q=${search}`;
    searchBar.target = "_blank";
    // only opens google homepage???

}

// horoscope
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