<template>
  <div class="pokemon-details container">
    <AppLoader v-if="state.loading" />
    <NotFound v-else-if="state.notFound" />
    <div
      v-else-if="state.pokemon"
      class="row"
    >
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <h1>
          #{{ padWithZeroes(state.pokemon.id) }} - {{ state.pokemon.species.name }}
        </h1>
      </div>
  
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <PokemonCard 
          :image="state.pokemon.sprites.other['official-artwork'].front_default"
          :name="state.pokemon.species.name"
        >
          <PokemonType :types="state.pokemon.types" />
        </PokemonCard>
      </div>
  
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <Suspense>
          <GreenScreen 
            v-if="state.species"
            :species="state.species" 
            :pokemon="state.pokemon" 
          />
        </Suspense>
      </div>
  
      <Suspense>
        <PokemonEvolutions 
          v-if="state.species"
          :evolution-chain-url="state.species.evolution_chain.url"
          :type="state.pokemon.types[0].type.name"
        />
      </Suspense>
    </div>
  </div>
</template>

<script setup>
  import { reactive, watch } from "vue";
  import { fetchPokemon, fetchData } from "@/utils";
  import { useRoute } from 'vue-router';

  import AppLoader from "@/components/AppLoader.vue";
  import NotFound from "@/components/NotFound.vue";
  import PokemonCard from "@/components/PokemonCard.vue";
  import PokemonType from "@/components/PokemonType.vue";
  import GreenScreen from "@/components/GreenScreen.vue";
  import PokemonEvolutions from "@/components/PokemonEvolutions.vue";

  const route = useRoute();

  watch(route, async () => {
    await getPokemonDetails();
  });

  const state = reactive({
    notFound: false,
    pokemon: null,
    species: null,
    loading: true,
  });

  async function getPokemonDetails() {
    state.loading = true;
    const response = await fetchPokemon(route.params.name);
    
    if (!response) {
      state.notFound = true;

    } else {
      state.notFound = false;
      state.pokemon = response;
      state.species = await fetchData(response.species.url);
    }

    state.loading = false;
  }

  function padWithZeroes(pokemonID) {
    let padded = '' + pokemonID;
    while (padded.length < 4) {
      padded = '0' + padded;
    }
    return padded;
  }

  getPokemonDetails();
</script>

<style lang="scss" scoped>
.pokemon-details {
  padding-bottom: 60px;

  h1 {
    text-align: center;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 1.5em;
    letter-spacing: 1px;
  }

  :deep(.pokemon-card) {
    border-radius: 10px;
    padding: 25px;
    box-shadow: none;
    border: solid 1px #aaa;
    margin-top: 0;

    .img-wrap {
      cursor: initial;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -19px;
      left: -19px;
      width: 70px;
      height: 70px;
      background: #fff;
      transform: rotate(45deg);
      border-top: solid 1px #aaa;
      box-sizing: border-box;
    }
  }
}
</style>