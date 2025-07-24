import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const theme = ref('light');
  const user = ref(null);

  const setUser = (value) => {
    user.value = value;
  };
  return { theme, setUser, user };
});
