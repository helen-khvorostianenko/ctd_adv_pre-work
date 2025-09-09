import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';

function Character() {
    const params = useParams();
    const id = params.id;
    
    const [character, setCharacter] = useState(null);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState('');


    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:3000/characters/${encodeURIComponent(id)}`)
        .then(async (res) => {
            if (!res.ok) {
                const text = await res.text();
                throw new Error(`${res.status} ${res.statusText} – ${text}`);
            }
            return res.json();
        })
        .then((data) => {
            const r = data?.result ?? data;
            const p = r?.properties ?? {};
            setCharacter({
            uid: r?.uid,
            description: r?.description,
            ...p,
            });
        })
        .catch((err) => {
            setError(err.message || "Failed to load")
        })
        .finally(() => setLoading(false));
    
    }, [id]);

    if (loading) {
        return (
        <main className="container">
            <div className="page-title">
            <h1>Star Wars Character</h1>
            <p className="subtitle">Loading…</p>
            </div>
        </main>
        );
    }

    if (error) {
        return (
        <main className="container">
            <div className="page-title">
            <h1>Star Wars Character</h1>
            <p className="subtitle" role="alert">{error}</p>
            <Link to="/characters" className="btn">← Back</Link>
            </div>
        </main>
        );
    }

    if (!character) return null;

    const {
        name, gender, hair_color, height, eye_color, mass,
        birth_year, films = []
    } = character;

    const formatDate = (iso) =>
        iso ? new Date(iso).toLocaleString() : '—';

    const list = (arr) =>
        arr.length ? (
        <ul className="chip-list">
            {arr.map((u) => {
                const id = new URL(u).pathname.split('/').filter(Boolean).pop();
                return (
                    <li key={u}>
                        <Link className="chip" to={`/films/${encodeURIComponent(id)}`}>
                            {id}
                        </Link>
                    </li>
                );
            })}
        </ul>
        ) : '—';

    return (
    <main className="container">
      <header className="detail-header">
        <h1 className="title">{name || `Character #${id}`}</h1>
        <Link to="/characters" className="btn">← Character list</Link>
      </header>

      <div className="card">
        <table className="char-table">
          <tbody>
            <tr><th>Name</th><td>{name || '—'}</td></tr>
            <tr><th>Gender</th><td>{gender || '—'}</td></tr>
            <tr><th>Hair color</th><td>{hair_color || '—'}</td></tr>
            <tr><th>Height</th><td>{height || '—'}</td></tr>
            <tr><th>Eye color</th><td>{eye_color || '—'}</td></tr>
            <tr><th>Mass</th><td>{mass || '—'}</td></tr>
            <tr><th>Birth year</th><td>{birth_year || '—'}</td></tr>
            <tr><th>Films</th><td>{list(films)}</td></tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Character;