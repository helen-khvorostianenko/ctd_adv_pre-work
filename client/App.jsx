import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  const [films, setFilms] = useState([
    {title:'film 05', url:"www.youtube.com"},
    {title:'film 06', url:"www.youtube.com"},
    {title:'film 07', url:"www.youtube.com"},
    {title:'film 08', url:"www.youtube.com"},
  ]) 

  console.log(films);

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

      <div>
        <h1>Films</h1>
        <ul>
          <a href="https://react.dev" target="_blank">
           <li>film 01</li>
          </a>
          <li>film 02</li>
          <li>film 03</li>
          <li>film 04</li>
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
