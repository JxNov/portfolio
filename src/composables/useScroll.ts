import { ref } from 'vue';

const isReady = ref<boolean>(true);

export const useScroll = () => {
  return { isReady };
};
