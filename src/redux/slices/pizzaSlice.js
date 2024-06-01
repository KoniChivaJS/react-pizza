import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async ({ category, sort, Desc, search, currentPage }) => {
    const { data } = await axios.get(
      `https://65c7cc54e7c384aada6ef7f5.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=${Desc}${search}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", //loading | success | error
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
