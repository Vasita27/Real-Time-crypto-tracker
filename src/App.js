import React from 'react';
import './App.css';
import CryptoTable from './features/crypto/cryptoTable'; // Assuming CryptoTable is in the same directory
import { Provider } from 'react-redux';
import store from './app/store'; // Your Redux store

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Crypto Market Dashboard</h1>
        <CryptoTable />
      </div>
    </Provider>
  );
}

export default App;
