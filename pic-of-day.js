// pic of day

async function getBackground() {
  const NasaApiKey = "d1I88fYYUtxlURwBFr15pmDXpsIb0sAADqcKSHnh";
  let date = "2020-05-05";
  let apiLink = `https://api.nasa.gov/planetary/apod?api_key=${NasaApiKey}&date=${date}`;
  const response = await fetch(apiLink);
  const obj = await response.json();
  let imageLink = obj.url;
  console.log(imageLink);
  document.body.style.backgroundImage = `url(${imageLink})`;
}
getBackground();
