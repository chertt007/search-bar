import { createSlice } from "@reduxjs/toolkit";
import { db } from "../Data";
export const searchBarSlice = createSlice({
  name: "searchBar",
  initialState: {
    data: db,
    query: "",
    filteredData: [],
    selectedItem: null,
    offeredSelectedItems: [],
    history: [],
    isDropDownOpen: false
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
      if (state.filteredData.length > 0) {
        state.isDropDownOpen = true;
      } else {
        state.isDropDownOpen = false;
      }
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
      state.isDropDownOpen = false;
    },
    setOfferedItems: (state, action) => {
      state.offeredSelectedItems = action.payload;
    },
    saveInHistory: (state, action) => {
      state.history = [...state.history, action.payload];
    },
    removeFromHistory: (state, action) => {
      state.history = state.history.filter(
        (historyItem) => historyItem.title !== action.payload.title
      );
    },
    setIsDropDownOpen: (state, action) => {
      state.isDropDownOpen = action.payload;
    }
  }
});

export const {
  setQuery,
  setFilteredData,
  setSelectedItem,
  setOfferedItems,
  saveInHistory,
  setIsDropDownOpen,
  removeFromHistory
} = searchBarSlice.actions;

export default searchBarSlice.reducer;
