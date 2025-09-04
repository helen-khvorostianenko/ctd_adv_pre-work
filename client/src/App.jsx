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
        console.log(res);
        return res.json()
      })
      .then(data => setFilms(data.result))
      .catch(err => console.error(err));
  }, []);

  console.log(films);

  return (
    <>
      <div>
        <h1>Film</h1>
        <ul>
          <a href="https://react.dev" target="_blank">
           <li>film 01</li>
          </a>
          <li>film 02</li>
          <li>film 03</li>
          <li>film 04</li>
          {films.map(film => {
            return <a href="" target="_blank">
           <li>{film.properties.title}</li>
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
