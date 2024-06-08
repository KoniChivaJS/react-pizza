import axios from "axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: number;
  size: number;
  count: number;
};

type fetchPizzasType = {
  category: string;
  sort: string;
  Desc: string;
  search: string;
  currentPage: number;
};

interface PizzaSliceState {
  items: Pizza[];
  status: "loading" | "success" | "error";
}

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async ({ category, sort, Desc, search, currentPage }: fetchPizzasType) => {
    const { data } = await axios.get<Pizza[]>(
      `https://65c7cc54e7c384aada6ef7f5.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=${Desc}${search}`
    );
    return data as Pizza[];
  }
);

const initialState: PizzaSliceState = {
  items: [],
  status: "loading", //loading | success | error
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
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
export const selectPizza = (state: RootState) => state.pizza;
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
