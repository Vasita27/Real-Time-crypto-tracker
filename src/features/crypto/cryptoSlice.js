import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  assets: {},
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setCryptoData: (state, action) => {
      console.log("Setting crypto data:", action.payload);
      const { symbol, data } = action.payload;
      state.assets[symbol] = data;
    },
    updateAssets: (state, action) => {
      // Logic to update the asset data if necessary
    }
  }
});

export const { setCryptoData, updateAssets } = cryptoSlice.actions;

// Create a selector to select assets from the store
export const selectAssets = (state) => state.crypto.assets;

export default cryptoSlice.reducer;
