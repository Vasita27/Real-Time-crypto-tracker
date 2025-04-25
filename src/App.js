import React from 'react';
import './App.css';
import CryptoTable from './features/crypto/cryptoTable'; // Assuming CryptoTable is in the same directory


function App() {
  return (
    <div className="App">
      <h1>Crypto Market Dashboard</h1>
      <CryptoTable />
    </div>
  );
}

export default App;
