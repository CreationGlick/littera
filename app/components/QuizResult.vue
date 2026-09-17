<script setup lang="ts">
import { ref } from 'vue'
import type { QuizAnswer } from '~/composables/useQuiz'

const props = defineProps<{
  score: number
  totalQuestions: number
  answers: QuizAnswer[]
  averageResponseTime: number
}>()

const emit = defineEmits<{
  restart: []
}>()

const copied = ref(false)

const formatTime = (milliseconds: number) => {
  return `${(milliseconds / 1000).toFixed(2)} s`
}

const copyResults = async () => {
  const date = new Date().toLocaleDateString('fr-FR')

  const results = [
    `**Littera - ${date}**`,
    `**Nombre de bonnes réponses - ${props.score} / ${props.totalQuestions}**`,
    `Temps moyen - ${formatTime(props.averageResponseTime)}`,
    '',
    props.answers
      .map(answer => answer.isCorrect ? '✅' : '❌')
      .join(' '),
  ].join('\n')

  try {
    await navigator.clipboard.writeText(results)

    copied.value = true

    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
  catch (error) {
    console.error('Impossible de copier les résultats', error)
  }
}
</script>


<template>
  <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-10">

    <!-- Global result -->
    <div class="card bg-base-100 shadow-lg lg:min-w-[400px] lg:sticky lg:top-5">
      <div class="card-body items-center text-center">
        <h2 class="text-2xl font-bold">
          Littera du jour
        </h2>

        <!-- Card about results -->
        <div class="grid w-full max-w-md grid-cols-2 gap-4 mt-4">
          <!-- Card about score -->
          <div class="card bg-base-200">
            <div class="pt-2">
              Score
            </div>

            <div class="lg:stat-value text-2xl font-bold p-2">
              {{ score }} / {{ totalQuestions }}
            </div>
          </div>

          <!-- Card about time -->
          <div class="card bg-base-200">
            <div class="pt-2">
              Temps moyen
            </div>

            <div class="lg:stat-value text-2xl font-bold p-2">
              {{ formatTime(averageResponseTime) }}
            </div>
          </div>
        </div>

        <!-- Text about results -->
        <p class="mt-4 text-lg italic">
          <template v-if="score === totalQuestions">
            "Un vrai professionnel de l'académie"
          </template>

          <template v-else-if="score >= 7">
            "C'est que le début !""
          </template>

          <template v-else-if="score >= 5">
            "Tout juste la moyenne"
          </template>

          <template v-else-if="score >= 2">
            "Un manque d'entraînement tout ça"
          </template>

          <template v-else-if="score >= 1">
            "Quel clutch..."
          </template>

          <template v-else>
            "0 + 0 = la tête à Toto"
          </template>
        </p>

        <div class="flex flex-row mt-4 gap-4">
          <button class="btn btn-start" @click="copyResults">
            {{ copied ? 'Résultat copié' : 'Copier mon résultat' }}
          </button>

          <NuxtLink to="/">
            <button class="btn btn-calendar">
              Retourner à l'accueil
            </button>
          </NuxtLink>
        </div>

      </div>
    </div>

    <!-- Response Detail -->
    <div class="card bg-base-100 shadow-xl lg:min-w-[900px]">

      <div class="card-body">

        <!-- Recap -->
        <h3 class="mb-4 text-xl font-bold">
          Récapitulatif
        </h3>

        <!-- List of response -->
        <div class="space-y-4">

          <div v-for="(answer, index) in answers" :key="index" class="card bg-base-300 p-4">

            <div class="flex items-start justify-between gap-4">

              <!-- Header with question and number -->
              <div class="flex-1">
                <div class="mb-2 text-sm font-bold text-base-content/50">
                  Question {{ index + 1 }}
                </div>

                <p class="">
                  {{ answer.question.question }}
                </p>
              </div>

              <!-- Badge answer -->
              <div class="badge font-bold" :class="answer.isCorrect
                ? 'badge-success'
                : 'badge-error'
                ">
                {{ answer.isCorrect ? 'Correct' : 'Incorrect' }}
              </div>
            </div>

            <div class="mt-4 grid gap-2">

              <div class="flex flex-col gap-3 lg:flex-row lg:justify-between">
                <div class="w-full flex-1 rounded-lg bg-base-200 p-3">
                  <div class="text-base-content/50">
                    Ta réponse
                  </div>

                  <div class="mt-1 font-bold" :class="answer.isCorrect ? 'text-success' : 'text-error'">
                    {{ answer.playerAnswer ?? 'Aucune réponse' }}
                  </div>
                </div>

                <div class="w-full flex-1 rounded-lg bg-base-200 p-3">
                  <div class="text-base-content/50">
                    Réponse attendue
                  </div>

                  <div class="mt-1 font-bold text-success">
                    {{ answer.correctAnswer }}
                  </div>
                </div>

                <div class="w-full flex-1 rounded-lg bg-base-200 p-3">
                  <div class="text-base-content/50">
                    Temps de réponse
                  </div>

                  <div class="mt-1 font-bold">
                    {{ formatTime(answer.responseTime) }}
                  </div>
                </div>
              </div>


              <div class="rounded-lg bg-base-200 p-3">
                <div class="text-xs text-base-content/50">
                  Description
                </div>

                <div class="mt-1">
                  {{ answer.question.description }}

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>