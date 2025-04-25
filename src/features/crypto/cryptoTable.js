import React, { useEffect, useRef } from 'react';
import './table.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCryptoData } from './cryptoSlice';

const symbols = ['btcusdt', 'ethusdt', 'solusdt', 'bnbusdt', 'xrpusdt', 'adausdt'];

 
const symbolMeta = {
  BTCUSDT: {
    name: "Bitcoin",
    logo: "https://cdn-icons-png.freepik.com/256/1490/1490849.png",
    chart: "https://www.coingecko.com/total_market_cap.svg",
    max_supply : Math.floor(Math.random() * 2_000_000_000),
    circulating_supply: Math.floor(Math.random() * 1_000_000_000),
    market_cap : Math.floor(Math.random() * 50_000_000_000 + 10_000_000),
  },
  ETHUSDT: {
    name: "Ethereum",
    logo: "https://cdn-icons-png.freepik.com/256/7037/7037886.png",
    chart: "https://www.coingecko.com/coins/825/sparkline.svg",
    max_supply : Math.floor(Math.random() * 2_000_000_000),
    circulating_supply: Math.floor(Math.random() * 1_000_000_000),
    market_cap : Math.floor(Math.random() * 50_000_000_000 + 10_000_000),
  },
  SOLUSDT: {
    name: "Solana",
    logo: "https://cdn-icons-png.freepik.com/256/17978/17978720.png",
    chart: "https://www.coingecko.com/coins/975/sparkline.svg",
    max_supply : Math.floor(Math.random() * 2_000_000_000),
    circulating_supply: Math.floor(Math.random() * 1_000_000_000),
    market_cap : Math.floor(Math.random() * 50_000_000_000 + 10_000_000),

  },
  BNBUSDT: {
    name: "Binance Coin",
    logo: "https://cdn-icons-png.freepik.com/256/6001/6001399.png",
    chart: "https://www.coingecko.com/coins/1094/sparkline.svg",
    max_supply : Math.floor(Math.random() * 2_000_000_000),
    circulating_supply: Math.floor(Math.random() * 1_000_000_000),
    market_cap : Math.floor(Math.random() * 50_000_000_000 + 10_000_000),
  },
  XRPUSDT: {
    name: "XRP",
    logo: "https://cdn-icons-png.freepik.com/256/15279/15279117.png",
    chart: "https://www.coingecko.com/coins/11939/sparkline.svg",
    max_supply : Math.floor(Math.random() * 2_000_000_000),
    circulating_supply: Math.floor(Math.random() * 1_000_000_000),
    market_cap : Math.floor(Math.random() * 50_000_000_000 + 10_000_000),
  },
  ADAUSDT: {
    name: "Cardano",
    logo: "https://cdn-icons-png.freepik.com/256/12093/12093020.png",
    chart: "https://www.coingecko.com/coins/9956/sparkline.svg",
    max_supply : Math.floor(Math.random() * 2_000_000_000),
    circulating_supply: Math.floor(Math.random() * 1_000_000_000),
    market_cap : Math.floor(Math.random() * 50_000_000_000 + 10_000_000),
  },
};

