import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const theme = ref('light');
  const user = ref(null);

  const setUser = (value) => {
    user.value = value;
  };
  const setQuizzes = (val) => {
    user.value.quizzes = val;
  };
  const setAvatar = (url) => {
    user.value.avatar = url;
  };
  return { theme, setUser, setQuizzes, setAvatar, user };
});
