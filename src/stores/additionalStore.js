import { defineStore } from "pinia";
import { ref, onMounted, onUnmounted } from "vue";

export const useAdditionalStore = defineStore('additional', () => {
    const additionalText = ref(true);
    const fieldVisible = ref(true);
    const noSpoilers = ref(false);
    const drawingMode = ref(false);

    return { additionalText, fieldVisible, noSpoilers, drawingMode };
})