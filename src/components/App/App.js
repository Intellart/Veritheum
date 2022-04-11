import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Gallery from './Pages/Gallery';
import Navigation from './Navigation/Navigation';
import Signin from './Pages/Signin';
import Register from './Pages/Register';
import Profile from './Pages/Profile';

export const App = () => {
  return (
    <Router>
      <Navigation />
      <div className="main-content">
        <Routes>
          <Route exact path="/" element={
            <Home />
          } />
          <Route path="/gallery" element={
            <Gallery />
          } />
          <Route path="/sign_in" element={
            <Signin />
          } />
          <Route path="/register" element={
            <Register />
          } />
          <Route path="/profile" element={
            <Profile />
          } />
        </Routes>
      </div>
    </Router>
  );
};
