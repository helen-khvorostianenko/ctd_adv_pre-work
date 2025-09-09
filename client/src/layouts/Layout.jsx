import {Link, Outlet, useLocation} from 'react-router';

function Layout() {
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  return (
    <div className="layout">
      <header className="header">
        {!isMainPage && (<Link to='/'>Home</Link>)}
        Header
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">Footer</footer>
    </div>
  );
}

export default Layout;
