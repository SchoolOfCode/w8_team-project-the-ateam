// pic of day

async function getBackground() {
  const NasaApiKey = "d1I88fYYUtxlURwBFr15pmDXpsIb0sAADqcKSHnh";
  let backgrounds = ["2020-04-05", "2020-02-04", "2020-04-06"];
  let apiLink = `https://api.nasa.gov/planetary/apod?api_key=${NasaApiKey}&date=${backgrounds[1]}`;
  const response = await fetch(apiLink);
  const obj = await response.json();
  let imageLink = obj.url;
  console.log(imageLink);
  document.body.style.backgroundImage = `url(${imageLink})`;
  console.log(obj);
}
getBackground();
