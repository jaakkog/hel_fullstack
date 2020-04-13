import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'

const Weather = ({ weather, city }) => {
  console.log(weather)
  if (!weather) {
    return null
  }

  return (
    <div>
      <h3>Weather in {city}</h3>
      <div>
        <strong>temperature:</strong> {weather.temperature} Celcius
      </div>
      <img src={weather.weather_icons[0]} alt={weather.weather_descriptions[0]} />
      <div>
        <strong>wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}
      </div>
      
    </div>
  )
}




const Name = ({ country }) => {

  const [weather, setWeather] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`

  useEffect(() => {
    axios.get(url).then(response => {
      setWeather(response.data.current)
    })
  }, [])

  return (
    <div>
    <h2>{country.name}</h2>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
    <p><b>Languages</b></p>
    <p>{country.languages.map((x,i) => <li key={i}>{x.name}</li>)}</p>
    <img src={country.flag} alt="country flag" width="200" height="150"></img>
    <Weather weather={weather} city={country.capital} />
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
