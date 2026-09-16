<!-- Calendar -->
<template>
  <section class="card bg-base-100 shadow-xl">
    <div class="card-body">

      <!-- En-tête du calendrier -->
      <div class="flex items-center justify-between gap-4">

        <button class="btn btn-ghost-noborder" aria-label="Mois précédent" @click="previousMonth">
          ←
        </button>

        <div class="text-center">
          <h2 class="mt-1 text-xl font-bold capitalize sm:text-2xl">
            {{ monthName }}
          </h2>
        </div>

        <button class="btn btn-ghost-noborder" aria-label="Mois suivant" @click="nextMonth">
          →
        </button>

      </div>

      <p class="mb-4 text-center text-sm text-base-content/60">
        Rejoue aux quizz des jours précédents
      </p>

      <!-- Jours de la semaine -->
      <div class="grid grid-cols-7 gap-2 text-center">
        <div v-for="(dayName, index) in ['L', 'M', 'M', 'J', 'V', 'S', 'D']" :key="`${dayName}-${index}`"
          class="py-2 text-sm font-bold text-base-content/50">
          {{ dayName }}
        </div>

        <!-- Cases avant le premier jour -->
        <div v-for="index in firstDay" :key="`empty-${index}`" />

        <!-- Jours du mois -->
        <template v-for="day in days" :key="day">
          <NuxtLink v-if="isAvailable(day)" :to="getQuizPath(day)" 
            class="btn btn-calendar btn-sm aspect-square min-h-0 p-0 sm:btn-md">
            {{ day }}
          </NuxtLink>

          <div v-else class="flex aspect-square items-center justify-center rounded-lg text-sm text-base-content/30">
            {{ day }}
          </div>
        </template>
      </div>

      <!-- Légende -->
      <div class="mt-5 flex items-center justify-center gap-2 text-sm">
        <span class="h-3 w-3 rounded-full bg-dark_blue" />
        <span>Quizz disponible</span>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const { getAvailableDays } = useQuizData()

// Date du jour réelle (on enlève les heures/minutes pour comparer proprement les jours)
const today = new Date()
today.setHours(0, 0, 0, 0)

const currentDate = ref(
  new Date(today.getFullYear(), today.getMonth(), 1)
)

const year = computed(() => currentDate.value.getFullYear())

const month = computed(() => currentDate.value.getMonth() + 1)

const availableDays = computed(() => {
  return getAvailableDays(currentDate.value)
})

const monthName = computed(() => {
  return new Intl.DateTimeFormat('fr-FR', {
    month: 'long',
    year: 'numeric'
  }).format(currentDate.value)
})

const firstDay = computed(() => {
  const day = new Date(
    year.value,
    month.value - 1,
    1
  ).getDay()

  // JavaScript : dimanche = 0
  // On veut : lundi = 0
  return day === 0 ? 6 : day - 1
})

const daysInMonth = computed(() => {
  return new Date(
    year.value,
    month.value,
    0
  ).getDate()
})

const days = computed(() => {
  return Array.from(
    { length: daysInMonth.value },
    (_, index) => index + 1
  )
})

const isAvailable = (day: number) => {
  // Construction de la date du jour du calendrier en cours d'évaluation
  const targetDate = new Date(year.value, month.value - 1, day)
  targetDate.setHours(0, 0, 0, 0)

  // 1. Bloquer strictement si la date est dans le futur par rapport à aujourd'hui
  if (targetDate > today) {
    return false
  }

  // 2. Sinon, on vérifie la règle métier existante (fournie par getAvailableDays)
  return availableDays.value.includes(day)
}

const getQuizPath = (day: number) => {
  const formattedMonth = String(month.value).padStart(2, '0')
  const formattedDay = String(day).padStart(2, '0')

  return `/quizz/${year.value}-${formattedMonth}-${formattedDay}`
}

const previousMonth = () => {
  currentDate.value = new Date(
    year.value,
    month.value - 2,
    1
  )
}

const nextMonth = () => {
  currentDate.value = new Date(
    year.value,
    month.value,
    1
  )
}
</script>