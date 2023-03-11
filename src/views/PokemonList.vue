<template>
  <div class="pokemon-list container">
    <div class="row">
      <div 
        v-for="pokemon in pokemonsStore.pokemons"
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
      v-if="showInfiniteScroll"
      ref="observer"
      @intersect="loadMore" 
    />

    <AppLoader v-if="isFetching" />

    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <p v-if="hasError">
          Oops! We could not catch any Pokémon. Please refresh the page so we can try again.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { getImage, fetchPokemon } from "@/utils";
  import { useGoToDetails } from "@/composables/goToDetails";
  import { usePokemonsStore } from '@/stores/pokemons';

  import PokemonCard from "@/components/PokemonCard.vue";
  import InfiniteScroll from "@/components/InfiniteScroll.vue";
  import AppLoader from "@/components/AppLoader.vue";

  const imgBaseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
  const pokemonsStore = usePokemonsStore();
  const observer = ref(null);
  const hasError = ref(false);
  const isFetching = ref(false);

  const showInfiniteScroll = computed(() => {
    return pokemonsStore.pokemons.length
      && !hasError.value
      && !isFetching.value
  });

  async function getPokemons(path = "") {
    isFetching.value = true;
    let response = await fetchPokemon(path);
    if (!response) return handleError();
    pokemonsStore.updatePokemons(response.results);
    isFetching.value = false;
  }

  async function loadMore() {
    await getPokemons(`?offset=${pokemonsStore.offset}`);
  }

  function handleError() {
    hasError.value = true;
    if (observer.value) observer.value.unobserve();
  }

  const goToDetails = useGoToDetails();

  if (!pokemonsStore.pokemons.length)
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