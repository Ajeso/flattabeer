"use strict";
const apiUrl = "/db.json";

const submitBtn = document.querySelector(".submit-btn");
const reviewsList = document.createElement("ul");

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);

    return data.beers || []; // Assuming beers is the array of beer objects
  } catch (err) {
    console.error("Error fetching data:", err);
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
  const imageTitle = document.createElement("h1");
  imageTitle.innerHTML = beer.name;
  imageContainer.appendChild(imageTitle);

  // Create and append image
  const beerImage = document.createElement("figure");
  const img = document.createElement("img");
  img.src = beer.image_url;
  img.alt = beer.name;
  const figcaption = document.createElement("figcaption");
  figcaption.innerHTML = beer.description;
  beerImage.appendChild(img);
  beerImage.appendChild(figcaption);
  imageContainer.appendChild(beerImage);

  imageContainer.appendChild(beerImage);

  if (beer.reviews && beer.reviews.length > 0) {
    const reviewContainer = document.getElementById("customer-reviews");

    beer.reviews.forEach((review) => {
      const reviewItem = document.createElement("li");
      reviewItem.innerHTML = review;
      reviewsList.appendChild(reviewItem);
    });

    reviewContainer.appendChild(reviewsList);
  }
}

submitBtn.addEventListener("click", () => {
  const review = document.getElementById("review");
  const reviewItem = document.createElement("li");
  reviewItem.textContent = review.value;
  reviewsList.appendChild(reviewItem);
  review.value = "";
});

const fetchBeers = async () => {
  const beers = await fetchData();

  displayBeerNames(beers);
};

fetchBeers();
