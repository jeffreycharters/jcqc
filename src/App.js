import React from 'react'
import { useState } from 'react'

const EntryBox = ({ element, average, stdev, value, changeHandler }) => {

  return (
    <div style={{ padding: '10px' }}>
      <strong>{element}</strong><br />
      <input
        className="observationInput"
        name={element}
        style={{ width: 100 }}
        onChange={changeHandler}
        value={value}
      />
      <br /> {average} ± {stdev}
    </div>
  )
}

const EntryRow = ({ elements, averages, stdevs }) => {
  const n = elements.length
  const [inputs, setInputs] = useState(Array(n).join(".").split("."))

  const checkInputs = (averages, stdevs) => {
    const inputs = document.getElementsByClassName('observationInput')
    for (let i = 0; i < inputs.length; i++) {
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

  return (<div style={{ display: 'flex' }}>
    {elements.map((e, i) => {
      return (
        <EntryBox
          key={e}
          value={inputs[i]}
          element={e}
          average={averages[i]} stdev={stdevs[i]}
          inputs={inputs}
          setInputs={setInputs}
          changeHandler={changeHandler} />)
    }
    )}
  </div>
  )
}

const App = () => {
  const material = {
    method: 'CHEM-162',
    name: 'QM-S Q1807',
    elements: ['Mn', 'Fe', 'Co', 'Cu', 'Zn', 'Se', 'Mo'],
    element_units: ['ppb', 'ppm', 'ppb', 'ppm', 'ppm', 'ppm', 'ppb'],
    elements_to_display: [1, 1, 1, 1, 1, 1, 1],
    active: true,
  }

  const limits = [
    {
      user: 'jeffrey',
      method: 'CHEM-162',
      material: 'QM-S Q1807',
      start: 1588339519,
      end: 1588857919,
      averages: [2.5, 0.9, 4.5, 1.2, 1.0, 0.13, 1.8],
      stdevs: [0.1, 0.05, 0.3, 0.1, 0.1, 0.01, 0.3]
    },
    {
      user: 'jeffrey',
      method: 'CHEM-162',
      material: 'QM-S Q1807',
      start: 1588944319,
      end: 1589203519,
      averages: [2.4, 0.95, 4.2, 1.16, 0.99, 0.15, 1.4],
      stdevs: [0.11, 0.055, 0.23, 0.11, 0.1, 0.02, 0.3]
    }
  ]
  return (
    <div className="container">
      <h1>Data Entry for {material.method} - {material.name}</h1>
      <EntryRow elements={material.elements} averages={limits.slice(-1)[0].averages} stdevs={limits.slice(-1)[0].stdevs} />
    </div>
  )
}

export default App;
