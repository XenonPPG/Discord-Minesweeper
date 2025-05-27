<script setup>
import { i18n } from '@/i18n';
import { computed } from 'vue';

const locale = computed(() => i18n.global.locale.value);

function ChangeLocale() {
    i18n.global.locale.value = locale.value === 'ru' ? 'en' : 'ru';
    console.log(locale.value);
}
</script>

<template>
    <button class="cell cell-button" @click="ChangeLocale">
        <img :src="`/src/assets/img/${locale}.png`">
    </button>
</template>

<style scoped>
@import '/src/assets/main.css';

.cell {
    height: min-content;
}

button {
    max-height: 100%;
    aspect-ratio: 1;
}

img {
    border: 0.15rem var(--border-click-dark) solid;
    padding: 0.15rem;
    width: calc((var(--cell-padding) + var(--border-width)) * 3);
}
</style>