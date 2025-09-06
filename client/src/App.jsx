import { useState, useEffect } from 'react'
import './App.css'

function App() {
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
      <main className="container">
      <div className="page-title">
        <h1>Star Wars Films</h1>
        <p className="subtitle">A long time ago in a galaxy far, far away…</p>
      </div>

      {films.length === 0 ? (
        <div className="empty">No films yet.</div>
      ) : (
        <ul className="grid">
          {films.map((film) => (
            <li className="card" key={film.uid ?? film.title}>
              <div className="poster-wrap">
                {film.img ? (
                  <img
                    className="poster"
                    src={film.img}
                    alt={`${film.title} poster`}
                    loading="lazy"
                  />
                ) : (
                  <div className="poster placeholder">No Image</div>
                )}
                <span className="badge">EP {film.episode_id}</span>
              </div>

              <div className="card-body">
                <h2 className="title">{film.title}</h2>
                <p className="meta">
                  Release:&nbsp;
                  <time dateTime={film.release_date}>{film.release_date}</time>
                </p>

                <div className="actions">
                  <a
                    className="btn"
                    href={film.url}
                    target="_blank"
                    rel="noreferrer"
                    title="Open original source"
                  >
                    Details
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
    </>
  );
}

export default App;
