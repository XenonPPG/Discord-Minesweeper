<script setup>
import { ref, onMounted, watch } from 'vue'
import Cell from './UI/Cell.vue'
import CellDiscord from './UI/CellDiscord.vue'
import { useMinesweeperStore } from '@/stores/minesweeperStore'

const props = defineProps({
  editorMode: Boolean
})

const settings = useMinesweeperStore();


onMounted(settings.reloadField)
// settings.reloadField()

watch(
  () => [settings.width, settings.height, settings.mines],
  () => settings.reloadField()
)
</script>


<template>
  <div v-if="settings.field.length" class="cell" style="width: min-content;">
    <div class="field">
      <div class="flex" v-for="(row, rowIndex) in settings.field" :key="rowIndex">
        <div v-for="(cellValue, colIndex) in row" :key="colIndex">
          <CellDiscord v-if="editorMode" :revealed="true" :value="cellValue" :x="colIndex" :y="rowIndex" />
          <Cell v-else :revealed="false" :value="cellValue" :x="colIndex" :y="rowIndex" @reload-field="toggleMine" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import '/src/assets/main.css';

.field {
  border: 0.15rem var(--border-dark) solid;
  max-height: calc(3rem * 10);
  overflow-y: scroll;
  scrollbar-width: none;
}
</style>