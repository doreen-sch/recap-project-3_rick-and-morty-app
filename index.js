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
const maxPage = 1;
const page = 1;
const searchQuery = "";

// Fetch API

async function fetchCharacters() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    if (!response.ok) {
      throw new Error(`Failed to fetch Data! Status Code: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    return { error: error };
  }
}

async function handleFetchCharacters() {
  const result = await fetchCharacters();
  if (result.error) {
    console.log("An error occurred:", result.error);
  }
  return result;
  // } else {
  //   // console.log("Fetched data:", result.results);
  // }
}
const characters = await handleFetchCharacters();

console.log(characters);
