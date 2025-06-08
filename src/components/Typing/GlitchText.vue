<script setup lang="ts">
import { ref } from 'vue';
import { gsap } from 'gsap';

const glitchText = ref<HTMLElement | null>(null);
let glitchTimeline: gsap.core.Timeline | null = null;

const startGlitch = () => {
  if (!glitchText.value) return;

  glitchTimeline = gsap.timeline({ repeat: -1, yoyo: true });

  glitchTimeline
    .to(glitchText.value, {
      x: () => gsap.utils.random(-1, 1),
      y: () => gsap.utils.random(-1, 1),
      skewX: () => gsap.utils.random(-1, 1),
      duration: 0.08,
      ease: 'power1.inOut',
      repeat: 5,
    })
    .to(
      glitchText.value,
      {
        textShadow: '2px 0 red, -2px 0 blue',
        duration: 0.08,
        ease: 'power1.inOut',
      },
      0
    );
};

const stopGlitch = () => {
  if (glitchTimeline) {
    glitchTimeline.kill();
    glitchTimeline = null;
  }

  if (glitchText.value) {
    gsap.set(glitchText.value, {
      x: 0,
      y: 0,
      skewX: 0,
      textShadow: 'none',
    });
  }
};
</script>

<template>
  <span ref="glitchText" @mouseenter="startGlitch" @mouseleave="stopGlitch">
    <slot />
  </span>
</template>

<style scoped></style>
