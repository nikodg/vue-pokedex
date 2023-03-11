import { defineStore } from 'pinia';

export const usePokemonsStore = defineStore('pokemons', {
  state: () => ({
    pokemons: [],
    offset: 0,
  }),
  actions: {
    updatePokemons(pokemons) {
      this.pokemons = this.pokemons.concat(pokemons);
      this.offset += 20;
    }
  }
});