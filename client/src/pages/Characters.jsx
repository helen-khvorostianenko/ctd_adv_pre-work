import { useState, useEffect } from 'react';
import { Link } from "react-router";

function Characters() {
  const [characters, setCharacter] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  
  useEffect(() => {
    setLoading(true); 
    fetch(`http://localhost:3000/characters?page=${page}`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`${res.status} ${res.statusText} – ${text}`);
        }
        return res.json();
      })
      .then(data => {
        setCharacter(data.results || []);
        setPage(data.page ?? 1);
        setLimit(data.limit ?? 10);
        setTotal(data.total ?? 0);
        setTotalPages(data.total_pages ?? 0);
        setHasNext(Boolean(data.next));
        setHasPrev(Boolean(data.previous));
        setError("");
      })
      .catch((err) => {
        setError(err.message || "Failed to load")
      })
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) {
    return (
      <main className="container">
        <div className="page-title">
          <h1>Star Wars Characters</h1>
          <p className="subtitle">Loading...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container">
        <div className="page-title">
          <h1>Star Wars Characters</h1>
          <p className="subtitle error">Error: {error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="page-title">
        <h1>Star Wars Characters</h1>
        <p className="subtitle">Meet the heroes and villains of the saga</p>
      </div>

      {characters.length === 0 ? (
        <div className="empty">No characters yet.</div>
      ) : (
        <ul className="grid">
          {characters.map((char) => (
            <li key={char.uid ?? char.name}>
              <Link 
                to={`/characters/${encodeURIComponent(char.uid)}`}
                className="char-link"
              >{char.name}</Link>
            </li>
          ))}
        </ul>
      )}
       <div className="pagination">
          <button className="btn" disabled={!hasPrev || page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>
            Prev
          </button>
          <span className="page-indicator">
            Page {page} of {totalPages} 
          </span>
          <button className="btn" disabled={!hasNext || page >= totalPages} onClick={() => setPage(p => p + 1)}>
            Next
          </button>
        </div>
    </main>
  );
}

export default Characters;