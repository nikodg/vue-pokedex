<template>
  <div class="loading-wrap">
    <div class="loading" />
  </div>
</template>

<script setup>

</script>

<style scoped>
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loading-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loading {
    border: 4px solid #f3f3f3;
    border-top: 4px solid var(--pkm-blue);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 2s linear infinite;
  }
</style>

