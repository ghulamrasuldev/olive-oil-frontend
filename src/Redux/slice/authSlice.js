// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  phoneNumber: '', 
  reload: false,
  reloadOrder:false,
  reloadOrderBill: false,
  reloadProductTable:false,
  reloadEmployeeTable: false,
  employeeData: [],
  linesData:false
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
    },
    ReloadEmployeeTable: (state,action) => {
      state.reloadEmployeeTable = action.payload;
    },
    EmployeeData: (state,action) => {
      state.employeeData = action.payload;
    },
    LinesData: (state,action) => {
      state.linesData = action.payload;
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
  ReloadProductTable,
  ReloadEmployeeTable,
  EmployeeData,
  LinesData
} = authSlice.actions;

export default authSlice.reducer;
