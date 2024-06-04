import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  pageCount: 1,
  sort: {
    name: "популярністю",
    sortProperty: "rating",
  },
  isDesc: true,
  search: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
    setFilters(state, action) {
      state.pageCount = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sortProperty;
      state.isDesc = action.payload.isDesc;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
});
export const selectSearch = (state) => state.filter.search;
export const selectSort = (state) => state.filter.sort;
export const selectCategory = (state) => state.filter.categoryId;
export const selectPage = (state) => state.filter.pageCount;
export const { setCategoryId, setSort, setPageCount, setFilters, setSearch } =
  filterSlice.actions;
export default filterSlice.reducer;
