import React from 'react'
import { useState } from 'react'

const EntryBox = ({ element, average, stdev, value, changeHandler }) => {

  return (
    <div style={{ padding: '5px' }}>
      <strong>{element}</strong><br />
      <input
        className="observationInput"
        name={element}
        style={{ width: 75 }}
        onChange={changeHandler}
        value={value}
      />
      <br /> {average} ± {stdev}
    </div>
  )
}

const CommentEntry = () => {
  return (
    <div>
      <h3>Add Comment:</h3>
      <textarea
        placeholder="Include CAPA ID where relevant"
        rows="2"
        cols="70"
        id="observationComment"
      />
    </div>
  )
}

const EntryRow = ({ material, averages, stdevs }) => {
  const n = material.elements.length
  const [inputs, setInputs] = useState(Array(n).join(".").split("."))

  const checkInputs = (averages, stdevs) => {
    const inputs = document.getElementsByClassName('observationInput')
    let allNumbers = true
    for (let i = 0; i < inputs.length; i++) {

      // Flag values outside of 3SD.
      let flagHigh = Number(averages[i]) + (3 * Number(stdevs[i]))
      let flagLow = Number(averages[i]) - (3 * Number(stdevs[i]))
      if (inputs[i].value > flagLow && inputs[i].value < flagHigh) {
        inputs[i].style.backgroundColor = '#99ff99'
      }
      else if (inputs[i].value.length < 1) {
        inputs[i].style.backgroundColor = ''
      }
      else {
        inputs[i].style.backgroundColor = '#ff9999'
      }

      // Disallow non-numeric values
      if (isNaN(Number(inputs[i].value))) {
        allNumbers = false
      }
    }
    let submitButton = document.getElementById('observationSubmitButton')
    if (allNumbers === false) {
      submitButton.disabled = true
      submitButton.textContent = 'Bad Input'
    } else {
      submitButton.disabled = false
      submitButton.textContent = 'Submit'
    }
  }

  const changeHandler = (event) => {
    const observs = document.getElementsByClassName('observationInput')
    const observations = [...observs].map(o => o.value)
    const tabbed = observations.find(obs => obs.includes('\t'))
    if (tabbed) {
      const tabbedIndex = observations.indexOf(tabbed)
      const tabbedObservations = tabbed.split('\t')
      let newObservations = [
        ...observations.slice(0, tabbedIndex),
        ...tabbedObservations,
        ...observations.slice(tabbedIndex + tabbedObservations.length, observations.length)]
        .slice(0, observations.length)
      setInputs(newObservations)
    } else {
      setInputs(observations)
    }
    setTimeout(() => {
      checkInputs(averages, stdevs)
    }, 10)
  }

  const addObservation = (event) => {
    event.preventDefault()
    const user = localStorage.getItem('loggedAppUser')
    const comments = document.getElementById('observationComment').value
    console.log(user)
    const inputElements = document.getElementsByClassName('observationInput')
    const inputsValues = [...inputElements].map(e => e.value)
    const newObservation = {
      user,
      method: 'CHEM-162',
      obervations: inputsValues,
      comments
    }
    console.log('sending this to DB:', newObservation)
  }

  return (
    <div>
      <form onSubmit={addObservation}>
        <div style={{ display: 'flex' }}>

          {material.elements.map((e, i) =>
            <EntryBox
              key={e}
              value={inputs[i]}
              element={e}
              average={averages[i]} stdev={stdevs[i]}
              inputs={inputs}
              setInputs={setInputs}
              changeHandler={changeHandler} />)
          }
          <button type="submit" style={{ height: '25px' }} id="observationSubmitButton">Submit</button>

        </div >
      </form>
      <CommentEntry />
    </div>
  )
}

export default EntryRow