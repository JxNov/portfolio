<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useLanguage } from '@/composables/useLanguage';

const { initializeLanguage } = useLanguage();

onMounted(() => {
  initializeLanguage();
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
