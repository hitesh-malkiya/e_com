"use client"

import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE = {
  selectedCategory: null,
}

const categorySlice = createSlice({
  name: "category",
  initialState: INITIAL_STATE,
  reducers: {
    setCategory(state, action) {
      state.selectedCategory = action.payload || null
    },
    clearCategory(state) {
      state.selectedCategory = null
    },
  },
})

export const { setCategory, clearCategory } = categorySlice.actions
export default categorySlice.reducer


