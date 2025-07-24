<script setup>
import { checkIsValidToken, linkClass } from '@/utils/index.js';
import { RouterLink, useRouter } from 'vue-router';
import { onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/user.js';
import { ref } from 'vue';

const loading = ref(false);
const showQuizCreating = ref(false);
const quiz = ref({
  title: '',
  description: '',
  questions: [
    {
      id: Date.now(),
      question: '',
      options: [''],
      answer: null,
    },
  ],
});
const store = useUserStore();
const router = useRouter();

onBeforeMount(async () => {
  await checkIsValidToken(loading);
});

const logout = () => {
  localStorage.removeItem('quiz-user-token');
  router.push('/login');
};
const addQuestion = () => {
  quiz.value.questions.push({
    id: Date.now(), // уникальный ID
    question: '',
    options: [''],
    answer: null,
  });
};
const removeQuestion = (index) => {
  if (quiz.value.questions.length > 1) {
    quiz.value.questions.splice(index, 1);
  }
};
const addOption = (questionIndex) => {
  const question = quiz.value.questions[questionIndex];
  if (question.options.length < 4) {
    question.options.push('');
  }
};
const resetQuizForm = () => {
  showQuizCreating.value = false;
  quiz.value = {
    title: '',
    description: '',
    questions: [
      {
        id: Date.now(),
        question: '',
        options: [''],
        answer: null,
      },
    ],
  };
};

const handleSubmit = async () => {
  const isValid =
    quiz.value.title.trim() &&
    quiz.value.questions.every(
      (q) => q.question.trim() && q.options.length >= 1 && q.answer.trim(),
    );

  let aaa = quiz.value.questions.every(
    (q) => q.question.trim() && q.options.length >= 1 && q.answer.trim(),
  );
  console.log(aaa, ' isvalid');

  if (!isValid) {
    alert('Пожалуйста, заполните все вопросы и выберите правильные ответы.');
    return;
  }

  console.log('Готовый квиз:', quiz.value);

  // TODO: Отправить на сервер, например:
  try {
    const res = await fetch('http://localhost:3000/quiz/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quiz: quiz.value,
        userId: store.user._id,
      }),
    });
    console.log(res, ' res');
    const data = await res.json();
    store.setUser(data.user);
    console.log(data, ' data');
  } catch (e) {
    console.error(e);
  }
  // await fetch('/api/quizzes', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(quiz.value),
  // });

  alert('Квиз создан!');
  resetQuizForm();
};
</script>

<template>
  <div v-if="!loading">
    <h1 class="text-center pt-6 font-bold text-2xl">Hello {{ store.user.name }}</h1>
    <div class="text-center">
      <RouterLink :class="linkClass" to="/">go to home page</RouterLink>
    </div>
    <div class="flex justify-end p-2">
      <div
        class="rounded-full cursor-pointer bg-violet-700 hover:bg-violet-300 h-15 w-15 border flex items-center justify-center"
      >
        <p class="text-sm">Profile</p>
      </div>
      <div class="text-center mt-4 ml-3">
        <button
          @click="logout"
          class="text-rose-400 font-bold cursor-pointer hover:text-rose-700 text-xs"
        >
          Logout
        </button>
      </div>
    </div>

    <div class="quizzez">
      <div class="text-center" v-if="!store.user.quizzes.length">
        <p>no quizzes 😔</p>
        <button v-if="!showQuizCreating" @click="showQuizCreating = true" :class="linkClass">
          create quiz➕
        </button>
      </div>
      <ul v-else class="p-3 flex flex-wrap items-center justify-center mx-3">
        <li
          class="border rounded m-2 p-1"
          v-for="(userQuiz, quizIndex) in store.user.quizzes"
          :key="userQuiz._id"
        >
          <div class="text-center">
            Name: {{ userQuiz.title }}
            <div class="py-1 px-2 mt-1 cursor-pointer text-white text-xs border rounded">
              <RouterLink :to="`/profile/quiz/${quizIndex}`">start quiz →</RouterLink>
            </div>
          </div>
        </li>
      </ul>
      <div class="text-center mt-4">
        <button v-if="!showQuizCreating" @click="showQuizCreating = true" :class="linkClass">
          create quiz➕
        </button>
      </div>
    </div>
    <div class="px-3 mt-5" v-if="showQuizCreating">
      <form
        @submit.prevent="handleSubmit"
        class="max-w-123 mx-auto p-4 bg-white rounded-lg shadow space-y-4 text-sm"
      >
        <div>
          <label class="block font-medium mb-1">Title</label>
          <input
            v-model="quiz.title"
            type="text"
            required
            class="w-full border px-3 py-1 rounded"
          />
        </div>

        <div>
          <label class="block font-medium mb-1">Description</label>
          <textarea v-model="quiz.description" rows="2" class="w-full border px-3 py-1 rounded" />
        </div>

        <!-- Вопросы -->
        <div v-for="(q, qIndex) in quiz.questions" :key="q.id" class="border rounded p-3 space-y-2">
          <div class="flex justify-between items-center">
            <label class="font-medium">Question {{ qIndex + 1 }}</label>
            <button
              type="button"
              @click="removeQuestion(qIndex)"
              class="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>

          <input
            v-model="q.question"
            type="text"
            placeholder="Enter question"
            required
            class="w-full border px-3 py-1 rounded"
          />

          <!-- Варианты ответа -->
          <div class="space-y-1">
            <div
              v-for="(option, oIndex) in q.options"
              :key="oIndex"
              class="flex items-center gap-2"
            >
              <input
                v-model="q.options[oIndex]"
                type="text"
                class="flex-1 border px-3 py-1 rounded max-w-97"
                :placeholder="`Option ${oIndex + 1}`"
              />
              <input type="radio" :name="'correct-' + qIndex" :value="option" v-model="q.answer" />
              <span v-if="q.answer === option" class="text-xs">✅</span>
            </div>
          </div>

          <button
            v-if="q.options.length < 4"
            type="button"
            @click="addOption(qIndex)"
            class="text-blue-500 hover:underline"
          >
            + Add Option
          </button>
        </div>

        <!-- Кнопки -->
        <div class="flex justify-between pt-2">
          <button
            type="button"
            @click="addQuestion"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
          >
            + New Question
          </button>

          <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded">
            Finish Quiz
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
