// import { useState } from 'react'
// import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, BrowserRouter } from 'react-router-dom'
import AppRouter from './AppRouter'

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
<BrowserRouter>
  <AppRouter />
</BrowserRouter>
  );
}

export default App
