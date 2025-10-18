'use client'

import { store } from "@/redux/store"
import { SessionProvider } from "next-auth/react"
import { Provider } from "react-redux"
// import { Provider } from "react-redux"
// import { store } from "@/store"

export default function Providers({ children }) {
  return (
    <Provider store={store}>
    <SessionProvider>
      {/* <Provider store={store}> */}
        {children}
      {/* </Provider> */}
      
    </SessionProvider>
    </Provider>
  )
}
