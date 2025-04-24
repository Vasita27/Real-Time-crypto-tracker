// src/utils/mockWebSocket.js
export function generateRandomUpdate(assets) {
    return assets.map(asset => {
      const rand = () => (Math.random() * 2 - 1).toFixed(2);
      const change = parseFloat(rand());
      return {
        ...asset,
        price: parseFloat((asset.price * (1 + change / 100)).toFixed(2)),
        percent_change_1h: parseFloat((asset.percent_change_1h + change).toFixed(2)),
        percent_change_24h: parseFloat((asset.percent_change_24h + change).toFixed(2)),
        percent_change_7d: parseFloat((asset.percent_change_7d + change).toFixed(2)),
        volume_24h: asset.volume_24h + Math.floor(Math.random() * 1000000),
      };
    });
  }
  