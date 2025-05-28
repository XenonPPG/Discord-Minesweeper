<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useAdditionalStore } from '@/stores/additionalStore'
import { useMinesweeperStore } from '@/stores/minesweeperStore'

const props = defineProps({
  x: Number,
  y: Number
})

const minesweeper = useMinesweeperStore()
const additionalSettings = useAdditionalStore()

const count = computed(() => minesweeper.field[props.y][props.x])
const isMine = computed(() => count.value === -1)
const textColor = computed(() => `var(--color-num-${count.value})`)

const isMouseDown = ref(false);
const toggled = ref(false);
function handleMouse(flag) {
  isMouseDown.value = flag
  if(!flag){
    toggled.value = false;
  }
}
onMounted(() => {
  const downHandler = () => handleMouse(true)
  const upHandler   = () => handleMouse(false)

  window.addEventListener('mousedown', downHandler)
  window.addEventListener('mouseup',   upHandler)

  window._mouseDownHandler = downHandler
  window._mouseUpHandler   = upHandler
})

onUnmounted(() => {
  window.removeEventListener('mousedown', window._mouseDownHandler)
  window.removeEventListener('mouseup',   window._mouseUpHandler)
})

function ToggleMine(forceToggle) {
  if((isMouseDown.value && !toggled.value && additionalSettings.drawingMode) || forceToggle){
    minesweeper.toggleMine(props.x, props.y)
    toggled.value = true
  }
}

</script>

<template>
  <button @click="() => ToggleMine(true)" class="game-cell" @mousemove="() => ToggleMine(false)" @mouseleave="() => toggled = false">
    <div class="cell-content no-select">
      <div v-if="additionalSettings.fieldVisible" class="inner-cell" v-motion-pop>
        <p v-if="!isMine && count > 0" :key="`num-${x}-${y}`" :style="{ color: textColor }">
          {{ count }}
        </p>
        <img v-else-if="isMine" :key="`mine-${x}-${y}`" class="cell-img pixel-art" src="/src/assets/img/mine.png"
          alt="Mina" />
      </div>

      <p v-else :key="`hidden-${x}-${y}`" class="hidden-count" v-motion-pop>
        ?
      </p>
    </div>
  </button>
</template>

<style scoped>
@import '/src/assets/main.css';

.cell-content p {
  margin: 0;
}

.inner-cell {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.hidden-count {
  margin: 0;
  color: var(--color-num-8);
}

.game-cell {
  height: 3rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  background-color: transparent;
  border: var(--border-dark) 0.15rem dashed;
}

.game-cell:hover {
  cursor: pointer;
}

.cell-img {
  height: 2rem;
  width: 2rem;
}

.cell-content {
  height: 3rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
