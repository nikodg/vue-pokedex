<template>
  <div class="pokemon-card">
    <div class="img-wrap">
      <img
        :src="image" 
        :alt="name" 
      />
    </div>

    <slot />
  </div>
</template>

<script setup>
  defineProps({
    name: String,
    image: String
  });
</script>

<style lang="scss" scoped>
.pokemon-card {
  text-align: center;
  font-size: 1.2em;
  padding: 20px 20px 0;
  margin: 15px 0;
  border-radius: var(--pkm-border-radius);
  box-shadow: 0px 0px 2px #222;
  background: #eee;

  &:hover {
    background-color: #e7e7e7;
  }

  .img-wrap {
    background: #C0EDEB;
    border-radius: var(--pkm-border-radius);
    box-shadow: inset 0 0 2px rgba(0,0,0,.75);
    padding: 10px;
    cursor: pointer;
  }

  img {
    max-width: 250px;
    width: 100%;
  }
}
</style>
