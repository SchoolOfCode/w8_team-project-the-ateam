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