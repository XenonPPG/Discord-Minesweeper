<template>
    <div>
      <slot />
    </div>
  </template>
  
  <script setup>
  import { ref, provide } from 'vue';
  
  const openIndex = ref(null);
  const items = ref([]);
  
  function registerCollapsible() {
    const id = items.value.length;
    items.value.push(id);
    return id;
  }
  
  function unregisterCollapsible(id) {
    const idx = items.value.indexOf(id);
    if (idx > -1) items.value.splice(idx, 1);
   }
  
  provide('openIndex', openIndex);
  provide('toggleIndex', (idx) => {
    openIndex.value = openIndex.value === idx ? null : idx;
  });
  provide('registerCollapsible', registerCollapsible);
  provide('unregisterCollapsible', unregisterCollapsible);
  </script>