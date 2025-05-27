<script setup>
import { i18n } from '@/i18n';
import { useToast } from 'vue-toastification'

const props = defineProps({
    text: String
});
const toast = useToast();

function Copy(){
    navigator.clipboard.writeText(props.text);
    toast.success(i18n.global.t("toasts.copied"));
}
</script>

<template>
    <button class="copy-text" @click="Copy" :title="$t('titles.copy')">
        <p>{{ props.text }}</p>
    </button>
</template>

<style>
@import '/src/assets/main.css';
.copy-text{
    background-color: var(--border-dark);
    border: none;
    color: var(--color-num-4);
}
.copy-text:hover{
    text-decoration: solid underline 0.1rem;
    cursor: pointer;
}
</style>