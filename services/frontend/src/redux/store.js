import { configureStore } from "@reduxjs/toolkit";
import selectedReducer from "./slices/selectedSlice";

const store = configureStore({
  reducer: {
    selected: selectedReducer,
  },
});

export default store;
