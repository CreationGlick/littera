<!-- Page - Quizz for each date -->
<template>

  <main class="min-h-screen bg-base-200 px-4 py-8 flex items-center lg:w-50%">

    <div class="mx-auto">

      <!-- Result for each question -->
      <QuizResult v-if="gameFinished" :score="score" :total-questions="totalQuestions" :answers="answers"
        :average-response-time="averageResponseTime" @restart="restartGame" />

      <template v-else-if="currentQuestion">

        <!-- Question -->
        <QuizQuestion :question="currentQuestion" :question-number="questionNumber" :total-questions="totalQuestions"
          :time-remaining="timeRemaining" :time-progress="timeProgress" :time-remaining-seconds="timeRemainingSeconds"
          :progress="progress" :has-answered="hasAnswered" :is-correct="isCorrect" :is-time-up="isTimeUp"
          @next="nextQuestion" />


        <!-- Keyboard -->
        <div class="mt-6">
          <QuizKeyboard :disabled="hasAnswered" :selected-answer="selectedAnswer"
            :correct-answer="currentQuestion.answer" @answer="answerQuestion" />
        </div>

      </template>

      <!-- No Quizz available -->
      <div v-else class="alert alert-danger">
        Aucune quizz n'est disponible pour aujourd'hui.
      </div>

    </div>
  </main>
</template>

<script setup lang="ts">
const { getDailyQuestions } = useQuizData()

const route = useRoute()

const date = computed(() => {
  const value = route.params.date

  return new Date(`${value}T12:00:00`)
})

const questions = getDailyQuestions(date.value)

const {
  currentQuestion,
  questionNumber,
  totalQuestions,
  score,
  timeRemaining,
  timeRemainingSeconds,
  timeProgress,
  hasAnswered,
  selectedAnswer,
  isCorrect,
  isTimeUp,
  gameFinished,
  progress,
  startGame,
  answerQuestion,
  nextQuestion,
  restartGame,
  answers,
  averageResponseTime,
} = useQuiz(questions)

onMounted(() => {
  startGame()
})
</script>