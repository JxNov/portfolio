import { ref } from 'vue';

const isNewPage = ref<number>(0);

export const usePage = () => {
  return { isNewPage };
};
