import { createSlice } from '@reduxjs/toolkit';

const partDataSlice = createSlice({
  name: 'partData',
  initialState: { partData:[],sellableParts:[] },
  reducers: {
    setPartData: (state, action) => {
      state.partData = action.payload;
    },
    setSellableParts: (state, action) => {
      state.sellableParts = action.payload;
    },
  },
});

export const { setPartData,setSellableParts } = partDataSlice.actions;

export default partDataSlice.reducer;
