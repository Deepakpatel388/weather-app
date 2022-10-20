import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { getSuggestedQuery } from '@testing-library/react';


const api = {
  key: "b64e54a24e3fad893f8474558211ebf6",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
  let [search,setSearch] = useState("");
  let [day,setDay] = useState("Day");
  let [place,setPlace] = useState("Place");
  let [date,setDate] = useState("Date");
  let [temp,setTemp] = useState("- °C");
  let [minTemp,setMinTemp] = useState("Min Temp");
  let [maxTemp,setMaxTemp] = useState("Max temp");
  let [weather,setWeather] = useState("Weather");
  let [myData,setMyData] = useState([]);

  const setLocation = (event)=>{
    console.log(event.target.value);
    setSearch(event.target.value);    
    searchQuery(event.target.value);
  }

  const searchQuery = (evt) =>{
    // if(evt.keyCode == 13){
    //   getResults(search);
    // }
    
    getResults(evt);
  }

  const getResults = (city)=>{
    fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
    .then(weather => weather.json())
    .then(data => setMyData(data));
  }

  // const displayResults = (weather) =>{

  //   setPlace(`${weather.name} ${weather.city}`);

  //   setTemp()
    
  //   let city = document.querySelector('.location .city');
  //   city.innerText = `${weather.name}, ${weather.sys.country}`;

  //   let now = new Date();
  //   let date = document.querySelector('.location .date');
  //   date.innerText = dateBuilder(now);

  //   let temp = document.querySelector('.current .temp');
  //   temp.innerHTML = `${Math.round(weather.main.temp)}<span> °C</span>`;

  //   let weather_el = document.querySelector('.current .weather');
  //   weather_el.innerText = weather.weather[0].main;

  //   let hilow = document.querySelector('.hi-low');
  //   hilow.innerText = `${Math.round(weather.main.feels_like)} °C | ${Math.round(weather.main.temp_max)} °C`;
  // }
  return (
    
    <div className="App">
    {console.log(myData)}
      <header className='header'>
            <input type="text" className="search-box" placeholder="Search for a city" onChange={setLocation}/>
      </header>
        <main className='main'>
            <section className="location">
                <div className="city">{myData.name} </div>
                <div className="date" >{new Date().toLocaleDateString()} {" | "} {new Date().toLocaleTimeString()}</div>
            </section>
            <div className="current">
                <div className="temp" >{myData.main === undefined ? "temperature" : myData.main.temp}</div>
                <div className="weather" >{myData.weather === undefined ? "weather" : myData.weather[0].description}</div>
                <div className="hi-low" >{myData.main === undefined ? "min-Temp" : myData.main.temp_min
} {" | "}{myData.main === undefined ? "max-Temp" : myData.main.temp_max}</div>
            </div>
        </main>
    </div>
  );
}

export default App;
