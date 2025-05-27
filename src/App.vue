<script setup>
import LocaleSwitch from './components/LocaleSwitch.vue';
import router from './router';
import { RouterLink, RouterView } from 'vue-router'

const allRoutes = router.options.routes;
</script>

<template>
  <!-- title -->
  <h1 class="main-title">
    <span v-for="(letter, index) in 'Discor'" :key="index" class="main-title"
      :style="`color: var(--color-num-${index + 1});`">{{ letter }}</span>
    <span class="main-title" style="color: var(--color-num-8);">d</span> Minesweeper
  </h1>

  <!-- window -->
  <header class="flex">
    <!-- routes -->
    <div class="cell-inverted router" style="flex: 1;">
      <RouterLink v-for="route in allRoutes" :key="route.path" :to="route.path" class="cell cell-button router-link">
        {{ $t(`router.${route.name}`) }}
      </RouterLink>
    </div>

    <!-- locales -->
    <LocaleSwitch />
  </header>

  <!-- router view -->
  <div class="cell" id="content-view">
    <RouterView />
  </div>
</template>

<style scoped>
@import '/src/assets/main.css';

#content-view {
  margin-top: var(--cell-padding);
  width: 80rem;
  height: 33.25rem;
}

header {
  margin-top: calc(var(--cell-padding) * -3);
  display: flex;
  justify-content: center;
  /* align-items: center; */
  gap: var(--cell-padding);
}

.router {
  display: flex;
  gap: var(--gap);
}


.main-title {
  margin-top: calc(var(--cell-padding) * 2);
  top: -1.5rem;
  left: 2rem;

  font-size: 3rem;
  text-align: start;
}

#mt-1 {
  color: var(--color-num-3);
}

#mt-2 {
  color: var(--color-num-2);
}

#mt-3 {
  color: var(--color-num-1);
}

.router-link {
  color: var(--color-num-4);
  text-align: center;
  align-items: center;
  display: flex;
  font-size: large;
}
</style>