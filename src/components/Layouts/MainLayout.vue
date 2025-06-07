<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router';
import { gsap } from 'gsap';
import { generateRouteOrder } from '@/utils/generateRouteOrder.ts';
import { routers } from '@/router';

const route = useRoute();

const prevIndex = ref<number>(generateRouteOrder(routers)[route.path] ?? 0);
const isForward = ref<boolean>(true);

watch(
  () => route.path,
  newPath => {
    const newIndex = generateRouteOrder(routers)[newPath] ?? 0;
    isForward.value = newIndex >= prevIndex.value;
    prevIndex.value = newIndex;
  }
);

const beforeEnter = (el: Element) => {
  const direction = isForward.value ? 100 : -100;

  gsap.set(el, {
    x: direction,
    opacity: 0,
  });
};

const enter = (el: Element, done: () => void) => {
  gsap.to(el, {
    duration: 0.5,
    x: 0,
    opacity: 1,
    ease: 'power2.out',
    onComplete: done,
  });
};

const leave = (el: Element, done: () => void) => {
  const direction = isForward.value ? -100 : 100;

  gsap.to(el, {
    duration: 0.4,
    x: direction,
    opacity: 0,
    ease: 'power2.in',
    onComplete: done,
  });
};
</script>

<template>
  <div class="overflow-hidden">
    <RouterView v-slot="{ Component }">
      <transition mode="out-in" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<style scoped></style>
