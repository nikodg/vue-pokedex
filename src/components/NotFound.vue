<template>
  <h2 class="not-found">
    We haven't catched this Pokémon "{{ route.params.name }}" yet.
  </h2>
</template>

<script setup>
  import { useRoute } from 'vue-router';

  const route = useRoute();
</script>

<style>
  .not-found {
    text-align: center;
    padding: 20px;
    margin-top: 60px;
  }
</style>

