import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../../assets/graphics/veritheum_logo_cb.png';
import Footer from '../../Footer/Footer';
import './NotFound.scss';

class NotFound extends React.Component {
  render () {
    const graphics = (
      <div className="graphics-wrapper">
        <div className="logo-graphic left"><img src={Logo} alt="Veritheum logo" /></div>
        <div className="logo-graphic right"><img src={Logo} alt="Veritheum logo" /></div>
        <div className="circle-graphic gr-1" />
        <div className="circle-graphic gr-2" />
        <div className="circle-graphic gr-3" />
        <div className="circle-graphic gr-4" />
      </div>
    );

    return (
      <>
        <div className="not-found-wrapper">
          <div className="not-found-content">
            <h2>404</h2>
            <h3>Page not found</h3>
            <p>The page you requested could not be found.<br />Let's get you back on track!</p>
            <Link to="/">Return Home</Link>
          </div>
          {graphics}
        </div>
        <Footer />
      </>
    );
  }
}

export default NotFound;
