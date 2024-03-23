import { createSlice } from "@reduxjs/toolkit";
import { Tabs } from "../config/tabs";

const initialState = {
  activeTab: Tabs.default,
};

const indexSlice = createSlice({
  name: "index",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = indexSlice.actions;
export default indexSlice.reducer;
