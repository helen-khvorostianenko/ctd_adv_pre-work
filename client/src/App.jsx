import './App.css';
import {Routes, Route, Link, Outlet} from "react-router";
import Films from './pages/Films';
import Characters from './pages/Characters';
import Layout from './layouts/Layout.jsx';
import Character from './pages/Character';
import Film from './pages/Film';
import Home from './pages/Home';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="films" element={<Films/>}/>
        <Route path="films/:id" element={<Film/>}/>
        <Route path="characters" element={<Characters/>}/>
        <Route path="characters/:id" element={<Character/>}/>
      </Route>
    </Routes>
  );
}

export default App;
