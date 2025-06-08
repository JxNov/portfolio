<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useLanguage } from '@/composables/useLanguage';
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const { t } = useI18n();
const { currentLanguage, initializeLanguage } = useLanguage();

const metaTitle = computed(() => {
  const titleKey = (route.meta.title as string) || 'META.DEFAULT.TITLE';
  return `${t(titleKey)} | JxNov`;
});

const metaDescription = computed(() => {
  const descriptionKey = (route.meta.description as string) || 'META.DEFAULT.DESCRIPTION';
  return t(descriptionKey);
});

useHead({
  htmlAttrs: {
    lang: currentLanguage,
  },
  title: metaTitle,
  meta: [{ name: 'description', content: metaDescription }],
});

onMounted(() => {
  initializeLanguage();
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
