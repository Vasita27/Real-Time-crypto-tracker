# 📈 Crypto Tracker Dashboard

A real-time cryptocurrency dashboard that tracks prices, trends, and other key financial metrics for top cryptocurrencies like Bitcoin, Ethereum, Solana, and more. This app updates live using WebSocket for price and 24-hour change, with simulated data for other metrics.

![Crypto Tracker Demo](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGtzNmRnOXR0c3Q0NWpneDBnMXNvNzE5eDZzZGMxZmhndmVnc3ZrayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/gjCwN2RxD5cLQg46gr/giphy.gif)

---

## 🔧 Tech Stack

| Layer             | Technology                                          |
|------------------|------------------------------------------------------|
| Frontend         | **React.js** with functional components + hooks     |
| Styling          | CSS Modules (`table.css`)                           |
| Live Data        | Binance WebSocket API (`wss://stream.binance.com`)  |
| Simulated Data   | JavaScript interval for 1h/7d change                |
| Icons & Logos    | Freepik CDN PNGs                        |
| Charts           | Sparkline charts from CoinGecko  (static)                   |


---

## Architecture  
The Crypto Tracker Dashboard is built as a single-page application (SPA) using React.js, ensuring a fast and seamless user experience without page reloads. It leverages the Binance WebSocket API for real-time cryptocurrency price updates and 24-hour change data, maintaining a continuous connection for live streaming. Other financial metrics like 1-hour/7-day changes and market cap are simulated using JavaScript intervals to mimic dynamic behavior. The component-based architecture promotes modularity, with each UI segment—like the price table and sparkline charts—managed independently. This makes the application highly scalable, maintainable, and easy to extend with new features or additional cryptocurrencies.

---

## ⚙️ Setup Instructions

1. **Clone this repository**
   ```bash
   git clone https://github.com/Vasita27/Real-Time-crypto-tracker.git
   cd Real-Time-crypto-tracker
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the development server**
   ```bash
   npm start
   ```
---

##  Features
-  Real-time price and percentChange24h tracking with binance websocket
- Beautiful token logos & 7-day trend sparkline charts (Static)
-  Simulated values for unavailable metrics (1h/7d/market cap/supply)
- Auto-reconnect WebSocket on failure
-  Easy to extend with more coins, charts, or analytics

---

## 📁 Folder Structure

```bash
CRYPTO-TRACKER/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   └── store.js
│   ├── features/
│   │   └── crypto/
│   │       ├── cryptoSlice.js
│   │       └── cryptoTable.js
│   ├── utils/
│   │   └── mockWebSocket.js
│   ├── initialdata.json
│   ├── table.css
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   └── reportWebVitals.js
├── package.json
├── package-lock.json
```

---
## 🎥 Demo Video  
▶️ [Watch Demo on YouTube](https://www.youtube.com/) 
---
## 📄 License  
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).


