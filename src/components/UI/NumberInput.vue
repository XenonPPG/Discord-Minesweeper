<script setup lang="ts">
import { toRefs, computed, ref } from 'vue'
import HoldButton from './HoldButton.vue'

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  label: String,
  // min/max могут быть либо числом, либо функцией, возвращающей число
  min: { type: [Number, Function], default: null },
  max: { type: [Number, Function], default: null },
} as const)

const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>()

const { modelValue, min, max } = toRefs(props)

// вычисляем текущие границы, вызывая функцию, если нужно
const minVal = computed(() => typeof min.value === 'function' ? (min.value as () => number)() : min.value as number | null)
const maxVal = computed(() => typeof max.value === 'function' ? (max.value as () => number)() : max.value as number | null)

// для хранения предыдущего значения при фокусе
const prev = ref<number | null>(null)

function onFocus() {
  prev.value = modelValue.value
}

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  const raw = target.value

  // если поле полностью очищено — отображаем пустое и не меняем modelValue
  if (raw === '') {
    target.value = ''
    return
  }

  // иначе приводим к числу и применяем ограничение
  let v = Number(raw)
  if (minVal.value != null && v < minVal.value) v = minVal.value
  if (maxVal.value != null && v > maxVal.value) v = maxVal.value

  emit('update:modelValue', v)
  target.value = String(v)
}

function onBlur(event: FocusEvent) {
  const target = event.target as HTMLInputElement
  if (target.value === '') {
    // возвращаем предыдущее значение или, если его нет, min или 0
    const fallback = prev.value != null
      ? prev.value
      : (minVal.value != null ? minVal.value : 0)
    emit('update:modelValue', fallback)
    target.value = String(fallback)
  }
}

function change(delta: number) {
  let v = modelValue.value + delta
  if (minVal.value != null && v < minVal.value) v = minVal.value
  if (maxVal.value != null && v > maxVal.value) v = maxVal.value
  emit('update:modelValue', v)
}
</script>

<template>
  <div class="flex flex-column">
    <label for="input">{{ label }}</label>
    <div class="flex">
      <input
        id="input"
        type="number"
        :min="minVal"
        :max="maxVal"
        :value="modelValue"
        @focus="onFocus"
        @input="onInput"
        @blur="onBlur"
        class="cell-inverted input"
      >
      <HoldButton
        class="cell cell-button"
        @click="change(-1)"
        :disabled="minVal != null && modelValue <= minVal"
      >-</HoldButton>
      <HoldButton
        class="cell cell-button"
        @click="change(1)"
        :disabled="maxVal != null && modelValue >= maxVal"
      >+</HoldButton>
    </div>
  </div>
</template>

<style scoped>
@import "/src/assets/main.css";

button {
  height: 2.5rem;
  width: 2.5rem;
  font-weight: bold;
}

label {
  text-align: start;
}
</style>
