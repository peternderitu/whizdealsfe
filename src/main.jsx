import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { productsApi } from './redux/features/apiSlice.js'
import { Toaster } from "@/components/ui/toaster"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ApiProvider api={productsApi}> */}
        <App />
        <Toaster />
      {/* </ApiProvider> */}
    </Provider>
  </React.StrictMode>,
)
