import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/main.css'
import Layout from './components/Layout.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/recipe-app">
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<App/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
