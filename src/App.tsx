import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import StateInputs from './components/stateinputs/stateinputs.component';

function App() {
  return (
    <div className="App">
      <header>
        <StateInputs grid={{md: {left: { span: 3 } , right: { span: 9 } }}} initState={{ need: { asterisk: true, value: 'need ar'}, text: { value: 'a' }, selects: [{ value: 'first' }, { value: 'second'}] }} />
      </header>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
