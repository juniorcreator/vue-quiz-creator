<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user.js';
import { computed, ref } from 'vue';

const route = useRoute();
const router = useRouter();
const store = useUserStore();

const currentQuestion = ref(0);
const isUserClickedOption = ref(false);
const selectedOption = ref(null);
const score = ref(0);
const quizFinished = ref(false);

const userQuiz = computed(() => store.user?.quizzes?.[route.params.index] || '');

console.log(userQuiz.value, ' userQuiz is');

const handleOptionClick = (option) => {
  if (isUserClickedOption.value) return;

  selectedOption.value = option;
  isUserClickedOption.value = true;

  const correctAnswer = userQuiz.value.questions[currentQuestion.value].answer;
  console.log(option, ' selected option');
  console.log(correctAnswer, ' correct answer');

  if (option === correctAnswer) {
    score.value += 1;
  }
};

const handleNextQuestion = () => {
  if (currentQuestion.value + 1 < userQuiz.value.questions.length) {
    currentQuestion.value++;
    selectedOption.value = null;
    isUserClickedOption.value = false;
  } else {
    quizFinished.value = true;
  }
};
</script>

<template>
  <h1 class="text-center pt-6 font-bold text-2xl">Quiz name: {{ userQuiz.title }}</h1>
  <h2 class="text-center pt-1 font-bold text-2xl">Quiz description: {{ userQuiz.description }}</h2>

  <div v-if="!quizFinished" class="text-center">
    <button @click="router.back()" class="text-white cursor-pointer">&larr; Back</button>
  </div>

  <div class="flex flex-col items-center mt-6">
    <template v-if="!quizFinished">
      <div class="font-bold mb-2">
        Question {{ currentQuestion + 1 }} of {{ userQuiz.questions.length }}
      </div>
      <p class="text-white text-center mb-4">
        {{ userQuiz.questions[currentQuestion].question }}
      </p>

      <ul class="w-full max-w-md">
        <li
          v-for="option in userQuiz.questions[currentQuestion].options"
          :key="option"
          @click="handleOptionClick(option)"
          class="cursor-pointer border rounded mb-2 p-2 transition duration-200"
          :class="[
            isUserClickedOption && option === userQuiz.questions[currentQuestion].answer
              ? 'bg-green-300'
              : '',
            isUserClickedOption &&
            option === selectedOption &&
            option !== userQuiz.questions[currentQuestion].answer
              ? 'bg-red-300'
              : '',
            isUserClickedOption ? 'pointer-events-none' : '',
          ]"
        >
          {{ option }}
        </li>
      </ul>

      <button
        :disabled="!isUserClickedOption"
        @click="handleNextQuestion"
        class="cursor-pointer mt-2 border rounded p-1 hover:scale-105 transition"
      >
        Next Question →
      </button>
    </template>

    <template v-else>
      <h3 class="text-xl font-bold text-green-400">Quiz Complete!</h3>
      <p class="mt-2 text-white">Your score: {{ score }} / {{ userQuiz.questions.length }}</p>
      <button @click="router.push('/profile')" class="mt-4 text-blue-500 underline">
        Return to profile
      </button>
    </template>
  </div>
</template>

<style scoped></style>
