<script setup lang="ts">
import Collapsible from '@/components/UI/Collapsible.vue';
import CollapsibleGroup from '@/components/UI/CollapsibleGroup.vue';
import Info from '@/components/Info.vue'
import GameSettings from '@/components/GameSettings.vue';
import AdditionalSettings from '@/components/AdditionalSettings.vue';
import Minesweeper from '@/components/Minesweeper.vue';
import { ref, watch } from 'vue';
import HoldButton from '@/components/UI/HoldButton.vue';

import { useToast } from 'vue-toastification'
import { useMinesweeperStore } from '@/stores/minesweeperStore';
import { useAdditionalStore } from '@/stores/additionalStore';
import { useDefaultStore } from '@/stores/defaultStore';
import { i18n } from '@/i18n';

const minesweeper = useMinesweeperStore();
const defaults = useDefaultStore();

const additionalSettings = useAdditionalStore();

const emoji = ref({
    "0": ":zero:",
    "1": ":one:",
    "2": ":two:",
    "3": ":three:",
    "4": ":four:",
    "5": ":five:",
    "6": ":six:",
    "7": ":seven:",
    "8": ":eight:",
    "-1": ":boom:",
});

function CopyField() {
    navigator.clipboard.writeText("");

    const toast = useToast();
    var field = minesweeper.field;
    var result = "";

    if (additionalSettings.additionalText) {
        result +=
            `* ${i18n.global.t("field.size")}: ${minesweeper.width}x${minesweeper.height}
* ${i18n.global.t("field.mines")}: ${minesweeper.mines}
`
        if (!additionalSettings.noSpoilers) {
            result += `**${i18n.global.t("field.corners")}**\n`
        }
    }

    field.forEach(column => {
        column.forEach(row => {
            var newCell = `${emoji.value[row.toString()]}`
            if (!additionalSettings.noSpoilers) {
                newCell = `||${newCell}||`
            }
            result += newCell;
        })
        result += "\n";
    });
    result = result.slice(0, -1);

    navigator.clipboard.writeText(result);

    toast.success(i18n.global.t("toasts.copied"));
}

watch(
    () => [minesweeper.width, minesweeper.height],
    () => {
        minesweeper.mines = Math.min(minesweeper.mines, minesweeper.height * minesweeper.width);
    });
</script>

<template>
    <div class="flex" style="flex: 1 1 0; height: 100%; justify-content: space-between;">
        <div class="flex-column">
            <!-- reset -->
            <HoldButton class="cell cell-button DS-UI" :hold-delay="defaults.noAcceleration.holdDelay"
                :acceleration="defaults.noAcceleration.acceleration"
                :initial-interval="defaults.noAcceleration.initialInterval" @click="minesweeper.reloadField()">
                <img class="pixel-art" src="/src/assets/img/smile.png">
            </HoldButton>

            <!-- clear -->
            <button class="cell cell-button DS-UI" @click="minesweeper.mines = 0">
                <img class="pixel-art" src="/src/assets/img/clear.png">
            </button>

            <!-- copy -->
            <button class="cell cell-button DS-UI" @click="CopyField()">
                <img src="/src/assets/img/copy.png" class="pixel-art">
            </button>
        </div>

        <!-- minesweeper -->
        <div class="flex" style="flex: 1 1 0; justify-content: center; align-items: center;">
            <Minesweeper :editor-mode="true" />
        </div>

        <CollapsibleGroup class="flex-column" style="align-items: end; width: 5.3rem;">
            <!-- info -->
            <Collapsible class="flex flex-column tab">
                <template #button>
                    <img src="/src/assets/img/info.png" class="pixel-art">
                </template>

                <template #content>
                    <Info />
                </template>
            </Collapsible>

            <!-- settings -->
            <Collapsible class="flex flex-column tab" :open="true">
                <template #button>
                    <img src="/src/assets/img/gear.png" class="pixel-art">
                </template>

                <template #content>
                    <GameSettings />
                </template>
            </Collapsible>

            <!-- additional settings -->
            <Collapsible class="flex flex-column tab">
                <template #button>
                    <img src="/src/assets/img/red gear.png" class="pixel-art">
                </template>

                <template #content>
                    <AdditionalSettings />
                </template>
            </Collapsible>
        </CollapsibleGroup>
    </div>
</template>

<style scoped>
@import '/src/assets/main.css';
.tab {
    text-align: center;
    align-items: end;
}

img {
    width: 2.5rem;
    height: 2.5rem;
}

.checkbox {
    min-width: 1rem;
    min-height: 1rem;
}

.DS-UI {
    padding: calc(var(--cell-padding) + var(--border-width));
}
</style>