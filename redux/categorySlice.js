import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductsSort } from "@/lib/Getproduct";

// Fetch products for a given category + query string
export const fetchCategoryProducts = createAsyncThunk(
  "categories/fetchCategoryProducts",
  async ({ categorieName, queryString }, { rejectWithValue }) => {
    try {
      console.log(categorieName);
      
      const res = await getProductsSort(queryString, categorieName, "category");
      console.log(res.data);
      
      return { categorieName, products: res?.data?.products || [] };
    } catch (error) {
      return rejectWithValue({ categorieName, error: "Failed to fetch products" });
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    productsByCategory: {}, // cache per category
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        const { categorieName, products } = action.payload;
        state.productsByCategory[categorieName] = products;
        state.loading = false;
      })
      .addCase(fetchCategoryProducts.rejected, (state, action) => {
        const { categorieName } = action.payload;
        state.productsByCategory[categorieName] = [];
        state.loading = false;
      });
  },
});

export default categorySlice.reducer;
