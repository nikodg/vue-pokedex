<template>
  <div class="pokemon-list container">
    <div class="row">
      <div 
        v-for="pokemon in state.pokemons"
        :key="pokemon.name"
        class="col-lg-3 col-md-4 col-sm-6 col-xs-12"
      >
        <PokemonCard
          :name="pokemon.name"
          :image="getImage(pokemon.url, imgBaseUrl)" 
          @click="goToDetails(pokemon.name)" 
        >
          <div class="pokemon-name">
            {{ pokemon.name }}
          </div>
        </PokemonCard>
      </div>
    </div>

    <InfiniteScroll 
      v-if="state.infiniteScroll"
      ref="observer"
      @intersect="loadMore" 
    />

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <button 
          v-if="!state.infiniteScroll && state.pokemons.length"
          class="pokemon-button load-more"
          @click="loadMore"
        >
          Load More
        </button>

        <p v-if="state.hasError">
          Oops! We could not catch any Pokémon. Please refresh the page so we can try again.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, ref } from "vue";
  import { getImage, fetchPokemon } from "@/utils";
  import { useGoToDetails } from "@/composables/goToDetails";

  import PokemonCard from "@/components/PokemonCard.vue";
  import InfiniteScroll from "@/components/InfiniteScroll.vue";

  const imgBaseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
  const observer = ref(null);
  const state = reactive({
    pokemons: [],
    offset: 0,
    hasError: false,
    infiniteScroll: false,
  });

  async function getPokemons(path = "") {
    let response = await fetchPokemon(path);
    if (!response) return handleError();
    state.pokemons = state.pokemons.concat(response.results);
  }

  async function loadMore() {
    state.offset += 20;
    await getPokemons(`?offset=${state.offset}`);
    state.infiniteScroll = true;
  }

  function handleError() {
    state.hasError = true;
    if (observer.value) observer.value.unobserve();
  }

  const goToDetails = useGoToDetails();

  getPokemons();
</script>

<style lang="scss" scoped>
.pokemon-list {
  padding-bottom: 60px;

  .pokemon-name {
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 10px 0;
    cursor: pointer;
  }

  .pokemon-button {
    border: solid var(--pkm-border-thickness) var(--pkm-black);
    border-radius: var(--pkm-border-radius);
    background: var(--pkm-yellow);
    padding: 8px;
    font-size: 1.2em;
  }
}

.load-more {
  margin: 30px auto 0;
  max-width: 400px;
  width: 100%;
  display: block;
}
</style>