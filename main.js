"use strict";
const apiUrl = "/db.json";

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);

    return data.beers || []; // Assuming beers is the array of beer objects
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

function displayBeerNames(beers) {
  const beerList = document.getElementById("beerList");

  beers.forEach((beer, index) => {
    console.log("Current beer:", beer);

    if (beer.name && typeof beer.name === "string" && beer.name.trim() !== "") {
      const listItem = document.createElement("li");
      listItem.innerHTML = beer.name;

      listItem.addEventListener("click", () => {
        console.log("Clicked beer:", beer);
        displayBeerImage(beer);
      });

      beerList.appendChild(listItem);

      // Automatically display the image for the first beer when the page loads
      if (index === 0) {
        displayBeerImage(beer);
      }
    } else {
      console.error("Invalid beer:", beer);
    }
  });
}

function displayBeerImage(beer) {
  const imageContainer = document.getElementById("image-container");
  console.log("Current beer:", beer);

  imageContainer.innerHTML = "";
  const imageTitle = document.createElement("h2");
  imageTitle.innerHTML = beer.name;
  imageContainer.appendChild(imageTitle);

  // Create and append image
  const beerImage = document.createElement("img");
  beerImage.src = beer.image_url;
  beerImage.alt = beer.name;
  imageContainer.appendChild(beerImage);

  if (beer.reviews && beer.reviews.length > 0) {
    const reviewContainer = document.getElementById("cutomer-reviews");
    const reviewsList = document.createElement("ul");

    beer.reviews.forEach((review) => {
      const reviewItem = document.createElement("li");
      reviewItem.innerHTML = review;
      reviewsList.appendChild(reviewItem);
    });

    reviewContainer.appendChild(reviewsList);
  }
}

(async () => {
  const beers = await fetchData();

  console.log(beers);
  displayBeerNames(beers);
})();
