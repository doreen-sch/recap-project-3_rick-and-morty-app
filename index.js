import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]',
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

// Fetch API

async function fetchCharacters() {
  // let maxPages = false;
  // while (!maxPages) {

  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`,
    );
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to fetch Data! Status Code: ${response.status}`);
    }
    const data = await response.json();

    maxPage = data.info.pages;

    pagination.innerHTML = `${page} / ${maxPage}`;

    // console.log(data.info.pages, page);
    // if (data.info.pages === page) {
    //   maxPages = true;
    // }
    // return data;
    // page++;
    cardContainer.innerHTML = "";
    data.results.forEach((character) => {
      cardContainer.append(createCharacterCard(character));
    });
    navigation.style.visibility = "visible";
    return data;
  } catch (error) {
    return { error: error };
  }
  // }
}
fetchCharacters();
console.log(maxPage);

// Buttons

nextButton.addEventListener("click", () => {
  console.log(nextButton.style.display);
  if (page === maxPage - 1) {
    nextButton.style.visibility = "hidden";
  }
  if (page === 1) {
    prevButton.style.visibility = "visible";
  }
  page++;
  fetchCharacters();
});

prevButton.addEventListener("click", () => {
  console.log(prevButton.style.display);

  if (page === 2) {
    prevButton.style.visibility = "hidden";
  }
  if (page === maxPage) {
    nextButton.style.visibility = "visible";
  }
  page--;
  fetchCharacters();
});

async function handleFetchCharacters() {
  const result = await fetchCharacters();
  if (result?.error) {
    console.log("An error occurred:", result.error);
    cardContainer.innerHTML = "";
    navigation.style.visibility = "hidden";
  }
  return result;
  // } else {
  //   // console.log("Fetched data:", result.results);
  // }
}

// createCharacterCard();

// Search Bar

searchBar.addEventListener("input", (event) => {
  searchQuery = event.target.value;
  page = 1;
  const result = handleFetchCharacters();
  console.log(result);
  // if (result) {
  //   console.log(error);
  // }
});
