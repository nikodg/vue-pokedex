<template>
  <div class="evolution-wrap">
    <div class="species-details">
      <div class="pokemon-image">
        <img
          :src="getImage(chain.species.url, imgBaseUrl)" 
          :alt="chain.species.name" 
          @click="goToDetails(chain.species.name)" 
        />
      </div>

      <div 
        class="pokemon-name"
        @click="goToDetails(chain.species.name)"
      >
        {{ chain.species.name }}
      </div>
    </div>

    <div 
      v-if="chain.evolves_to.length"
      class="evolves-to"
    >
      <PokemonEvolution 
        v-for="(evolution, i) in chain.evolves_to"
        :key="i" :chain="evolution" 
      />
    </div>
  </div>
</template>

<script setup>
  import { getImage } from "@/utils";
  import { useGoToDetails } from "@/composables/goToDetails";
  import PokemonEvolution from "./PokemonEvolution.vue";

  defineProps({
    chain: {
      type: Object,
      required: true,
    }
  });

  const imgBaseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
  const goToDetails = useGoToDetails();
</script>

<style lang="scss">
.evolution-wrap {
  text-align: center;
  flex: 1;
  position: relative;
  z-index: 1;
}

.evolves-to {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  position: relative;

  &::before {
    content: "";
    width: 0;
    height: 0;
    border-top: solid 14px #fff;
    border-left: solid 14px transparent;
    border-right: solid 14px transparent;
    position: absolute;
    top: -44px;
    left: calc(50% - 14px);
  }
}

.species-details {
  margin-bottom: 46px;
  padding: 5px;

  .pokemon-name {
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 10px 0;
    cursor: pointer;
  }

  .pokemon-image {
    width: 116px;
    height: 116px;
    margin: 0 auto;
    box-shadow: 0px 0px 1px #000;
    border-radius: 50%;

    img {
      border-radius: 50%;
      border: solid 10px #fff;
      box-shadow: inset 0px 0px 1px #000;
      cursor: pointer;
    }
  }
}
</style>