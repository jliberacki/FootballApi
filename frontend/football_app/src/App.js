import React from 'react';
import football from './football.svg';
import './App.css';
import SearchComponent from "./Search";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={football} className="App-logo" alt="logo" />
        <SearchComponent />
      </header>
    </div>
  );
}

export default App;
