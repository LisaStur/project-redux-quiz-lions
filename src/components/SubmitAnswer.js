import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { quiz } from '../reducers/quiz'

export const SubmitAnswer = ({ setAnswered, userAnswer, setUserAnswer }) => {
  const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuesionIndex])
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(quiz.actions.submitAnswer({ questionId: question.id, answerIndex: userAnswer }))
    setAnswered(true)
  }
  return (
    <button onClick={handleSubmit}>Submit</button>
  )
}