const CryptoTable = () => {
  const dispatch = useDispatch();
  const cryptoData = useSelector((state) => state.crypto.assets);
  
 
  const wsRef = useRef(null);

  const createWebSocket = () => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${symbols.map(s => `${s}@ticker`).join('/')}`
    );

    ws.onopen = () => console.log("WebSocket connected ✅");

    ws.onmessage = (event) => {
        
      const { data } = JSON.parse(event.data);
      const symbol = data.s;
      const price = parseFloat(data.c);
      const percentChange24h = parseFloat(data.P);
      const volume_24h = parseFloat(data.v);
      console.log(volume_24h)

      dispatch(setCryptoData({
        symbol,
        data: {
          price,
          percent_change_24h: percentChange24h,
          name: symbolMeta[symbol]?.name || symbol,
          percent_change_1h: (Math.random() * 10 - 5).toFixed(2),
          percent_change_7d: (Math.random() * 20 - 10).toFixed(2),
          market_cap: symbolMeta[symbol]?.market_cap || Math.floor(Math.random() * 50_000_000_000 + 10_000_000),
          volume_24h: volume_24h,
          circulating_supply: symbolMeta[symbol]?.circulating_supply || Math.floor(Math.random() * 1_000_000_000),
          max_supply: symbolMeta[symbol]?.max_supply || Math.floor(Math.random() * 2_000_000_000),
          chart: symbolMeta[symbol]?.chart || "https://www.svgrepo.com/show/503032/chart-graph.svg",
          logo: symbolMeta[symbol]?.logo || "https://via.placeholder.com/24?text=?",
        },
      }));
    };

    ws.onclose = () => {
      console.log("WebSocket closed ❌, reconnecting in 3s...");
      setTimeout(createWebSocket, 3000);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      ws.close();
    };

    wsRef.current = ws;
  };

  useEffect(() => {
    createWebSocket();

    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, []);
  
  return (
  <table className="crypto-table">
    <thead>
      <tr>
        <th>#</th>
        <th>Logo</th>
        <th>Name</th>
        <th>Symbol</th>
        <th>Price</th>
        <th>1h %</th>
        <th>24h %</th>
        <th>7d %</th>
        <th>Market Cap</th>
        <th>24h Volume</th>
        <th>Circulating Supply</th>
        <th>Max Supply</th>
        <th className="chart-cell">7D Chart</th>
      </tr>
    </thead>
    <tbody>
      {symbols.map((sym, index) => {
        const coin = cryptoData[sym.toUpperCase()];

        if (!coin) {
          return (
            <tr key={sym}>
              <td>{index + 1}</td>
              <td colSpan="12">Loading data for {sym.toUpperCase()}...</td>
            </tr>
          );
        }

        return (
          <tr key={sym}>
            <td>{index + 1}</td>
            <td >
              {coin.logo ? (
                <img src={coin.logo} alt={coin.symbol} width="24" />
              ) : (
                <span>No Image</span>
              )}
            </td>
            <td className="name-symbol-cell">{coin.name}</td>
            <td>{sym.toUpperCase()}</td>
            <td>
              {coin.price ? `$${coin.price.toLocaleString()}` : 'Loading...'}
            </td>
            <td className={coin.percent_change_1h >= 0 ? 'green' : 'red'}>
              {coin.percent_change_1h !== undefined
                ? `${parseFloat(coin.percent_change_1h).toFixed(2)}%`
                : 'N/A'}
            </td>
            <td className={coin.percent_change_24h >= 0 ? 'green' : 'red'}>
              {coin.percent_change_24h !== undefined
                ? `${parseFloat(coin.percent_change_24h).toFixed(2)}%`
                : 'N/A'}
            </td>
            <td className={coin.percent_change_7d >= 0 ? 'green' : 'red'}>
              {coin.percent_change_7d !== undefined
                ? `${parseFloat(coin.percent_change_7d).toFixed(2)}%`
                : 'N/A'}
            </td>
            <td>
              {coin.market_cap
                ? `$${coin.market_cap.toLocaleString()}`
                : 'N/A'}
            </td>
            <td>
              {coin.volume_24h
                ? `$${coin.volume_24h.toLocaleString()}`
                : 'N/A'}
            </td>
            <td>
              {coin.circulating_supply
                ? `${coin.circulating_supply.toLocaleString()} ${sym.toUpperCase()}`
                : 'N/A'}
            </td>
            <td>{coin.max_supply ?? '∞'}</td>
            <td className="chart-cell">
              {coin.chart ? (
                <img
                  src={coin.chart}
                  alt="chart"
                  style={{ width: '100%', height: 'auto' }}
                />
              ) : (
                'N/A'
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

};

export default CryptoTable;
