<template>
  <div 
    v-if="state.evolutions.evolves_to.length"
    class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
  >
    <h2>Evolution Chain</h2>

    <div :class="['evolution-chain', type]">
      <PokemonEvolution :chain="state.evolutions" />
    </div>
  </div>
</template>

<script setup>
  import { reactive } from 'vue';
  import { fetchData } from "@/utils";
  import PokemonEvolution from './PokemonEvolution.vue';

  const props = defineProps({
    evolutionChainUrl: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  });

  const state = reactive({ 
    evolutions: { evolves_to: [] }
  });

  const evo = await fetchData(props.evolutionChainUrl);
  state.evolutions = evo.chain;
</script>

<style lang="scss" scoped>
@import "../scss/variables";

@mixin imgBgEffect($color){
  background: $color;

  &:hover { 
    background: darken($color, 5%) 
  }
}

h2 {
  text-align: center;
  margin-top: 60px;
}

.evolution-chain {
  color: var(--pkm-white);
  background-color: #666;
  padding: 25px 20px;
  border-radius: 4px;
  overflow: auto;
  position: relative;

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    background-image: url(/images/pokeball-bg.png);
    z-index: 0;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.05;
  }

  &.normal :deep(img) { @include imgBgEffect($normal) }  
  &.fire :deep(img) { @include imgBgEffect($fire) }  
  &.fighting :deep(img) { @include imgBgEffect($fighting) }  
  &.water :deep(img) { @include imgBgEffect($water) }  
  &.flying :deep(img) { @include imgBgEffect($flying) }  
  &.grass :deep(img) { @include imgBgEffect($grass) }  
  &.poison :deep(img) { @include imgBgEffect($poison) }  
  &.electric :deep(img) { @include imgBgEffect($electric) }  
  &.ground :deep(img) { @include imgBgEffect($ground) }  
  &.psychic :deep(img) { @include imgBgEffect($psychic) }  
  &.rock :deep(img) { @include imgBgEffect($rock) }  
  &.ice :deep(img) { @include imgBgEffect($ice) }  
  &.bug :deep(img) { @include imgBgEffect($bug) }  
  &.dragon :deep(img) { @include imgBgEffect($dragon) }  
  &.ghost :deep(img) { @include imgBgEffect($ghost) }  
  &.dark :deep(img) { @include imgBgEffect($dark) }  
  &.steel :deep(img) { @include imgBgEffect($steel) }  
  &.fairy :deep(img) { @include imgBgEffect($fairy) }
}
</style>