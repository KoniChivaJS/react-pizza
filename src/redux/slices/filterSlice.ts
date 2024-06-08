import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TSort = {
  name: string;
  sortProperty: "rating" | "title" | "price";
};
type Filters = {
  currentPage: number;
  categoryId: number;
  sortProperty: TSort;
  isDesc: boolean;
};
interface FilterSliceState {
  categoryId: number;
  pageCount: number;
  sort: TSort;
  isDesc: boolean;
  search: string;
}

const initialState: FilterSliceState = {
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
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<TSort>) {
      state.sort = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
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
export const selectSearch = (state: RootState) => state.filter.search;
export const selectSort = (state: RootState) => state.filter.sort;
export const selectCategory = (state: RootState) => state.filter.categoryId;
export const selectPage = (state: RootState) => state.filter.pageCount;
export const { setCategoryId, setSort, setPageCount, setFilters, setSearch } =
  filterSlice.actions;
export default filterSlice.reducer;
