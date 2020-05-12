import React from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

import MainMenu from './components/MainMenu'
import EntryRow from './components/EntryRow'
import Todo from './components/Todo'


const App = () => {

  localStorage.setItem('loggedAppUser', 'jeffrey')

  const material = {
    method: 'CHEM-162',
    name: 'QM-S Q1807 Serum',
    elements: ['Mn', 'Fe', 'Co', 'Cu', 'Zn', 'Se', 'Mo'],
    element_units: ['ppb', 'ppm', 'ppb', 'ppm', 'ppm', 'ppm', 'ppb'],
    elements_to_display: [1, 1, 1, 1, 1, 1, 1],
    display_order: [1, 2, 3, 4, 5, 6, 7],
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

  const padding = {
    padding: 5
  }
  return (
    <Router>
      <div>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/observations">Enter Data</Link>
        <Link style={padding} to="/materials">Create New Material</Link>
      </div>

      <Switch>
        <Route path="/observations">
          <h3>Data Entry for {material.method} - {material.name}</h3>
          <EntryRow material={material} averages={limits.slice(-1)[0].averages} stdevs={limits.slice(-1)[0].stdevs} />
        </Route>

        <Route path="/materials">
          <h1>Make new material!</h1>
        </Route>

        <Route path="/">
          <h1>jcqc control charting</h1>
          <p>Taking control charting into my own hands!</p>
          <MainMenu />
        </Route>
      </Switch>
      <Todo />
    </Router>
  )
}

export default App;
