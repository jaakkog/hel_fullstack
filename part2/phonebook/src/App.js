import React, { useState, useEffect } from 'react'
import personService from './services/personService'

const Name = ({ person, deletePerson, id }) => {
  return (
    <p>{person.name} {person.number} <button onClick={deletePerson}>delete</button></p>
  )
}

const Filter = ({ handleFilter, searchPerson }) => {
  return (
    <div>
      <form>
        <div>
          Search for person: 
          <input placeholder='Search'
                  value={searchPerson}
                 onChange={handleFilter}>

          </input>
        </div>
      </form>
    </div>
  )
}


const Persons = ({ searchResults, deletePerson }) => {
  return (
  <div>
    {searchResults.map((person, i) => <Name key={i} person={person} deletePerson={() => deletePerson(person.id)} />)}
  </div>)
}


const PersonForm = ({ submitForm, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
  <div>
    <form onSubmit={submitForm}>
        <div>
          Name: <input 
          value={newName} 
          onChange={handleNameChange} />
          <br></br>
          Number: <input 
          value={newNumber} 
          onChange={handleNumberChange} />
          <br></br>
        <button type="submit">Add</button>
        </div>
        <div>
        </div>
      </form>
  </div>
  )
}

const App = () => {
  
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [searchPerson, setSearchPerson] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        console.log('useEffect',response)
        setPersons(response.data)
      })
  }, [])

  const submitForm = (event) => {
    event.preventDefault()
    personService
    .getAll()
    .then(response => {
      const numbers = [...response.data]
      console.log("here is person data",numbers)
      if (numbers.some((x) => x.name === newName)) {
        if (window.confirm(`${newName} is already added to phonebook. Want to replace old number with new one?`)) {
          const personToChange = numbers.find(name => name.name === newName).id
          const newPhone = {
            name: newName,
            number: newNumber
          }
          personService
          .replace(personToChange, newPhone)
          .then(() => {
            setNewName('')
            setNewNumber('')
            personService
            .getAll()
            .then(response => {
              setPersons(persons)
            })
            setErrorMessage(`${newName}´s number was changed.`)
            setTimeout(()  => {
            setErrorMessage(null)
        }, 3000)
          })
        }
      } else {
        const newPerson = {
          name: newName,
          number: newNumber
        }
        personService
        .create(newPerson)
        .then(response => {
          setNewName('')
          setNewNumber('')
          setPersons(numbers.concat(newPerson))
        })
        setErrorMessage(`${newPerson.name} was added to phonebook.`)
        setTimeout(()  => {
        setErrorMessage(null)
        }, 3000)
      }
    })
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }


  const deletePerson = (id) => {
    const erasingPerson = persons.find(n => n.id === id)
    alert(`Deleting ${erasingPerson.name}`, window.location.href = '')
    personService
    .erase(id)
    .then(response => {
      setPersons(persons.filter(person => person.id !== response))
    })
    
    setErrorMessage(`${erasingPerson.name} was deleted`)
    setTimeout(()  => {
    setErrorMessage(null)
    }, 3000)
    
  }




  React.useEffect(() => {
    const results = persons.filter(
      person => person.name.toLowerCase().includes(searchPerson)
    );
    setSearchResults(results);
  }, [persons, searchPerson])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(handleFilter)
    setSearchPerson(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage}/>
      <Filter handleFilter={handleFilter} searchPerson={searchPerson}/>
      <h3>Add new person</h3>
      <PersonForm handleNameChange={handleNameChange} 
                  handleNumberChange={handleNumberChange} 
                  newName={newName}
                  newNumber={newNumber}
                  submitForm={submitForm} />
      <h2>Numbers</h2>
      <Persons persons={persons} searchResults={searchResults} deletePerson={deletePerson} />
    </div>
  )

}

export default App
