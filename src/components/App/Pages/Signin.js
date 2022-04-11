import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { IoEye, IoEyeOff } from "react-icons/io5";
import Logo from '../../../assets/graphics/veritheum_logo_cb.png';
import FormLogo from '../../../assets/logo/veritheum_logo_only.svg';
import './session_pages.scss';

class Signin extends React.Component {
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
        <div className="signin-page">
          <div className="content-wrapper">
            <div className="column">
              <h1><b>Create and sell</b><br/>your own unique <b>osNFTs</b></h1>
              <h3>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</h3>
            </div>
            <div className="column">
              <div className="form-wrapper">
                <div className="form-logo-wrapper">
                  <img src={FormLogo} alt="Veritheum logo" />
                </div>
                <div className="form-header">
                  Sign in
                </div>
                <form>
                  <div className="input-wrapper">
                    <label>Email</label>
                    <input placeholder="Please input your email" />
                  </div>
                  <div className="input-wrapper">
                    <label>Password</label>
                    <div className="password-field-wrapper">
                      <input placeholder="Please input your password" />
                      <IoEyeOff />
                    </div>
                  </div>
                  <div className="forgot-password-wrapper">
                    <Link to="/">Forgot password?</Link>
                  </div>
                  <button>
                    Login
                  </button>
                </form>
                <div className="form-footer">
                  Don’t have an account?
                  &nbsp;
                  <Link to="/register">Register</Link>
                </div>
              </div>
            </div>
            {graphics}
          </div>
        </div>
        <Footer />
      </>
    );
  }
};

export default Signin;