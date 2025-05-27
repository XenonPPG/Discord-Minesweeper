<script setup lang="ts">
import NumberInput from './UI/NumberInput.vue';
import HoldButton from './UI/HoldButton.vue';
import { useMinesweeperStore } from '@/stores/minesweeperStore';
import { ref, watch, computed } from 'vue';
import { useDefaultStore } from '@/stores/defaultStore';
import { useAdditionalStore } from '@/stores/additionalStore';

const minesweeper = useMinesweeperStore();
const additionalSettings = useAdditionalStore();
const defaults = useDefaultStore();

const mineLimit = computed(GetMineLimit);
const mineOptions = [
    {
        name: "🌸",
        percentage: 15
    },
    {
        name: "😎",
        percentage: 20
    },
    {
        name: "💀",
        percentage: 35
    },
]

function GetMineLimit() {
    var cells = minesweeper.width * minesweeper.height;
    if (cells < 9) return cells
    return Math.max(cells - 4, 1);
}

function SetMines(percentage) {
    var mineBuffer = minesweeper.mines;
    minesweeper.mines = Math.round(minesweeper.width * minesweeper.height / 100 * percentage);

    if (mineBuffer == minesweeper.mines) {
        minesweeper.reloadField();
    }
}

</script>

<template>
    <div class="settings">
        <h3>{{  $t("gs.header") }}</h3>
        <div class="flex" style="text-align: start;">
            <fieldset>
                <legend class="secondary">{{ $t("gs.size.title") }}</legend>
                <NumberInput :min="1" :max="9" :label="$t('gs.size.width')" v-model="minesweeper.width"/>
                <NumberInput :min="1" :max="9" :label="$t('gs.size.height')" v-model="minesweeper.height"/>
                <p class="secondary">{{ $t("gs.size.cells") }}: {{ minesweeper.width * minesweeper.height }}</p>
            </fieldset>
            <fieldset style="text-align: start;">
                <legend class="secondary">{{ $t("gs.mines.title") }}</legend>
                <NumberInput id="mine-input" :min="0" :max="mineLimit" v-model="minesweeper.mines" :label="$t('gs.mines.amount')" />
                <p class="secondary">({{ minesweeper.mines }}/{{ mineLimit
                }})</p>
                <div class="flex">
                    <HoldButton :hold-delay="defaults.noAcceleration.holdDelay" :acceleration="defaults.noAcceleration.acceleration" :initial-interval="defaults.noAcceleration.initialInterval"
                        v-for="option in mineOptions" :key="option.name" @click="SetMines(option.percentage)"
                        class="cell cell-button">
                        {{ option.name }}
                    </HoldButton>
                </div>
            </fieldset>
        </div>
    </div>
</template>

<style scoped>
@import '/src/assets/main.css';

.settings {
    display: flex;
    flex-direction: column;
    width: min-content;
}

.title {
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
}

legend {
    text-align: start;
}

fieldset {
    border: var(--border-dark) solid 0.05rem;
    padding: 0.5rem;
    margin: 0.5rem;
}
</style>