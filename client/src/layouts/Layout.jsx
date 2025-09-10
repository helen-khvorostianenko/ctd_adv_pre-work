import {Link, Outlet, NavLink, useLocation} from 'react-router';

function Layout() {
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  return (
    <div className="layout">
      <header className="header">
        <div className="header__inner ">
          <Link to="/" className="logo" aria-label="Go home">
            <span className="logo__mark" />
            <span className="logo__text">Holocron</span>
          </Link>

          {!isMainPage && (
            <nav className="nav" aria-label="Primary">
              <NavLink to="/" className={`nav-link`}>Home</NavLink>
              <NavLink
                to="/films"
                end
                className={({ isActive }) =>
                  `nav-link${isActive ? " is-active" : ""}`
                }
              >
                Films
              </NavLink>
              <NavLink
                to="/characters"
                end
                className={({ isActive }) =>
                  `nav-link${isActive ? " is-active" : ""}`
                }
              >
                Characters
              </NavLink>
            </nav>
          )}
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer__inner container">
          <p className="footer__text">
            Data: <a href="https://swapi.tech" target="_blank" rel="noreferrer">SWAPI</a>
          </p>
          <p className="footer__text">
            Made by <a href="https://www.linkedin.com/in/helen-khvorostianenko/" target="_blank">Olena Khvorostianenko</a>
          </p>
        </div>
      </footer>
    </div>
);
}

export default Layout;
