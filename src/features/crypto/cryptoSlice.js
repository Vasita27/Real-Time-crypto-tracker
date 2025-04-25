import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  assets: {},
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setCryptoData: (state, action) => {
      const { symbol, data } = action.payload;
      state.assets[symbol] = data;
    },
  }
});

export const { setCryptoData } = cryptoSlice.actions;

// Create a selector to select assets from the store
export const selectAssets = (state) => state.crypto.assets;

export default cryptoSlice.reducer;
