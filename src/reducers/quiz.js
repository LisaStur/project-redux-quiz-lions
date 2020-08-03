import { createSlice } from '@reduxjs/toolkit'


const questions = [
  { id: 1, questionText: 'How far can you hear a lion roar?', options: ['1 mile', '10 miles', '5 miles', '3 miles'], correctAnswerIndex: 2 },
  { id: 2, questionText: 'How much meat does a male lion need to eat each day?', options: ['3kg', '10kg', '20kg', '7kg'], correctAnswerIndex: 3 },
  { id: 3, questionText: 'How many lions are there in the world today?', options: ['Around 100.000', 'Around 1.000.000', 'Around 20.000', 'Around 400.000'], correctAnswerIndex: 2 },
  { id: 4, questionText: 'What is the average life-span for lions?', options: ['Female lions 15 years, male 13', 'Female 20, male 22', 'Female 10, male 8', 'Female 30, male 25'], correctAnswerIndex: 0 },
  { id: 5, questionText: 'Where do lions exist in the wild today?', options: ['Africa', 'Africa and Asia', 'Africa and South America', 'South America and Asia'], correctAnswerIndex: 1 },
  { id: 6, questionText: 'How fast can lions run?', options: ['80 km/h', '70 km/h', '90 km/h', '50 km/h'], correctAnswerIndex: 0 },
  { id: 7, questionText: 'How many hours per day does the lion rest?', options: ['8h', '20h', '16h', '4h'], correctAnswerIndex: 1 },
]

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false,
  startTime: null
}

export const quiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload
      const question = state.questions.find((q) => q.id === questionId)

      if (!question) {
        throw new Error('Could not find question! Check to make sure you are passing the question id correctly.')
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(`You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`)
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex
      })
    },

    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true
      } else {
        state.currentQuestionIndex += 1
      }
    },

    restart: () => {
      return initialState
    }

  }
})
