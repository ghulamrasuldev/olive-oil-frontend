import { createSlice } from '@reduxjs/toolkit';

const LinesSlice = createSlice({
  name: 'partData',
  initialState: { linesData:[] },
  reducers: {
    setLinesData: (state, action) => {
      state.linesData = action.payload;
    },
  },
});

export const { setLinesData } = LinesSlice.actions;

export default LinesSlice.reducer;
