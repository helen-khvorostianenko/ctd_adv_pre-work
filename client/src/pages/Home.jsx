import { Link } from "react-router";

export default function Home() {
  return (
    <div className="container">
      <div className="hero-intro">
        <p className="hero-subtitle">
          A living codex of Star Wars knowledge — explore films, characters and the stories
          of a galaxy far, far away.
        </p>
      </div>
      <section className="split-grid">
        <article className="panel panel--films">
          <div className="panel__overlay" />
          <div className="panel__content">
            <header>
              <h2 className="panel__title">Films</h2>
              <p className="panel__desc">
                Explore episodes, release dates, posters and details from the saga.
              </p>
            </header>

            <div className="panel__actions">
              <Link to="/films" className="btn btn--cta">Browse films →</Link>
            </div>
          </div>
        </article>
        <article className="panel panel--characters">
          <div className="panel__overlay" />
          <div className="panel__content">
            <header>
              <h2 className="panel__title">Characters</h2>
              <p className="panel__desc">
                Meet the heroes and villains from across the galaxy.
              </p>
              <br/>
              <p className="panel__desc">
                Luke, Leia, Vader, R2-D2, C-3PO, Yoda, Han Solo ...
              </p>
            </header>

            <div className="panel__actions">
              <Link to="/characters" className="btn btn--cta btn--violet">
                Browse characters →
              </Link>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
