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
import ProfileSettings from './App/Pages/ProfileSettings/ProfileSettings';
import MintingPage from './App/Pages/MintingPage';
import TermsOfUse from './App/Pages/TermsOfUse';
import CookiePolicy from './App/Pages/CookiePolicy';
import PrivacyPolicy from './App/Pages/PrivacyPolicy';
import CatchAllRoute from './App/Pages/CatchAllRoute';
import ScrollToTop from './App/ScrollToTop/ScrollToTop';
import { selectors } from '../store/userStore';
import 'react-toastify/dist/ReactToastify.min.css';

function App(): Node {
  const isAuthorized: boolean = useSelector((state) => !isEmpty(selectors.getUser(state)), isEqual);

  return (
    <Router>
      <ToastContainer
        closeOnClick
        newestOnTop={false}
        pauseOnHover
        position="bottom-left"
        rtl={false}
      />
      <ScrollToTop />
      <Navigation isAuthorized={isAuthorized} />
      <div className="main-content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/register" element={<Register />} />
          <Route path="/minting-page" element={<MintingPage />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {!isAuthorized && <Route path="/sign_in" element={<Signin />} />}
          {isAuthorized && <Route path="/profile" element={<Profile />} />}
          {isAuthorized && <Route path="/settings" element={<ProfileSettings />} />}
          <Route path="*" element={<CatchAllRoute isAuthorized={isAuthorized} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
