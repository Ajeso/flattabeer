"use strict";
const apiUrl = "/db.json";
const hello = "greeting";
console.log(hello);

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

(function displayBeerNames(beers) {
  const beerList = document.getElementById("#beerList");

  if (Array.isArray(beers) && beers.length > 0) {
    beers.forEach((beer) => {
      const listItem = document.createElement("li");
      listItem.textContent = beer.name;

      listItem.addEventListener("click", () => {
        displayRandomImage(beers);
      });

      beerList.appendChild(listItem);
    });

    // Clear previous content and append the new list to the nav
    beerNav.innerHTML = "";
    beerList.appendChild(listItem);
  } else {
    // console.error("Invalid data format or empty array for beers.");
  }
})(async () => {
  const data = await fetchData();
  console.log(data);
  //   const beers = Object.values(data);
  //   console.log(beers);

  displayBeerNames(beers);

  console.log(data);
});
