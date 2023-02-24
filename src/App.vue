<template>
  <div>
    <AppHeader />

    <div class="main">
      <RouterView />
    </div>
    
    <AppFooter /> 
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<style lang="scss">
.main {
  min-height: calc(100vh - 188px);
}

@media (min-width: 768px){
  .main {
    min-height: calc(100vh - 160px);
  }
}
</style>
