// src/App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAssets, updateAssets } from './features/crypto/cryptoSlice';
import { generateRandomUpdate } from './utils/mockWebScoket';
import CryptoTable from './features/crypto/cryptoTable';
import './styles.css';

const App = () => {
  const dispatch = useDispatch();
  const assets = useSelector(selectAssets);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedAssets = generateRandomUpdate(assets);
      dispatch(updateAssets(updatedAssets));
    }, 2000);

    return () => clearInterval(interval);
  }, [dispatch, assets]);

  return (
    <div className="app-container">
      <h1>Real-Time Crypto Tracker</h1>
      <CryptoTable />
    </div>
  );
};

export default App;
