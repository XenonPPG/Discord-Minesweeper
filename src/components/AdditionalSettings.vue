<script setup>
import { useAdditionalStore } from '@/stores/additionalStore';

const additionalSettings = useAdditionalStore();
</script>

<template>
    <div id="additional-settings">
        <h3>{{ $t("as.header") }}</h3>
        <div class="flex-column" style="text-align: start;">
            <div>
                <!-- drawing mode -->
                <div class="flex">
                    <input type="checkbox" id="drawing-mode-checkbox" class="checkbox" v-model="additionalSettings.drawingMode">
                    <label class="no-select" for="drawing-mode-checkbox">{{ $t("as.draw") }}</label>
                </div>

                <!-- additional text -->
                <div class="flex">
                    <input type="checkbox" id="additional-text-checkbox" class="checkbox" v-model="additionalSettings.additionalText">
                    <label class="no-select" for="additional-text-checkbox">{{ $t("as.additional_text.primary") }}<br><span class="secondary">{{ $t("as.additional_text.secondary") }}</span></label>
                </div>

                <!-- field visible -->
                <div class="flex">
                    <input type="checkbox" id="reveal-field-checkbox" class="checkbox" v-model="additionalSettings.fieldVisible">
                    <label class="no-select" for="reveal-field-checkbox">{{ $t("as.show_field") }}</label>
                </div>

                <!-- no spoilers -->
                <div class="flex">
                    <input type="checkbox" id="reveal-field-discord-checkbox" class="checkbox" v-model="additionalSettings.noSpoilers">
                    <label class="no-select" for="reveal-field-discord-checkbox">{{ $t("as.no_spoilers.primary") }}<br><span class="secondary">{{ $t("as.no_spoilers.secondary") }}</span></label>
                </div>
                <br>
            </div>
        </div>
    </div>
</template>

<style>
.checkbox {
    min-width: 1rem;
    min-height: 1rem;
}
.checkbox:hover{
    cursor: pointer;
}

#additional-settings {
    width: min-content;
}
</style>