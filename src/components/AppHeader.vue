<template>
  <header class="pokedex-header">
    <div class="container">
      <div class="row">
        <div class="col-lg-1 col-md-1 col-sm-2 col-xs-3">
          <RouterLink to="/" class="home-button">
            HOME
          </RouterLink>
        </div>

        <div class="col-lg-11 col-md-11 col-sm-10 col-xs-9">
          <SearchBar @search="searchPokemon" />
        </div>

      </div>
    </div>
  </header>
</template>

<script setup>
  import { RouterLink } from 'vue-router';
  import { useGoToDetails } from "@/composables/goToDetails";
  import SearchBar from './SearchBar.vue';

  const goToDetails = useGoToDetails();
  
  function searchPokemon(keyword) {
    const name = keyword.toLowerCase();
    goToDetails(name);
  }
</script>

<style lang="scss" scoped>
.pokedex-header {
  padding-bottom: 0;
  padding-top: max(15px, env(safe-area-inset-top));
  background: var(--pkm-red);
  border-bottom: solid var(--pkm-border-thickness) var(--pkm-dark-red);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 2;

  &::before {
    content: "";
    height: 20px;
    width: 30%;
    position: absolute;
    left: 0;
    bottom: -18px;
    background: var(--pkm-red);
    border-bottom: solid var(--pkm-border-thickness) var(--pkm-dark-red);
  }

  &::after {
    content: "";
    height: 18px;
    width: 18px;
    height: 24px;
    width: 24px;
    background: var(--pkm-red);
    position: absolute;
    left: calc(30% - 12px);
    bottom: -13px;
    border-right: solid var(--pkm-border-thickness) var(--pkm-dark-red);
    transform: rotate(45deg);
  }
}

.home-button {
  width: 60px;
  height: 60px;
  display: block;
  border: solid 3px #fff;
  border-radius: 50%;
  text-align: center;
  padding-top: 14px;
  padding-left: 3px;
  background: var(--pkm-blue);
  color: var(--pkm-white);
  font-weight: 500;
  letter-spacing: 2px;
  box-shadow: 0px 0px 3px #000;

  &:hover {
    color: var(--pkm-white);
    background: var(--pkm-dark-blue);
    text-decoration: none;
  }

  &:visited, &:active, &:focus {
    color: var(--pkm-white);
    text-decoration: none;
  }
}
</style>