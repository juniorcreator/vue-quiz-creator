<script setup>
import { onBeforeMount, ref } from 'vue';
import { checkIsValidToken } from '@/utils/index.js';
import Quiz from '@/components/Quiz.vue';

const loading = ref(true);

onBeforeMount(async () => {
  await checkIsValidToken(loading);
});
</script>

<template>
  <template v-if="!loading">
    <Quiz />
  </template>
  <div v-else>loading...</div>
</template>

<style scoped></style>
