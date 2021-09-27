import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import StateInputs from './components/stateinputs/stateinputs.component';

function App() {
  return (
    <div className="App">
      <header>
        <StateInputs
          className={{
            container: 'containerA',
            row: 'rowB',
            col: 'colC',
          }}
          style={{
            asterisk: {color: 'yellowgreen'},
            text: {color: 'gray'},
            select: {color: 'white', background: 'black'},
            option: {color: 'white', background: 'black'},
          }}
          grid={{
            xs: { left: { span: 12 }, right: { span: 12 } },
            sm: { left: { span: 6 }, right: { span: 6 } },
            md: { left: { span: 3 }, right: { span: 9 } },
          }}
          initState={{
            need: { asterisk: true, value: 'need value'},
            text: { value: 'a value' },
            selects: [{ asterisk: true, value: 'first' }, { value: 'second'}],
          }}
        />
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
