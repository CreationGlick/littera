<!-- Template for each question -->
<template>
  <!-- Card for each question -->
  <div class="card lg:min-w-[1200px] lg:min-h-[300px] bg-base-100 shadow-xl min-w-[200px] min-h-[300px]">
    <div class="card-body flex gap-6 px-5 sm:px-10">

      <!-- Header of the question -->
      <div class="flex items-center justify-between gap-4">
        <span class="badge badge-dark_blue">
          {{ questionNumber }} / {{ totalQuestions }}
        </span>

        <progress class="progress progress-dark_blue w-full max-w-150" :value="progress" max="100" />

        <span class="shrink-0 font-mono text-sm font-semibold text-base-content/60">
          {{ timeRemainingSeconds }} s
        </span>
      </div>

      <!-- Timer -->
      <div class="h-3 w-full overflow-hidden rounded-full bg-base-300">
        <div class="h-full rounded-full" :class="[
          timerColor,
          isTimerTransitionEnabled
            ? 'transition-[width] duration-75 ease-linear'
            : ''
        ]" :style="{ width: `${timeProgress}%` }" />
      </div>

      <!-- Question -->
      <div class="flex flex-1 items-center justify-center">
        <h2 class="max-w-3xl text-center lg:text-2xl text-lg font-bold leading-tight wrap-break-word sm:text-3xl">
          {{ question.question }}
        </h2>
      </div>

      <!-- Next Question - Disabled by default -->
      <div class="flex justify-center">
        <button class="btn btn-next-question" :disabled="!hasAnswered" @click="emit('next')">
          Question suivante
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { QuizQuestion } from '~/composables/useQuizData'

const props = defineProps<{
  question: QuizQuestion
  questionNumber: number
  totalQuestions: number
  timeRemaining: number
  timeProgress: number
  timeRemainingSeconds: string
  progress: number
  hasAnswered: boolean
  isCorrect: boolean
  isTimeUp: boolean
}>()

const emit = defineEmits<{
  next: []
}>()

const timerColor = computed(() => {
  if (props.timeProgress <= 25) {
    return 'bg-error'
  }

  if (props.timeProgress <= 50) {
    return 'bg-warning'
  }

  return 'bg-success'
})

const isTimerTransitionEnabled = ref(false)

watch(
  () => props.questionNumber,
  () => {
    // Nouvelle question : on place immédiatement la barre à 100 %
    isTimerTransitionEnabled.value = false

    nextTick(() => {
      isTimerTransitionEnabled.value = true
    })
  },
  { immediate: true }
)
</script>