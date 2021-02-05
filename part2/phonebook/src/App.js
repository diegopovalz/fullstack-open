import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ handleFilterChange }) => {
  return (
    <>
      filter shown with <input onChange={handleFilterChange} />
    </>
  )
}

const PersonForm = ({ newName, handleNameChange, newNumber, handleNewNumber, handleNewName }) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit" onClick={handleNewName}>add</button>
      </div>
    </form>
  )
}

const Persons = ({ filterPersons }) => {
  return (
    <>
      { filterPersons.map(person => <li key={person.number}>{person.name} {person.number}</li>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPersons, setFilterPersons] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setFilterPersons(response.data)
      })
  }, [])

  const handleNewName = (event) => {
    event.preventDefault()
    if (newName === '') {
      alert('name cannot be empty')
      return
    } else if (newNumber === '') {
      alert('phone number cannot be empty')
      return
    }

    if (persons.findIndex(x => x.name === newName) !== -1) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }
    setPersons(persons.concat({ name: newName, number: newNumber }))
    setFilterPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
  }

  const handleNewNumber = event => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterChange = event => {
    event.preventDefault()
    setFilterPersons(persons.filter(person => person.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNewNumber={handleNewNumber} handleNewName={handleNewName} />
      <h2>Numbers</h2>
      <div>
        <ul>
          <Persons filterPersons={filterPersons} />
        </ul>
      </div>
    </div>

  )
}

export default App
