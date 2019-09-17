import React from 'react';
import logo from './logo.svg';
import './App.css';
import Product from './components/Product';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h3>My React App</h3>
      </header>
      <section>
           <Product />
        </section>
    </div>
  );
}

export default App;
