import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchUsdToInrRateApi } from './currencyApi'

const CURRENCY_STORAGE_KEY = 'novacart-usd-inr-rate'

function loadSavedRate() {
  try {
    const savedRate = localStorage.getItem(CURRENCY_STORAGE_KEY)
    return savedRate ? JSON.parse(savedRate) : null
  } catch {
    return null
  }
}

function saveRate(rateData) {
  try {
    localStorage.setItem(CURRENCY_STORAGE_KEY, JSON.stringify(rateData))
  } catch {
    // Local storage can be unavailable in restricted browsing modes.
  }
}

const savedRate = loadSavedRate()

export const fetchUsdToInrRate = createAsyncThunk(
  'currency/fetchUsdToInrRate',
  async () => fetchUsdToInrRateApi(),
)

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    usdToInrRate: savedRate?.rate ?? null,
    updatedAt: savedRate?.date ?? null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsdToInrRate.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchUsdToInrRate.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.usdToInrRate = action.payload.rate
        state.updatedAt = action.payload.date
        saveRate(action.payload)
      })
      .addCase(fetchUsdToInrRate.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const selectUsdToInrRate = (state) => state.currency.usdToInrRate
export const selectCurrencyStatus = (state) => state.currency.status
export const selectCurrencyUpdatedAt = (state) => state.currency.updatedAt

export default currencySlice.reducer
