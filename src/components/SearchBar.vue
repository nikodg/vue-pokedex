<template>
  <input
    type="text"
    class="search-input"
    placeholder="Search Pokémon by Name"
    v-model="keyword"
    @keyup="handleKeyUp"
  />

  <button 
    class="search-button"
    @click="handleClick">

    <img 
      src="/images/magnifying-glass.svg" 
      alt="Search Pokémon by name" 
    />
  </button>
</template>

<script setup>
  import { ref } from 'vue';

  const keyword = ref('');
  const emit = defineEmits(['search']);

  function emitSearch() {
    emit('search', keyword.value);
    keyword.value = "";
  }

  function handleKeyUp(e) {
    if (e.keyCode === 13) emitSearch();
  }
  
  function handleClick(keyword) {
    if (keyword) emitSearch();
  }
</script>

<style lang="scss" scoped>
.search-input {
  border: none;
  box-shadow: none;
  display: inline-block;
  width: calc(100% - 44px);
  font-size: 16px;
  padding: 9px 8px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: solid 2px #222;
  border-right: none;
}

.search-button {
  border: none;
  box-shadow: none;
  background: #ffcb05;
  padding: 7px 8px 9px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  width: 44px;
  height: 44px;
  float: right;
  line-height: 20px;
  border: solid 2px #222;
  
  img {
    width: 20px;
  }
}
</style>
