import { Character } from "../types";
import * as api from "../api";

export function addCharacterCard(character: Character, episodeName: string) {
  //CARD ELEMENT
  const card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("card--character");

  //CARD IMAGE
  const image = <HTMLImageElement>document.createElement("img");
  image.classList.add("card__image");
  image.src = character.image;
  card.appendChild(image);

  //CARD CONTENT
  const content = document.createElement("div");
  content.classList.add("card__content");
  card.appendChild(content);

  //CONTENT HEADING
  const heading = document.createElement("div");
  heading.classList.add("card__content__heading");
  content.appendChild(heading);

  const name = document.createElement("h1");
  name.appendChild(document.createTextNode(character.name));
  heading.appendChild(name);

  const statusAndSpecies = document.createElement("h2");
  statusAndSpecies.appendChild(
    document.createTextNode(
      `${character.status == "Alive" ? "🟢" : "🔴"} ${character.status} - ${
        character.species
      }`
    )
  );
  heading.appendChild(statusAndSpecies);
  //   CONTENT DETAILS
  for (let i = 1; i < 3; i++) {
    const title = i == 1 ? "Last known location:" : "First seen in:";
    const text = i == 1 ? character.location.name : episodeName;

    //DETAIL
    const details = document.createElement("div");
    details.classList.add("card__content__details");
    content.appendChild(details);

    //DETAIL TITLE
    const detailsHeading = document.createElement("h3");
    detailsHeading.appendChild(document.createTextNode(title));
    details.appendChild(detailsHeading);

    //DETAIL TEXT
    const detailsText = document.createElement("p");
    detailsText.appendChild(document.createTextNode(text));
    detailsText.addEventListener("click", () => {
      document.querySelector(".container__characters").innerHTML = "";
      const title = <HTMLHeadingElement>document.querySelector(".main-heading");
      title.style.display = "flex";
      title.innerHTML = text;

      if (i == 1) {
        locationFilter(text);
      } else {
        episodeFilter(text);
      }
    });

    details.appendChild(detailsText);
  }

  document.querySelector(".container__characters").appendChild(card);
}

////////////LOCATIONS AND EPISODES HYPER-LINKS///////////

async function locationFilter(location: string) {
  await api.getCharactersOfTheLocation(location).then((data) => {
    data.forEach(async function characterURL(url: string) {
      await api.getCharacter(url).then(async function (data) {
        await api.getEpisodeName(data.episode[0]).then((episodeName) => {
          addCharacterCard(data, episodeName);
        });
      });
    });
  });
}

async function episodeFilter(episode: string) {
  await api.getCharactersOfTheEpisode(episode).then((data) => {
    data.forEach(async function characterURL(url: string) {
      await api.getCharacter(url).then((data) => {
        addCharacterCard(data, episode);
      });
    });
  });
}
