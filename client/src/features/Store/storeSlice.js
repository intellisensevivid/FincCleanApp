import { createSlice } from "@reduxjs/toolkit";

const storeSlice = createSlice({
  name: "store",
  initialState: {
    selectedTab: "order",
    selectedSection: "",
  },
  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    setSelectedSection: (state, action) => {
      state.selectedSection = action.payload;
    },
  },
});

export const { setSelectedTab, setSelectedSection } = storeSlice.actions;

export default storeSlice.reducer;
