import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'

const Name = ({ country }) => {


  return (
    <div>
    <h2>{country.name}</h2>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
    <p><b>Languages</b></p>
    <p>{country.languages.map((x,i) => <li key={i}>{x.name}</li>)}</p>
    <img src={country.flag} alt="country flag" width="200" height="150"></img>
    </div>
  )
}


const Filter = ({ handleFilter, searchCountry }) => {
  return (
    <div>
      <form>
        <div>
          Search for country: 
          <input placeholder='Search'
                  value={searchCountry}
                 onChange={handleFilter}>

          </input>
        </div>
      </form>
    </div>
  )
}


const Countries = ({ searchResults }) => {
  

  if(searchResults.length === 1) {
  return (
    <div>
      {searchResults.map((country, i) =>
        <Name key={i} country={country} />
      )}
    </div>
  )}
  else if (searchResults.length <= 10) {
    return (
      <div>
        {searchResults.map((country, i) =>
        <div key={i}>
           <p>{country.name}</p>
        </div>)}
      </div>
    )
  }
  else  {
    return (
      <div>
        Please search for country data
      </div>
    )
  }
}


const App = () => {
  
  const [countries, setCountries] = useState([]) 
  const [searchCountry, setSearchCountry] = useState('');
  const [searchResults, setSearchResults] = useState([]);



  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  

  React.useEffect(() => {
    const results = countries.filter(
      country => country.name.toLowerCase().includes(searchCountry)
    );
    setSearchResults(results);
  }, [countries, searchCountry])


  const handleFilter = (event) => {
    console.log(handleFilter)
    setSearchCountry(event.target.value)
  }


  return (
    <div>
      <h1>Search for countries</h1>
      <Filter handleFilter={handleFilter} searchCountry={searchCountry}/>
      <Countries countries={countries} searchResults={searchResults} />
    </div>
  )

  
}

export default App;
