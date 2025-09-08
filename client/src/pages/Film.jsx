import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';

function Film() {
    const params = useParams();
    const id = params.id;
    
    const [film, setFilm]  = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState('');

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:3000/films/${encodeURIComponent(id)}`)
        .then(async (res) => {
            if (!res.ok) {
                const text = await res.text();
                throw new Error(`${res.status} ${res.statusText} – ${text}`);
            }
            return res.json();
        })
        .then((json) => {
            const r = json?.result ?? json;
            const p = r?.properties ?? {};
            setFilm({
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
            <h1>Star Wars Film</h1>
            <p className="subtitle">Loading…</p>
            </div>
        </main>
        );
    }

    if (error) {
        return (
        <main className="container">
            <div className="page-title">
            <h1>Star Wars Film</h1>
            <p className="subtitle" role="alert">{error}</p>
            <Link to="/film" className="btn">← Back</Link>
            </div>
        </main>
        );
    }

    if (!film) return null;

    
    return (
    <main className="container">
        film info ...
    </main>
  );
}

export default Film;