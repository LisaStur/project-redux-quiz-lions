import React, { useState } from 'react'
import { CurrentQuestion } from '../components/CurrentQuestion'
import { NextButton } from '../components/NextButton'
import { SubmitAnswer } from '../components/SubmitAnswer'
import { Progress } from '../components/Progress'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../Styling/question.css'
import Countdown from 'react-countdown';


export const Question = () => {
    const [answered, setAnswered] = useState(false)
    const [userAnswer, setUserAnswer] = useState(null)
    const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuestionIndex])
    const questions = useSelector((state) => state.quiz.questions)
    const history = useHistory()
    const [startTime, setStartTime] = useState(Date.now())

    return (
        <section className='question-container'>
            <Countdown startTime={startTime} setStartTime={setStartTime}
                style={{ fontSize: 20 }}
                date={startTime + 60000}
                intervalDelay={0}
                precision={3}
                onComplete={() => history.push('/summary')} />
            <CurrentQuestion userAnswer={userAnswer} setUserAnswer={setUserAnswer} answered={answered} />
            {!answered &&
                <SubmitAnswer userAnswer={userAnswer} setUserAnswer={setUserAnswer}
                    setAnswered={setAnswered} />}
            {answered && question.id !== questions.length &&
                <NextButton setAnswered={setAnswered} />}
            {answered && question.id === questions.length &&
                <Link className='button' to='/summary' >Result</Link>}
            <Progress />
        </section>
    )
}