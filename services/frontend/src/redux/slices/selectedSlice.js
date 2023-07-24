import { createSlice } from "@reduxjs/toolkit";

const selectedSlice = createSlice({
  name: "selected",
  initialState: {
    selectedDate: [],
    selectedBlock: null,
  },
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSelectedBlock: (state, action) => {
      state.selectedBlock = action.payload;
    },
  },
});

export const { setSelectedDate, setSelectedBlock } = selectedSlice.actions;
export default selectedSlice.reducer;
