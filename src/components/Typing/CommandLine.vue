<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { gsap } from 'gsap';

const props = defineProps<{
  showCursor?: boolean;
  loop?: boolean;
  loopDelay?: number;
  typeSpeed?: number;
  deleteSpeed?: number;
}>();

const slotContent = ref('');
const displayedText = ref('');
const cursorVisible = ref(true);
const rootRef = ref<HTMLElement | null>(null);

let typingTimeline: gsap.core.Timeline | null = null;
let cursorTween: gsap.core.Tween | null = null;

const typeSpeed = (props.typeSpeed ?? 50) / 1000;
const deleteSpeed = (props.deleteSpeed ?? 30) / 1000;
const loopDelay = (props.loopDelay ?? 2000) / 1000;

const startTyping = () => {
  displayedText.value = '';
  typingTimeline?.kill();
  typingTimeline = gsap.timeline({
    repeat: 0,
    onComplete: () => {
      if (props.showCursor) startCursorBlink();
      if (props.loop) {
        gsap.delayedCall(loopDelay, () => {
          stopCursorBlink();
          startDeleting();
        });
      }
    },
  });

  for (let i = 1; i <= slotContent.value.length; i++) {
    typingTimeline.call(
      () => {
        displayedText.value = slotContent.value.slice(0, i);
      },
      undefined,
      `+=${typeSpeed}`
    );
  }
};

const startDeleting = () => {
  typingTimeline?.kill();
  typingTimeline = gsap.timeline({
    repeat: 0,
    onComplete: () => {
      startTyping();
    },
  });

  for (let i = slotContent.value.length - 1; i >= 0; i--) {
    typingTimeline.call(
      () => {
        displayedText.value = slotContent.value.slice(0, i);
      },
      undefined,
      `+=${deleteSpeed}`
    );
  }
};

const startCursorBlink = () => {
  if (!props.showCursor) return;
  cursorTween = gsap.to(
    {},
    {
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      onRepeat: () => {
        cursorVisible.value = !cursorVisible.value;
      },
    }
  );
};

const stopCursorBlink = () => {
  cursorTween?.kill();
  cursorVisible.value = true;
};

onMounted(async () => {
  await nextTick();
  if (rootRef.value) {
    slotContent.value = rootRef.value.innerText.trim();
    startTyping();
  }
});

onBeforeUnmount(() => {
  typingTimeline?.kill();
  cursorTween?.kill();
});
</script>

<template>
  <div>
    <slot name="prefix" />

    <span>
      {{ displayedText }}<span v-if="showCursor" :class="{ 'opacity-0': !cursorVisible }">_</span>
    </span>

    <span ref="rootRef" class="hidden">
      <slot />
    </span>
  </div>
</template>

<style scoped></style>
