<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user.js';

const router = useRouter();
const fileInput = ref(null);
const loading = ref(false);
const store = useUserStore();

const logout = () => {
  localStorage.removeItem('quiz-user-token');
  router.push('/login');
};

const updateAvatar = async (url) => {
  try {
    const res = await fetch('http://localhost:3000/avatar/upload', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: store.user._id,
        avatarUrl: url,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      store.setAvatar(data.avatarUrl);
    }
    console.log(res, ' res updateAvatar');
  } catch (err) {
    console.error('network error:', err);
  }
};

const uploadAvatar = async () => {
  loading.value = true;

  const file = fileInput.value.files[0];
  console.log(file, ' file');

  const formData = new FormData();
  formData.append('file', file); // 'file' — key server is waiting

  if (!file) {
    alert('Please upload a file');
    loading.value = false;
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/avatar/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const result = await res.json();
      await updateAvatar(result.url);
    } else {
      console.error('error file uploading:', res.status, res);
    }
  } catch (err) {
    loading.value = false;
    console.error('network error:', err);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex justify-end p-2">
    <div
      class="rounded-full overflow-hidden cursor-pointer bg-violet-700 hover:bg-violet-300 h-15 w-15 border flex items-center justify-center"
    >
      <p v-if="!store.user.avatar" class="text-sm">Profile</p>
      <img v-else :src="store.user.avatar" alt="avatar" class="object-cover" />
    </div>
    <div class="text-center mt-4 ml-3">
      <button
        @click="logout"
        class="text-rose-400 font-bold cursor-pointer hover:text-rose-700 text-xs"
      >
        Logout
      </button>
    </div>
    <div v-if="loading">Loading...</div>
    <form @submit.prevent="uploadAvatar" class="border rounded p-1">
      <input id="avatar" ref="fileInput" type="file" name="avatar" />
      <button class="cursor-pointer text-xs border p-1 rounded block text-white" type="submit">
        Upload
      </button>
    </form>
  </div>
</template>

<style scoped></style>
