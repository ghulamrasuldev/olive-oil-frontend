// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  phoneNumber: '', 
  reload: false,
  reloadOrder:false,
  reloadOrderBill: false,
  reloadProductTable:false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser: (state) => {
      state.isAuthenticated = true;
    },
    notAuthenticateUser: (state) => {
      state.isAuthenticated = false;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload; 
    },
    clearPhoneNumber: (state) => {
      state.phoneNumber = ''; 
    },
    setReload: (state,action) => {
      state.reload = action.payload;
    },
    ReloadOrder: (state,action) => {
      state.reloadOrder = action.payload;
    },
    ReloadOrderBill: (state,action) => {
      state.reloadOrderBill = action.payload;
    },
    ReloadProductTable: (state,action) => {
      state.reloadProductTable = action.payload;
    }
  },
});

export const {
  notAuthenticateUser,
  authenticateUser,
  setPhoneNumber, 
  clearPhoneNumber, 
  setReload,
  ReloadOrder,
  ReloadOrderBill,
  ReloadProductTable
} = authSlice.actions;

export default authSlice.reducer;
