<script setup>
import ClipboardText from '@/components/UI/ClipboardText.vue';
</script>

<template>
  <h1>{{ $t("support.header") }}</h1>
  <div class="flex" style="justify-content: space-between; margin-right: 10rem;">
    <div class="flex-column" style="align-items: start; text-align: start;">
      <p>{{ $t("support.thanks.1") }}<br>
        {{ $t("support.thanks.2") }}</p>
      <label for="tron">{{ $t("support.tron") }}</label>
      <ClipboardText id="tron" :text="'TPK6RsQAyb2ZP4w98dk1PWZQDzh2vqcQXT'" />
      <br>
      <label for="email">{{ $t("support.email") }}</label>
      <ClipboardText id="email" :text="'xenonppg@gmail.com'" />
    </div>
    <div class="cell" :title="$t('titles.me')">
      <img src="/src/assets/img/pls_donate.jpg">
    </div>
  </div>
</template>

<style scoped>
p,
label,
button {
  font-size: larger;
}

img {
  --size: 20rem;
  width: var(--size);
  height: var(--size);

  border: 0.15rem var(--border-click-dark) solid;
}
</style>