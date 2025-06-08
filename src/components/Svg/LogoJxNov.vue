<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  width?: number;
  height?: number;
}

const props = defineProps<Props>();
const BASE_SIZE = 340;

const computedWidth = computed(() => {
  return props.width ?? props.height ?? BASE_SIZE;
});

const computedHeight = computed(() => {
  return props.height ?? props.width ?? BASE_SIZE;
});
</script>

<template>
  <div class="logo">
    <svg
      id="logoJxNov"
      :width="computedWidth"
      :height="computedHeight"
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style="overflow: visible"
    >
      <defs>
        <linearGradient
          id="logoGradient"
          x1="0"
          y1="150"
          x2="300"
          y2="150"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#42D392" />
          <stop offset="1" stop-color="#647EFF" />
        </linearGradient>
        <mask id="fillMask">
          <rect x="0" y="0" width="320" height="0" fill="white" />
        </mask>
      </defs>

      <path
        d="M30 240c0 7.956 3.161 15.587 8.7871 21.213C44.4132 266.839 52.0435 270 60 270s15.5868-3.161 21.2129-8.787c5.4502-5.45 8.5876-12.781 8.7783-20.468L90 240V30H60V0H170V.2002L243.486 270H270V0h30V300H220.582l-.001-.003-.016.005L147.023 30H120V240c0 15.913-6.321 31.175-17.573 42.427C91.1746 293.679 75.913 300 60 300s-31.1746-6.321-42.4268-17.573C6.3211 271.175 0 255.913 0 240H31.755Z"
        fill="url(#logoGradient)"
        mask="url(#fillMask)"
      />
      <path
        d="M30 240c0 7.956 3.161 15.587 8.7871 21.213C44.4132 266.839 52.0435 270 60 270s15.5868-3.161 21.2129-8.787c5.4502-5.45 8.5876-12.781 8.7783-20.468L90 240V30H60V0H170V.2002L243.486 270H270V0h30V300H220.582l-.001-.003-.016.005L147.023 30H120V240c0 15.913-6.321 31.175-17.573 42.427C91.1746 293.679 75.913 300 60 300s-31.1746-6.321-42.4268-17.573C6.3211 271.175 0 255.913 0 240H31.755Z"
        fill="none"
        stroke="url(#logoGradient)"
        stroke-width="3"
      />
    </svg>
  </div>
</template>

<style scoped></style>
