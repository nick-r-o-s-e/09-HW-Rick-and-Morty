export function getCharactersPage(page: number) {
  return fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then((response) => response.json())
    .then((data) => data.results);
}

export function getEpisodeName(episodeUrl: string) {
  return fetch(episodeUrl)
    .then((response) => response.json())
    .then((data) => data.name);
}

export function getCharactersOfTheLocation (name:string) {
    
    return fetch(`https://rickandmortyapi.com/api/location/?name=${name}`)
    .then((response) => response.json())
    .then((data) => data.results[0].residents);
}
export function getCharactersOfTheEpisode (name:string) {
    
    return fetch(`https://rickandmortyapi.com/api/episode/?name=${name}`)
    .then((response) => response.json())
    .then((data) => data.results[0].characters);
}
export function getCharacter (URL:string) {
    
    return fetch(URL)
    .then((response) => response.json())
    .then((data) => data);
}

