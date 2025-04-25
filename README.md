# 📈 Crypto Tracker Dashboard

A real-time cryptocurrency dashboard that tracks prices, trends, and other key financial metrics for top cryptocurrencies like Bitcoin, Ethereum, Solana, and more. This app updates live using WebSocket for price, volume 24h change and 24-hour change, with simulated data for other metrics while making sure that circulating supply, max_supply and market capital donot change every one or two seconds (as problem statement mentioned 2 second change in percent changes, price and 24h volume only).

---

## 🔧 Tech Stack

| Layer             | Technology                                          |
|------------------|------------------------------------------------------|
| Frontend         | **React.js** with functional components + hooks     |
| State management  | Redux |
| Styling          | CSS (`table.css`)                           |
| Live Data        | Binance WebSocket API (`wss://stream.binance.com`)  |
| Icons ( Logos )    | Freepik CDN PNGs                        |
| Chart images          | Sparkline charts from CoinGecko  (static)                   |


---

## Architecture  
The Crypto Tracker Dashboard is built as a single-page application (SPA) using React.js, ensuring a fast and seamless user experience without page reloads. It leverages the Binance WebSocket API for real-time cryptocurrency price updates,24h volume change and 24-hour change data, maintaining a continuous connection for live streaming. Other financial metrics like 1-hour/7-day changes simulated using JavaScript intervals to mimic dynamic behavior. Other features are simulated using random function too but they donot change every 2seconds as it is not mentioned in the problem statement. We can change that as well by including it in the dispatch function along with random function instead of static random mock data. The component-based architecture promotes modularity, with each UI segment—like the price table and sparkline charts—managed independently. This makes the application highly scalable, maintainable, and easy to extend with new features or additional cryptocurrencies.

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
|   |       └── table.css 
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   └── reportWebVitals.js
|   ├── styles.css
├── package.json
├── package-lock.json
```

---
## 🎥 Demo Video  
▶️ [Watch Demo on YouTube](https://youtu.be/UBA3lV7wdSI) 
---
## 📄 License  
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).


