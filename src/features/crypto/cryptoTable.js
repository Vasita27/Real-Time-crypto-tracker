import React, { useEffect, useState, useRef } from 'react';
import './table.css';

const symbols = ['btcusdt', 'ethusdt', 'solusdt', 'bnbusdt', 'xrpusdt', 'adausdt'];

const symbolMeta = {
  BTCUSDT: {
    name: "Bitcoin",
    logo: "https://cdn-icons-png.freepik.com/256/1490/1490849.png",
    chart: "https://www.coingecko.com/total_market_cap.svg"
  },
  ETHUSDT: {
    name: "Ethereum",
    logo: "https://cdn-icons-png.freepik.com/256/7037/7037886.png",
    chart: "https://www.coingecko.com/coins/825/sparkline.svg"
  },
  SOLUSDT: {
    name: "Solana",
    logo: "https://cdn-icons-png.freepik.com/256/17978/17978720.png",
    chart: "https://www.coingecko.com/coins/975/sparkline.svg"
  },
  BNBUSDT: {
    name: "Binance Coin",
    logo: "https://cdn-icons-png.freepik.com/256/6001/6001399.png",
    chart: "https://www.coingecko.com/coins/1094/sparkline.svg"
  },
  XRPUSDT: {
    name: "XRP",
    logo: "https://cdn-icons-png.freepik.com/256/15279/15279117.png",
    chart: "https://www.coingecko.com/coins/11939/sparkline.svg"
  },
  ADAUSDT: {
    name: "Cardano",
    logo: "https://cdn-icons-png.freepik.com/256/12093/12093020.png",
    chart: "https://www.coingecko.com/coins/9956/sparkline.svg"
  },
};

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState({});
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

      setCryptoData(prev => ({
        ...prev,
        [symbol]: {
          ...prev[symbol],
          price,
          percent_change_24h: percentChange24h,
          ...(!prev[symbol]?.name && { name: symbolMeta[symbol]?.name }),
          ...(!prev[symbol]?.percent_change_1h && { percent_change_1h: (Math.random() * 10 - 5).toFixed(2) }),
          ...(!prev[symbol]?.percent_change_7d && { percent_change_7d: (Math.random() * 20 - 10).toFixed(2) }),
          ...(!prev[symbol]?.market_cap && { market_cap: Math.floor(Math.random() * 500_000_000_000 + 1_000_000_000) }),
          ...(!prev[symbol]?.volume_24h && { volume_24h: Math.floor(Math.random() * 50_000_000_000 + 10_000_000) }),
          ...(!prev[symbol]?.circulating_supply && { circulating_supply: Math.floor(Math.random() * 1_000_000_000) }),
          ...(!prev[symbol]?.max_supply && { max_supply: Math.floor(Math.random() * 2_000_000_000) }),
          ...(!prev[symbol]?.chart && { chart: symbolMeta[symbol]?.chart || "https://www.svgrepo.com/show/503032/chart-graph.svg" }),
          ...(!prev[symbol]?.logo && { logo: symbolMeta[symbol]?.logo || "https://via.placeholder.com/24?text=?" }),
        }
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

  // Simulate continuous 1h and 7d percentage updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData(prevData => {
        const updatedData = { ...prevData };
        Object.keys(updatedData).forEach(symbol => {
          updatedData[symbol] = {
            ...updatedData[symbol],
            percent_change_1h: (
              parseFloat(updatedData[symbol].percent_change_1h || 0) +
              (Math.random() * 0.2 - 0.1)
            ).toFixed(2),
            percent_change_7d: (
              parseFloat(updatedData[symbol].percent_change_7d || 0) +
              (Math.random() * 0.5 - 0.25)
            ).toFixed(2),
          };
        });
        return updatedData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <table className="crypto-table">
      <thead>
        <tr>
          <th>#</th><th>Logo</th><th>Name</th><th>Symbol</th><th>Price</th>
          <th>1h %</th><th>24h %</th><th>7d %</th>
          <th>Market Cap</th><th>24h Volume</th>
          <th>Circulating Supply</th><th>Max Supply</th><th className="chart-cell">7D Chart</th>
        </tr>
      </thead>
      <tbody>
        {symbols.map((sym, index) => {
          const coin = cryptoData[sym.toUpperCase()];
          return (
            <tr key={sym}>
              <td>{index + 1}</td>
              <td>
                {coin?.logo ? (
                  <img src={coin.logo} alt={coin.symbol} width="24" />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td>{coin?.name}</td>
              <td>{sym.toUpperCase()}</td>
              <td>{coin?.price ? `$${coin.price.toLocaleString()}` : 'Loading...'}</td>
              <td className={coin?.percent_change_1h >= 0 ? 'green' : 'red'}>
                {coin?.percent_change_1h ? `${parseFloat(coin.percent_change_1h).toFixed(2)}%` : 'N/A'}
              </td>
              <td className={coin?.percent_change_24h >= 0 ? 'green' : 'red'}>
                {coin?.percent_change_24h ? `${coin.percent_change_24h.toFixed(2)}%` : 'N/A'}
              </td>
              <td className={coin?.percent_change_7d >= 0 ? 'green' : 'red'}>
                {coin?.percent_change_7d ? `${parseFloat(coin.percent_change_7d).toFixed(2)}%` : 'N/A'}
              </td>
              <td>{coin?.market_cap ? `$${coin.market_cap.toLocaleString()}` : 'N/A'}</td>
              <td>{coin?.volume_24h ? `$${coin.volume_24h.toLocaleString()}` : 'N/A'}</td>
              <td>{coin?.circulating_supply ? `${coin.circulating_supply} ${sym.toUpperCase()}` : 'N/A'}</td>
              <td>{coin?.max_supply ?? '∞'}</td>
              <td className="chart-cell">
                {coin?.chart ? (
                  <img src={coin.chart} alt="chart" style={{ width: '100%', height: 'auto' }} />
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
