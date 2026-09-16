export interface QuizQuestion {
  question: string
  answer: string
  description: string
}

interface QuizDay {
  questions: QuizQuestion[]
}

interface QuizMonth {
  year: number
  month: number
  days: Record<string, QuizDay>
}

const questionFiles = import.meta.glob<QuizMonth>(
  '../data/*.json',
  {
    eager: true,
    import: 'default'
  }
)

const getAvailableDays = (date = new Date()): number[] => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')

  const filePath = `../data/${year}-${month}.json`

  const monthData = questionFiles[filePath]

  if (!monthData) {
    return []
  }

  return Object.keys(monthData.days)
    .map(Number)
    .sort((a, b) => a - b)
}

export function useQuizData() {
  const getDailyQuestions = (date = new Date()): QuizQuestion[] => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate())

    const filePath = `../data/${year}-${month}.json`

    const monthData = questionFiles[filePath]

    if (!monthData) {
      console.error(`Aucun fichier de quiz trouvé : ${filePath}`)
      return []
    }

    return monthData.days[day]?.questions ?? []
  }

  return {
    getDailyQuestions,
    getAvailableDays
  }
}