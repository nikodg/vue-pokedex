import axios from 'axios';

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

export function getImage(url, src) {
  const paths = url.split("/");
  const id = paths[paths.length - 2];
  return `${src}${id}.png`;
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
  return await fetchData(`${BASE_URL}${path}`);
}