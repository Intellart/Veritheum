import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import Footer from '../Footer/Footer';
import { actions } from '../../../store/userStore';
import Logo from '../../../assets/graphics/veritheum_logo_cb.png';
import FormLogo from '../../../assets/logo/veritheum_logo_only.svg';
import './session_pages.scss';

type Props = {
  dispatch: Function,
}

type State = {
  showPassword: boolean,
}

class Signin extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }

  loginUser(e: Event) {
    e.preventDefault();
    this.props.dispatch(actions.loginUser('test2@thespian.hr'));
  }

  togglePasswordVisibility() {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  render () {
    const { showPassword } = this.state;
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
              <h1><b>Create and sell</b><br />your own unique <b>osNFTs</b></h1>
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
                      <input placeholder="Please input your password" type={showPassword ? 'text' : 'password'} />
                      {showPassword ? <IoEye onClick={this.togglePasswordVisibility.bind(this)} /> : <IoEyeOff onClick={this.togglePasswordVisibility.bind(this)} />}
                    </div>
                  </div>
                  <div className="forgot-password-wrapper">
                    <Link to="/">Forgot password?</Link>
                  </div>
                  <button onClick={this.loginUser.bind(this)}>
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
}

export default connect()(Signin);
