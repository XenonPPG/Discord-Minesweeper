<template>
    <div class="cell collapsible" :class="{ 'is-closed': !isOpen }" @click="!isOpen && handleToggle()">
        <button class="collapsible-button" @click.stop="handleToggle()">
            <slot name="button"></slot>
        </button>
        <div ref="contentRef" class="content" :style="{ width, height }">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick, inject } from 'vue';

const props = defineProps({
    open: { type: Boolean, default: false }
});

const register = inject('registerCollapsible', null);
const unregister = inject('unregisterCollapsible', null);
const parentOpenIndex = inject('openIndex', null);
const parentToggleIndex = inject('toggleIndex', null);

const contentRef = ref(null);
const width = ref('0px');
const height = ref('0px');

let index = null;
if (register) {
    index = register();
    onBeforeUnmount(() => unregister && unregister(index));
}

const inGroup = computed(() => parentOpenIndex !== null && index !== null);
const localOpen = ref(props.open);
const isOpen = computed(() =>
    inGroup.value ? parentOpenIndex.value === index : localOpen.value
);

async function updateDimensions(val) {
    await nextTick();
    if (val && contentRef.value) {
        width.value = `${contentRef.value.scrollWidth}px`;
        height.value = `${contentRef.value.scrollHeight}px`;
    } else {
        width.value = '0px';
        height.value = '0px';
    }
}

function handleToggle() {
    if (inGroup.value) {
        parentToggleIndex && parentToggleIndex(index);
    } else {
        localOpen.value = !localOpen.value;
        updateDimensions(localOpen.value);
    }
}

watch(isOpen, (val) => updateDimensions(val));

onMounted(() => {
    if (inGroup.value) {
        if (props.open) {
            // Устанавливаем открытым в группе тот, у кого open=true
            parentToggleIndex && parentToggleIndex(index);
        }
    } else {
        if (localOpen.value) updateDimensions(true);
    }
});
</script>

<style>
@import '/src/assets/main.css';

.collapsible {
    overflow: hidden;
    width: min-content;
    height: min-content;
}

.collapsible.is-closed {
    cursor: pointer;
}

.collapsible-button {
    background: none;
    border: none;
    aspect-ratio: 1;
}

.collapsible-button:hover {
    cursor: pointer;
}

.content {
    overflow: hidden;
    width: 0;
    height: 0;
    transition: width 250ms, height 250ms;
    white-space: nowrap;
    word-break: keep-all;
}
</style>