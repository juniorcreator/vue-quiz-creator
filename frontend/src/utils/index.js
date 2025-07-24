import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user.js';

export const linkClass =
  'mr-2 border border-blue-200 cursor-pointer font-bold p-1 rounded bg-blue-400 hover:bg-blue-700 transition duration-200';
export const checkIsValidToken = async (loading) => {
  const token = localStorage.getItem('quiz-user-token');
  const router = useRouter();
  const store = useUserStore();

  if (!token) {
    await router.push('/login');
    return;
  }

  try {
    loading.value = true;
    const res = await fetch('http://localhost:3000/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      localStorage.removeItem('quiz-user-token');
      await router.push('/login');
    } else {
      const userData = await res.json();
      store.setUser(userData.user);
      console.log('Logged in user:', userData);
    }
  } catch (e) {
    console.error('Auth error', e);
    localStorage.removeItem('quiz-user-token');
    await router.push('/login');
  } finally {
    loading.value = false;
  }
};
