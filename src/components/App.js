// @flow
import React from 'react';
import type { Node } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { isEmpty, isEqual } from 'lodash';
import Home from './App/Pages/Home';
import Gallery from './App/Pages/Gallery';
import Navigation from './App/Navigation/Navigation';
import Signin from './App/Pages/Signin';
import Register from './App/Pages/Register';
import Profile from './App/Pages/Profile';
import CatchAllRoute from './App/Pages/CatchAllRoute';
import { selectors } from '../store/userStore';
import 'react-toastify/dist/ReactToastify.min.css';

function App(): Node {
  const isAuthorized: boolean = useSelector((state) => !isEmpty(selectors.getUser(state)), isEqual);

  return (
    <Router>
      <ToastContainer />
      <Navigation isAuthorized={isAuthorized} />
      <div className="main-content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/register" element={<Register />} />
          {!isAuthorized && <Route path="/sign_in" element={<Signin />} />}
          {isAuthorized && <Route path="/profile" element={<Profile />} />}
          <Route path="*" element={<CatchAllRoute isAuthorized={isAuthorized} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
