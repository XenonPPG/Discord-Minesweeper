<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  revealed: boolean
  value: number
}>()

const isRevealed = ref(props.revealed)
const isFlagged = ref(false)
const isShiftPressed = ref(false)

const isMine = computed(() => props.value === -1)
const count = computed(() => (props.value > 0 ? props.value : 0))
const textColor = computed(() => `var(--color-num-${count.value})`)

function handlePress(event: MouseEvent) {
  if (event.shiftKey && !isRevealed.value) {
    isFlagged.value = !isFlagged.value
  } else if (!isFlagged.value) {
    isRevealed.value = true
  }
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Shift') isShiftPressed.value = true
}
function onKeyUp(e: KeyboardEvent) {
  if (e.key === 'Shift') isShiftPressed.value = false
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('keyup', onKeyUp)
})
</script>

<template>
  <button
    :class="[
      'cell game-cell',
      {
        'cell-button': !isRevealed && !isFlagged && !isShiftPressed,
        'cell-revealed': isRevealed
      }
    ]"
    @click="handlePress"
  >
    <div v-if="isRevealed" class="cell-content">
      <p v-if="!isMine && count > 0" :style="{ color: textColor }">{{ count }}</p>
      <img v-else-if="isMine" class="cell-img" src="/src/assets/img/mine.png" />
    </div>
    <img v-if="isFlagged" class="cell-img pixel-art" src="/src/assets/img/flag.png" />
  </button>
</template>

<style scoped>
@import '/src/assets/main.css';

.game-cell {
  height: 3rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
}

.game-cell:hover {
  cursor: pointer;
}

.cell-revealed {
  background-color: transparent;
  border: var(--border-dark) 0.15rem dashed;
}

.cell-revealed:hover {
  cursor: default !important;
}

.cell-img {
  height: 2rem;
  width: 2rem;
}

.cell-content {
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>