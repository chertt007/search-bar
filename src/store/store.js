import { configureStore } from "@reduxjs/toolkit";
import searchBarReducer from "../store/searchBarSlice";
export default configureStore({
  reducer: {
    searchBarReducer
  }
});
