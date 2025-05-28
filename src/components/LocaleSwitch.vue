<script setup>
import { i18n } from '@/i18n';
import { setLocale } from '@/i18n'
import { computed } from 'vue';
import flagEn from '../assets/img/en.png'
import flagRu from '../assets/img/ru.png'

const flags = { en: flagEn, ru: flagRu }
const locale = computed(() => i18n.global.locale.value)

function ChangeLocale() {
    setLocale(locale.value == 'en' ? 'ru' : 'en');
}
</script>

<template>
    <button class="cell cell-button" @click="ChangeLocale">
        <img :src="flags[locale]" alt="flag">
    </button>
</template>

<style scoped>
@import '../assets/main.css';

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