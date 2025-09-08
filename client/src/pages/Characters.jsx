import { useState, useEffect } from 'react';

function Characters() {
const [characters, setCharacter] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:3000/characters')
      .then(res => {
        return res.json()
      })
      .then(data => {
        setCharacter(data)}
      )
      .catch(err => console.error(err));
  }, []);

    return (
        <main className="container">
      <div className="page-title">
        <h1>Star Wars Films Characters</h1>
        <p className="subtitle">A long time ago in a galaxy far, far away…</p>
      </div>

      {characters.length === 0 ? (
        <div className="empty">No characters yet.</div>
      ) : (
        <ul className="grid">
          {characters.map((character) => (
            <li className="card" key={character.uid ?? character.name}>
              <div className="card-body">
                <h3 className="title">{character.name}</h3>
                <div className="actions">
                  <a
                    className="btn"
                    href={character.api_url}
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
    );
}

export default Characters;