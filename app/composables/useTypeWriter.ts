export function useTypeWriter(strings: string[], {
  typeSpeed = 60,
  deleteSpeed = 30,
  pauseAfterType = 2000,
  pauseAfterDelete = 300,
} = {}) {
  const display = ref('');
  const cursor = ref(true);
  const isTyping = ref(true);

  let index = ref(0);
  let charIndex = ref(0);
  let deleting = ref(false);
  let blinkTimer: ReturnType<typeof setInterval> | null = null;
  let typeTimer: ReturnType<typeof setTimeout> | null = null;

  const startBlink = () => {
    blinkTimer = setInterval(() => {
      cursor.value = !cursor.value;
    }, 530);
  };

  const stopBlink = () => {
    if (blinkTimer) {
      clearInterval(blinkTimer);
      blinkTimer = null;
    }
  };

  const tick = () => {
    const current = strings[index.value];

    if (!deleting.value) {
      if (charIndex.value < current.length) {
        display.value += current[charIndex.value];
        charIndex.value++;
        typeTimer = setTimeout(tick, typeSpeed);
      } else {
        isTyping.value = false;
        stopBlink();
        cursor.value = true;
        typeTimer = setTimeout(() => {
          deleting.value = true;
          startBlink();
          tick();
        }, pauseAfterType);
      }
    } else {
      if (charIndex.value > 0) {
        display.value = display.value.slice(0, -1);
        charIndex.value--;
        typeTimer = setTimeout(tick, deleteSpeed);
      } else {
        deleting.value = false;
        isTyping.value = true;
        index.value = (index.value + 1) % strings.length;
        typeTimer = setTimeout(tick, pauseAfterDelete);
      }
    }
  };

  onMounted(() => {
    startBlink();
    tick();
  });

  onUnmounted(() => {
    stopBlink();
    if (typeTimer) clearTimeout(typeTimer);
  });

  return { display, cursor };
}
