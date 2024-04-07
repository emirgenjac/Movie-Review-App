import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes, Navigate} from 'react-router-dom'
import AuthenticationPage from './components/AuthenticationPage';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Reviews from './components/Reviews';
import Watchlist from './components/Watchlist';

import './App.css';
import { AppProvider } from './components/AppContext';


function App() {
  return (
    <AppProvider>
    <Router>
      <Routes>
        <Route path="/" element={<AuthenticationPage />} exact/>
        <Route path='/register' element={<Register />} exact/>
        <Route path='/login' element={<Login />} exact/>
        <Route path='/home' element={<Home />} exact/>
        <Route path='/watchlist' element={<Watchlist />} exact/>
        <Route path='/reviews' element={<Reviews />} exact/>
        {/* Nakon sto dodas USERE promijeni path u /:uid/...*/}
        <Route path='/*' element={<Navigate to="/"/>}/> 

      </Routes>
    </Router>
    </AppProvider>
  )
}

export default App;
