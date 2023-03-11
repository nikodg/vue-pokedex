<template>
  <div class="loader-wrap">
    <div class="loader" />
  </div>
</template>

<script setup>

</script>

<style scoped>
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loader-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }

  .loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid var(--pkm-blue);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 2s linear infinite;
  }
</style>

