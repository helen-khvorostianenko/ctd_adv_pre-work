import {Outlet} from 'react-router';

function Layout() {
  return (
    <div className="layout">
      <header className="header">Header</header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">Footer</footer>
    </div>
  );
}

export default Layout;
