import { createSlice } from '@reduxjs/toolkit';

const partDataSlice = createSlice({
  name: 'partData',
  initialState: { partData:[] },
  reducers: {
    setPartData: (state, action) => {
      state.partData = action.payload;
    },
  },
});

export const { setPartData } = partDataSlice.actions;

export default partDataSlice.reducer;
