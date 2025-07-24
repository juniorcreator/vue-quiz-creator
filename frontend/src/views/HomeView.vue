<script setup>
import { RouterLink } from 'vue-router';
import { linkClass } from '@/utils/index.js';
</script>

<template>
  <div>
    <h1 class="text-center pt-6 font-bold text-2xl">Quiz yourself</h1>

    <div class="text-center pt-6 font-bold text-xl">
      <RouterLink :class="linkClass" to="/register">register</RouterLink>
      <RouterLink :class="linkClass" to="/login">login</RouterLink>
      <RouterLink :class="linkClass" to="/profile">test profile page</RouterLink>
    </div>
  </div>
</template>
