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
import MarketPlace from './App/MarketPlace/MarketPlace';
import Navigation from './App/Navigation/Navigation';
import Signin from './App/Pages/Signin';
import AdminSignin from './App/Pages/AdminSignin';
import Register from './App/Pages/Register';
import ForgotPassword from './App/Pages/ForgotPassword';
import Profile from './App/Pages/Profile';
import ProfileSettings from './App/Pages/ProfileSettings/ProfileSettings';
import MintingPage from './App/Pages/MintingPage';
import TermsOfUse from './App/Pages/TermsOfUse';
import CookiePolicy from './App/Pages/CookiePolicy';
import PrivacyPolicy from './App/Pages/PrivacyPolicy';
import WalletPage from './App/Pages/WalletPage';
import AdminPage from './App/AdminPage/AdminPage';
import CatchAllRoute from './App/Pages/CatchAllRoute';
import ScrollToTop from './App/ScrollToTop/ScrollToTop';
import Loader from './App/Loader/Loader';
import WebSocketElement from './App/WebSocket/WebSocketElement';
import { selectors as userSelectors } from '../store/userStore';
import { selectors as globalSelectors } from '../store/globalStore';
import 'react-toastify/dist/ReactToastify.min.css';
import '../styles/index.scss';

function App(): Node {
  const isAuthorized: boolean = useSelector((state) => !isEmpty(userSelectors.getUser(state)), isEqual);
  const isAdmin: boolean = useSelector((state) => !isEmpty(userSelectors.getAdmin(state)), isEqual);
  const isLoading = useSelector(globalSelectors.checkIsLoading, isEqual);

  return (
    <Router>
      {isLoading && <Loader />}
      <WebSocketElement />
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
          <Route index element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {!isAuthorized && <Route path="/sign_in" element={<Signin />} />}
          {!isAdmin && <Route path="/admin" element={<AdminSignin />} />}

          {<Route path='/admin-page' element={<AdminPage />} />}
          {isAuthorized && (
            <>
              <Route path="/wallet-page" element={<WalletPage />} />
              <Route path="/minting-page" element={<MintingPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<ProfileSettings />} />
            </>
          )}
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<CatchAllRoute isAuthorized={isAuthorized} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
