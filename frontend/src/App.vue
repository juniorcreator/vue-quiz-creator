<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <main class="min-h-screen bg-gradient-to-r from-purple-300 to-violet-500">
    <header>
      <div class="wrapper"></div>
    </header>

    <RouterView />
  </main>
</template>

<style scoped></style>
