import type { QuizQuestion } from './useQuizData'

export interface QuizAnswer {
  question: QuizQuestion
  playerAnswer: string | null
  correctAnswer: string
  responseTime: number
  isCorrect: boolean
}

const QUESTION_TIME = 10_000

export function useQuiz(questions: QuizQuestion[]) {
  const currentQuestionIndex = ref(0)
  const score = ref(0)

  const answers = ref<QuizAnswer[]>([])

  // Temps restant en millisecondes
  const timeRemaining = ref(QUESTION_TIME)

  const hasAnswered = ref(false)
  const selectedAnswer = ref<string | null>(null)
  const isTimeUp = ref(false)
  const gameFinished = ref(false)

  let timer: ReturnType<typeof setInterval> | null = null
  let startTime = 0

  const currentQuestion = computed(() => {
    return questions[currentQuestionIndex.value] ?? null
  })

  const questionNumber = computed(() => {
    return currentQuestionIndex.value + 1
  })

  const totalQuestions = computed(() => {
    return questions.length
  })

  const isCorrect = computed(() => {
    if (!selectedAnswer.value || !currentQuestion.value) {
      return false
    }

    return selectedAnswer.value === currentQuestion.value.answer
  })

  const progress = computed(() => {
    if (totalQuestions.value === 0) {
      return 0
    }

    return (questionNumber.value / totalQuestions.value) * 100
  })

  const timeProgress = computed(() => {
    return (timeRemaining.value / QUESTION_TIME) * 100
  })

  const timeRemainingSeconds = computed(() => {
    return (timeRemaining.value / 1000).toFixed(2)
  })

  const stopTimer = () => {
    if (timer !== null) {
      clearInterval(timer)
      timer = null
    }
  }

  const finishGame = () => {
    stopTimer()
    gameFinished.value = true
  }

  const timeUp = () => {
    if (hasAnswered.value || gameFinished.value) {
      return
    }

    timeRemaining.value = 0
    hasAnswered.value = true
    isTimeUp.value = true

    if (currentQuestion.value) {
      answers.value.push({
        question: currentQuestion.value,
        playerAnswer: null,
        correctAnswer: currentQuestion.value.answer,
        responseTime: QUESTION_TIME,
        isCorrect: false
      })
    }

    stopTimer()
  }

  const updateTimer = () => {
    if (hasAnswered.value || gameFinished.value) {
      return
    }

    const elapsed = Date.now() - startTime
    const remaining = Math.max(QUESTION_TIME - elapsed, 0)

    timeRemaining.value = remaining

    if (remaining <= 0) {
      timeUp()
    }
  }

  const startTimer = () => {
    stopTimer()

    startTime = Date.now()
    timeRemaining.value = QUESTION_TIME

    timer = setInterval(updateTimer, 10)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex.value >= questions.length - 1) {
      finishGame()
      return
    }

    currentQuestionIndex.value++
    selectedAnswer.value = null
    hasAnswered.value = false
    isTimeUp.value = false

    startTimer()
  }

  const answerQuestion = (letter: string) => {
    if (hasAnswered.value || gameFinished.value) {
      return
    }

    updateTimer()

    if (hasAnswered.value) {
      return
    }

    hasAnswered.value = true
    selectedAnswer.value = letter

    const isAnswerCorrect = letter === currentQuestion.value?.answer

    if (isAnswerCorrect) {
      score.value++
    }
    else {
      timeRemaining.value = timeRemaining.value
    }

    answers.value.push({
      question: currentQuestion.value!,
      playerAnswer: letter,
      correctAnswer: currentQuestion.value!.answer,
      responseTime: QUESTION_TIME - timeRemaining.value,
      isCorrect: isAnswerCorrect
    })

    stopTimer()
  }

  const startGame = () => {
    if (questions.length === 0) {
      gameFinished.value = true
      return
    }

    currentQuestionIndex.value = 0
    score.value = 0
    answers.value = []
    selectedAnswer.value = null
    hasAnswered.value = false
    isTimeUp.value = false
    gameFinished.value = false

    startTimer()
  }

  const averageResponseTime = computed(() => {
    if (answers.value.length === 0) {
      return 0
    }

    const total = answers.value.reduce(
      (sum, answer) => sum + answer.responseTime,
      0
    )

    return total / answers.value.length
  })

  const restartGame = () => {
    startGame()
  }

  onUnmounted(() => {
    stopTimer()
  })

  return {
    currentQuestion,
    currentQuestionIndex,
    questionNumber,
    totalQuestions,
    score,
    answers,
    averageResponseTime,
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
    restartGame
  }
}