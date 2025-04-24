// src/features/crypto/cryptoSlice.js
import { createSlice } from '@reduxjs/toolkit';
import data from './initialdata.json';

const initialState = {
  assets: data,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateAssets: (state) => {
      state.assets = state.assets.map(asset => {
        // Simulate slight changes
        const change = (min, max) => +(Math.random() * (max - min) + min).toFixed(2);
        const sign = () => (Math.random() > 0.5 ? 1 : -1);

        const newPrice = +(asset.price + sign() * change(0.1, 3)).toFixed(2);
        const new1h = +(asset.percent_change_1h + sign() * change(0.1, 1)).toFixed(2);
        const new24h = +(asset.percent_change_24h + sign() * change(0.1, 1)).toFixed(2);
        const new7d = +(asset.percent_change_7d + sign() * change(0.1, 2)).toFixed(2);
        const newVol = asset.volume_24h + sign() * change(10000000, 100000000);

        return {
          ...asset,
          price: newPrice,
          percent_change_1h: new1h,
          percent_change_24h: new24h,
          percent_change_7d: new7d,
          volume_24h: Math.max(newVol, 0)
        };
      });
    },
  },
});

export const { updateAssets } = cryptoSlice.actions;
export const selectAssets = state => state.crypto.assets;
export default cryptoSlice.reducer;
