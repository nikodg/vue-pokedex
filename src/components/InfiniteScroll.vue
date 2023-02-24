<template>
  <div ref="el" class="infinite-scroll" />
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';

  const el = ref(null);
  const observer = ref(null);
  const emit = defineEmits(['intersect']);

  onMounted(() => {
    observer.value = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) emit('intersect');
    });
    
    observer.value.observe(el.value);
  });

  onBeforeUnmount(() => {
    observer.value.unobserve(el.value);
  });
</script>

<style scoped>
.infinite-scroll {
  height: 1px;
}
</style>