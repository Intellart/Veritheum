import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/graphics/veritheum_logo_cb.png';
import './HeroCta.scss';

class HeroCta extends React.Component {
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
      <div className="hero-cta">
        <div className="hero-cta-content-wrapper">
          <h1><b>Create and sell</b><br/>your own unique <b>osNFTs</b></h1>
          <h3>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</h3>
          <div className="hero-btns-wrapper">
            <Link to="/gallery" className="full">Explore</Link>
            <Link to="/gallery" className="outline">Create</Link>
          </div>
        </div>
        {graphics}
      </div>
    );
  }
};

export default HeroCta;