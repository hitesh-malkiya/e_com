"use client"

import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import categoryReducer from "./categorySlice"

export const store = configureStore({
  reducer: {
    category: categoryReducer,
  },
})

export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector


