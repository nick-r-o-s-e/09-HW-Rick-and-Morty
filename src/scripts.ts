import * as api from "./api";
import { Character } from "./types";
import { addCharacterCard } from "./elements/character-card";

let nextPage = 1;

async function displayPage(page: number) {
  if (page + 1 == 43) {
    noMorePages();
  }
  nextPage++;
  const title = <HTMLHeadingElement>document.querySelector(".main-heading");
  title.style.display = "none";
  await api.getCharactersPage(page).then((characters) => {
    characters.forEach(async function (character: Character) {
      await api.getEpisodeName(character.episode[0]).then((episodeName) => {
        addCharacterCard(character, episodeName);
      })
    });
  })
}

///////BUTTON///////
let button = document.querySelector(".load-more");
if (!button) {
  const loadBtn = document.createElement("button");
  loadBtn.classList.add("load-more");
  loadBtn.appendChild(document.createTextNode("Load More"));
  document.querySelector(".container").appendChild(loadBtn);

  button = loadBtn;
}
const btnEventHandler = () => {
  displayPage(nextPage);
};
button.addEventListener("click", btnEventHandler);

const noMorePages = () => {
  button.removeEventListener("click", btnEventHandler);
  button.classList.add("no-more-pages");
  button.innerHTML = "No more :(";
};

displayPage(nextPage).then(() => {
    const loadBtn = document.createElement("button");
    loadBtn.style.display = "block";
  });;;
