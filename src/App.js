import React from 'react';
import './App.css';
import {comedyMovies,HorrorMovies,action, originals} from './urls'
import Banner from './Components/Banner/Banner';
import NavBar from './Components/NavBar/NavBar';
import Rowpost from './Components/RowPost/Rowpost';

function App() {
  return (
    <div className="App">
    <NavBar/>
    <Banner/>
    <Rowpost url={originals} title='Netflix Orginals'/>
    <Rowpost url={action}  title='Action' isSmall/>
    <Rowpost url={HorrorMovies}  title='Horror' isSmall/>
    <Rowpost url={comedyMovies}  title='Comedy' isSmall/>
    </div>
  );
}

export default App;
