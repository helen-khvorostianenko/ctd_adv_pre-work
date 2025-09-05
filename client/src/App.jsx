import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/films')
      .then(res => {
        return res.json()
      })
      .then(data => {
        setFilms(data)}
      )
      .catch(err => console.error(err));
  }, []);

  console.log(films);

  return (
    <>
      <div>
        <h1>Film</h1>
        <ul>
          {films.map(film => {
            return <a href={film.url} target="_blank">
           <li>{film.title}</li>
          </a>
          })}
        </ul>
        
        <h1>Characters</h1>
         <ul>
          <li>hero 01</li>
          <li>hero 02</li>
          <li>hero 03</li>
          <li>hero 04</li>
        </ul>
      </div>
    </>
  );
}

export default App;
