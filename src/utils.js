import axios from 'axios';

const url = "https://pokeapi.co/api/v2/pokemon/";

export function getImage(url, baseUrl) {
  const paths = url.split("/");
  const id = paths[paths.length - 2];
  return `${baseUrl}${id}.png`;
}

export async function fetchData(url) {
  try {
    let res = await axios.get(url);
    return res.data;

  } catch (e){
    return false;
  }
}

export async function fetchPokemon(path = "") {
  return await fetchData(`${url}${path}`);
}