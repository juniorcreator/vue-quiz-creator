import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/User.vue'),
    meta: { requiresAuth: true },
    children: [{ path: '/quiz', component: () => import('../views/QuizView.vue') }],
  },
  {
    path: '/profile/quiz/:index',
    name: 'quiz',
    component: () => import('../views/QuizView.vue'),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 🛡️ Навигационный гвард
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('quiz-user-token');
  const isAuth = !!token;

  if (to.meta.requiresAuth && !isAuth) {
    next('/login'); // если нет токена — редирект на логин
  } else {
    next();
  }
});

export default router;
