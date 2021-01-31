import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Feedback = ({ handleGood, handleBad, handleNeutral }) => {
  return (
    <>
      <h1>give feedback</h1>
      <Button text='good' handleClick={handleGood} />
      <Button text='neutral' handleClick={handleNeutral} />
      <Button text='bad' handleClick={handleBad} />
    </>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({ good, neutral, bad, average }) => {
  if ((good + neutral + bad) === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr>
            <Statistic text='good' value={good} />
          </tr>
          <tr>
            <Statistic text='neutral' value={neutral} />
          </tr>
          <tr>
            <Statistic text='bad' value={bad} />
          </tr>
          <tr>
            <Statistic text='all' value={good + neutral + bad} />
          </tr>
          <tr>
            <Statistic text='average' value={(good + neutral + bad) === 0 ? 0 : (average / (good + neutral + bad))} />
          </tr>
          <tr>
            <Statistic text='positive' value={good === 0 ? '0%' : ((good / (good + neutral + bad)) * 100) + '%'} />
          </tr>
        </tbody>
      </table>
    </>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setAverage(average + 1)
  }

  const handleNeutral = () => setNeutral(neutral + 1)

  const handleBad = () => {
    setBad(bad + 1)
    setAverage(average - 1)
  }

  return (
    <>
      <Feedback handleGood={handleGood} handleBad={handleBad} handleNeutral={handleNeutral} />
      <Statistics good={good} neutral={neutral} bad={bad} average={average} />
    </>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)