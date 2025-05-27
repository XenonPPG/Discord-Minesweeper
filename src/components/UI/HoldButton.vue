<script setup lang="ts">
import { onBeforeUnmount } from 'vue'

const props = defineProps({
  holdDelay: { type: Number, default: 200 },
  initialInterval: { type: Number, default: 200 },
  acceleration: { type: Number, default: 1.25 },
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

let timerId: number | null = null
let currentInterval = props.initialInterval

function clearTimer() {
  if (timerId !== null) {
    clearTimeout(timerId)
    timerId = null
  }
}

function startHold() {
  emit('click')
  currentInterval = props.initialInterval
  timerId = window.setTimeout(runAccelerate, props.holdDelay)
}

function runAccelerate() {
  emit('click')
  currentInterval = Math.max(50, currentInterval / props.acceleration)
  timerId = window.setTimeout(runAccelerate, currentInterval)
}

function stopHold() {
  clearTimer()
}

onBeforeUnmount(() => {
  stopHold()
})
</script>

<template>
  <button
    @pointerdown.prevent="startHold"
    @pointerup="stopHold"
    @pointerleave="stopHold"
  >
    <slot/>  
  </button>
</template>
