import { configureStore } from "@reduxjs/toolkit";
import navbarReducer, { resetState } from "../slice/NavbarValues";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // This imports Local Storage
import SelectedRowReducer from '../slice/accessControlEditUser'
import SelectedStockReducer from '../slice/stockEdit'
import ShortcutSlice from '../slice/handleshortcuts'
import ToggleButton from "../slice/handleToggle";
import AuthSlice from '../slice/authSlice'
import PartData from '../slice/sparePart'
import Lines from '../slice/productionLines'

const persistConfig = {
  key: "root", // This is the key used to store the data in Local Storage
  storage,
  blacklist: ["resetState"],
};

const persistedReducer = persistReducer(persistConfig, navbarReducer);

const store = configureStore({
  reducer: {
    value: persistedReducer,
    selectedRow: SelectedRowReducer,
    selectedStock: SelectedStockReducer,
    shortcuts: ShortcutSlice,
    toggle: ToggleButton,
    auth: AuthSlice,
    partData: PartData,
    lineData:Lines
  },
});

store.dispatch(resetState());

export const persistor = persistStore(store); // This is used to rehydrate the store

export default store;
