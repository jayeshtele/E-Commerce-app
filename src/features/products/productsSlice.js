import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  fetchCategoriesApi,
  fetchProductByIdApi,
  fetchProductsApi,
} from './productsApi'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const data = await fetchProductsApi()
    return data.products
  },
)

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId) => fetchProductByIdApi(productId),
)

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => fetchCategoriesApi(),
)

const initialState = {
  items: [],
  categories: [],
  featuredProduct: null,
  selectedProduct: null,
  status: 'idle',
  categoryStatus: 'idle',
  selectedStatus: 'idle',
  error: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
        state.featuredProduct =
          action.payload.find((product) => product.rating >= 4.9) ??
          action.payload[0] ??
          null
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchCategories.pending, (state) => {
        state.categoryStatus = 'loading'
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoryStatus = 'succeeded'
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoryStatus = 'failed'
      })
      .addCase(fetchProductById.pending, (state) => {
        state.selectedStatus = 'loading'
        state.selectedProduct = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedStatus = 'succeeded'
        state.selectedProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.selectedStatus = 'failed'
        state.error = action.error.message
      })
  },
})

export default productsSlice.reducer
