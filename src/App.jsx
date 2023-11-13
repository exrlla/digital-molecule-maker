// import { useState } from 'react'
// import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './AppRouter'

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import io from 'socket.io-client';

const socket = io.connect(`http://localhost:${4000}`);

function App() {

  return (
<BrowserRouter >
  <AppRouter socket={socket}/>
</BrowserRouter>
  );
}

export default App
