import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserContextProvider from './context/UserContextProvider.jsx'
import PostContext from './context/PostContext.jsx'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from "./redux/store.js";
import { Toaster } from "react-hot-toast"

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <PostContext>
      <UserContextProvider >
        <React.StrictMode>
          <ReduxProvider store={store}>
            <App />
          </ReduxProvider>
        </React.StrictMode>
      </UserContextProvider>
    </PostContext>
    <Toaster />
  </>
)
