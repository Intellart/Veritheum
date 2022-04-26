// @flow
import React from 'react';
import type { Node } from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './App/Pages/Home';
import Gallery from './App/Pages/Gallery';
import Navigation from './App/Navigation/Navigation';
import Signin from './App/Pages/Signin';
import Register from './App/Pages/Register';
import Profile from './App/Pages/Profile';
import MintingPage from './App/Pages/MintingPage';
import 'react-toastify/dist/ReactToastify.min.css';

function App(): Node {
  return (
    <Router>
      <ToastContainer />
      <Navigation />
      <div className="main-content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/sign_in" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/minting-page" element={<MintingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
