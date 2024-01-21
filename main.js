"use strict";
const apiUrl = "/db.json";

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);

    const beers = Object.values(data);
    console.log(beers);

    return beers;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayBeerNames(beers) {
  const beerList = document.getElementById("beerList");

  beers.forEach((beer) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = beer.id;

    listItem.addEventListener("click", () => {
      displayRandomImage(data);
    });

    beerList.appendChild(listItem);
  });

  // beerList.appendChild(listItem);
}
(async () => {
  const data = await fetchData();
  const beers = Object.values(data);

  console.log(data);

  //   console.log(beers);
  displayBeerNames(beers);

  console.log(data);
})();
