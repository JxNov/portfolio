<script setup lang="ts">
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { usePage } from '@/composables/usePage.ts';
import { useScroll } from '@/composables/useScroll.ts';
import LogoJxNov from '@/components/Svg/LogoJxNov.vue';

const { isReady } = useScroll();
const { isNewPage } = usePage();

onMounted(() => {
  const isFirstVisit = sessionStorage.getItem('visited') !== 'true';

  if (isFirstVisit) {
    sessionStorage.setItem('visited', 'true');

    const preloaderContainer = document.querySelector('#preloader-container') as HTMLDivElement;
    const logo = document.querySelector('#logoJxNov') as SVGSVGElement;
    const logoPath = logo.querySelector('path[stroke]') as SVGPathElement;
    const fillRect = logo.querySelector('rect') as SVGRectElement;
    const pathLength = logoPath?.getTotalLength() ?? 0;

    const tl = gsap.timeline();

    gsap.set(logoPath, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    tl.to(logoPath, {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: 'power2.out',
    })
      .fromTo(
        fillRect,
        { height: 0, y: 320 },
        {
          height: 320,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        }
      )
      .to('#quad2', {
        attr: { d: 'M 0 0 V 70 Q 50 90 100 70 V 0 z' },
        duration: 0.3,
        ease: 'power3.in',
        delay: 0.3,
      })
      .to('#quad2', {
        attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' },
        duration: 0.8,
        ease: 'power3',
        onComplete: () => {
          preloaderContainer.classList.add('hidden');
          isReady.value = false;
          isNewPage.value++;
        },
      })
      .to(
        '#logoJxNov',
        {
          yPercent: -100,
          duration: 1.4,
          ease: 'power4.out',
          onComplete: () => {
            preloaderContainer.classList.add('hidden');
            isReady.value = false;
            isNewPage.value++;
          },
        },
        '-=1'
      );
  } else {
    const preloaderContainer = document.querySelector('#preloader-container') as HTMLDivElement;
    preloaderContainer?.classList.add('hidden');
  }
});
</script>

<template>
  <div id="preloader-container" class="fixed z-50 h-full w-full overflow-hidden">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="absolute left-0 top-0 h-full w-full fill-primary-20"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        id="quad2"
        stroke="transparent"
        vector-effect="non-scaling-stroke"
        d="M 0 0 V 100 Q 50 100 100 100 V 0 z"
      />
    </svg>

    <div class="relative z-10 grid h-full w-full place-items-center">
      <div class="z-30 overflow-hidden">
        <LogoJxNov
          id="logoJxNov"
          class="transition-transform will-change-transform"
          :width="200"
          :height="200"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
