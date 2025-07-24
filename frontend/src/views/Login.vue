<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { linkClass } from '@/utils/index.js';
import { useUserStore } from '@/stores/user.js';
import { ref } from 'vue';

const store = useUserStore();
const loading = ref(false);
const router = useRouter();
const form = ref({
  email: '',
  password: '',
});
const error = ref('');

const clearForm = () => {
  form.value.email = '';
  form.value.password = '';
};

const handleSubmit = async () => {
  error.value = '';
  if (form.value.email.trim() === '' || form.value.password.trim() === '') {
    error.value = 'Fields should not be empty';
    return;
  }
  // console.log(form.value);

  try {
    loading.value = true;
    const res = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      body: JSON.stringify(form.value),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    if (!data.success) {
      error.value = data.error;
      return;
    }
    // console.log(data, ' data');
    if (data.success && data.data.token) {
      // console.log(data, ' data');
      localStorage.setItem('quiz-user-token', data.data.token);
      clearForm();
      store.setUser(data.data.user);
      await router.push('/profile');
    }

    // alert('user registered successfully!');
    // await router.push('/login');
  } catch (er) {
    console.log(er, ' er from catch');
    error.value = er.message;
    loading.value = false;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <h1 class="text-center pt-6 font-bold text-2xl">login page</h1>

  <div class="text-center pt-6 font-bold text-xl">
    <RouterLink :class="linkClass" to="/">home page</RouterLink>
    <RouterLink :class="linkClass" to="/register">register</RouterLink>
  </div>
  <div class="flex items-center justify-center">
    <form
      @submit.prevent="handleSubmit"
      class="w-full max-w-md bg-white p-6 rounded-2xl shadow-md space-y-6"
    >
      <h2 class="text-2xl font-bold text-center text-gray-800">Login</h2>
      <div v-if="loading">loading...</div>
      <div v-if="error" class="text-red-500 mb-0">error: {{ error }}</div>
      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700" for="email">Email</label>
        <input
          id="email"
          type="email"
          required
          class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="form.email"
        />
      </div>
      <div>
        <label class="block mb-1 text-sm font-medium text-gray-700" for="password">Пароль</label>
        <input
          id="password"
          type="password"
          required
          minlength="6"
          class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          v-model="form.password"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition"
      >
        Login
      </button>
    </form>
  </div>
</template>

<style scoped></style>
