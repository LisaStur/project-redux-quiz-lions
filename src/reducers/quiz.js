import { createSlice } from '@reduxjs/toolkit'

// Change these to your own questions!
const questions = [
  { id: 1, questionText: 'In the film "Godfather", who was being referenced when the Corleone family received the Sicilian message of “sleeping with the fishes”?', options: ['Carlo Rizzi', 'Tom Hagen', 'Virgil "The Turk" Sollozzo', 'Luca Brasi'], correctAnswerIndex: 3 },
  { id: 2, questionText: 'Which is the hottest planet?', options: ['Venus', 'Mercury', 'Saturn', 'Jupiter'], correctAnswerIndex: 0 },
  { id: 3, questionText: 'How far can you hear a lion roar?', options: ['1 mile', '10 miles', '5 miles', '3 miles'], correctAnswerIndex: 2 },
  { id: 4, questionText: 'What is the world´s largest jellyfish?', options: ['Lion´s Mane', 'Box Jellyfish', 'Moon Jelly', 'Bluebottle'], correctAnswerIndex: 0 },
  { id: 5, questionText: 'From which Shakespeare play comes this line "All the world´s a stage and all the men and women merely players"?', options: ['Hamlet', 'As You like it', 'Othello', 'Romeo & Juliett'], correctAnswerIndex: 1 },
  { id: 6, questionText: 'How fast can lions run?', options: ['80 km/h', '70 km/h', '90 km/h', '50 km/h'], correctAnswerIndex: 0 },
  { id: 7, questionText: 'What is the official language in Serbia?', options: ['Russian', 'Albanian', 'Serbian', 'Kurdo'], correctAnswerIndex: 1 },
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

    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
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

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true
      } else {
        state.currentQuestionIndex += 1
      }
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState
    }

  }
})
