import {useState, useEffect} from 'react';
import {useParams, useLocation, Link} from 'react-router';

function Film() {
  const params = useParams();
  const id = params.id;

  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const location = useLocation();
  const from = location.state?.from;

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError("");

    fetch(`http://localhost:3000/films/${encodeURIComponent(id)}`)
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
        setFilm({
          uid: r?.uid,
          description: r?.description,
          ...p,
        });
      })
      .catch((err) => setError(err.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, [id]);

  const {
    title,
    episode_id,
    director,
    producer,
    release_date,
    opening_crawl,
    img,
    description,
  } = film ?? {};

  const posterUrl = img;
  const fmtDate = (iso) => (iso ? new Date(iso).toLocaleDateString() : "—");

  const rows = film
    ? [
        ["Title", title],
        ["Episode", episode_id],
        ["Director", director],
        ["Producer", producer],
        ["Release date", fmtDate(release_date)],
        ["Description", description || "—"],
      ]
    : [];

  const pageTitle = loading ? (
    <>
      <div className="page-title"></div>
      <h2>Star Wars Film</h2>
      <p className="subtitle">Loading…</p>
    </>
  ) : error ? (
    <>
      <div className="page-title"></div>
      <h2>Star Wars Film</h2>
      <p className="subtitle error" role="alert">
        Error: {error}
      </p>
        <Link to="/films" className="btn">← Film list</Link>
    </>
  ) : (
    <>
      <header className="detail-header">
        <h1 className="title">{title || `Film #${id}`}</h1>
        {from === "character" ? (
          <Link to={-1} className="btn">← Back to character</Link>
        ) : (
          <Link to="/films" className="btn">← Film list</Link>
        )}
      </header>
    </>
  );


  return (
    <main className="container">
      {pageTitle}
      {film && (
        <div className="card film-detail">
          <div className="detail-grid">
            <div className="poster-wrap poster-film">
              <img
                className="poster"
                src={posterUrl}
                alt={title || `Film ${id}`}
              />
            </div>

            <div className="film-meta">
              <table className="kv-table">
                <tbody>
                {rows.map(([k, v]) => (
                  <tr key={k}>
                    <th>{k}</th>
                    <td>{v ?? '—'}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>

          {opening_crawl && (
            <section className="crawl">
              <h2 className="crawl-title">Opening crawl</h2>
              <p className="crawl-text">{opening_crawl}</p>
            </section>
          )}
        </div>
      )}
    </main>
  );
}

export default Film;
