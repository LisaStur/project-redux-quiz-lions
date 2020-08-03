import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { quiz } from '../reducers/quiz'
import '../Styling/buttons.css'

export const SubmitAnswer = ({ setAnswered, userAnswer, setUserAnswer }) => {
  const question = useSelector(state => state.quiz.questions[state.quiz.currentQuestionIndex])
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(quiz.actions.submitAnswer({ questionId: question.id, answerIndex: userAnswer }))
    setAnswered(true)
  }
  return (
    <button className='button' onClick={handleSubmit}>Submit</button>
  )
}