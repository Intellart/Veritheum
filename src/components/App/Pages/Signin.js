// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { some, isEmpty } from 'lodash';
import Footer from '../Footer/Footer';
import { actions } from '../../../store/userStore';
import { orcidOAuthLink } from '../../../utils';
import Logo from '../../../assets/graphics/veritheum_logo_cb.png';
import FormLogo from '../../../assets/logo/veritheum_logo_only.svg';
import ORCIDiDLogo from '../../../assets/logo/ORCIDiD_logo.svg';
import './session_pages.scss';

type Props = {
  dispatch: Function,
}

type State = {
  email: string,
  password: string,
  showPassword: boolean,
}

class Signin extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false,
    };
  }

  loginUser() {
    this.props.dispatch(actions.loginUser({ email: this.state.email, password: this.state.password }));
  }

  handleORCID() {
    window.location.assign(orcidOAuthLink(window.location.pathname));
  }

  togglePasswordVisibility() {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  componentDidMount() {
    const code = new URL(window.location.href).searchParams.get('code');
    if (!isEmpty(code) && code) {
      window.history.replaceState({}, document.title, window.location.pathname);
      this.props.dispatch(actions.loginUserORCID({
        code,
        redirect_uri: window.location.origin + window.location.pathname,
      }));
      // this.props.dispatch(actions.loginUserORCID('0000-0001-9349-4019'));
    }
  }

  render () {
    const { email, password, showPassword } = this.state;
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
              <h3>Own your data. Own your money. Own your intellect. Share your knowledge freely through your very own Open Science NFT.</h3>
            </div>
            <div className="column">
              <div className="form-wrapper">
                <div className="form-logo-wrapper">
                  <img src={FormLogo} alt="Veritheum logo" />
                </div>
                <div className="form-header">
                  Sign in
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="input-wrapper">
                    <label htmlFor="signin-email-input">Email</label>
                    <input
                      id="signin-email-input"
                      autoComplete="email"
                      placeholder="Please input your email"
                      value={email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="signin-password-input">Password</label>
                    <div className="password-field-wrapper">
                      <input
                        id="signin-password-input"
                        autoComplete="password"
                        placeholder="Please input your password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                      />
                      {showPassword ? (
                        <IoEye onClick={() => this.togglePasswordVisibility()} />
                      ) : (
                        <IoEyeOff onClick={() => this.togglePasswordVisibility()} />
                      )}
                    </div>
                  </div>
                  <div className="forgot-password-wrapper">
                    <Link to="/">Forgot password?</Link>
                  </div>
                  <button onClick={() => this.loginUser()} disabled={some([email, password], isEmpty)}>
                    Login
                  </button>
                  <button className="orcid-button" onClick={() => this.handleORCID()}>
                    <img src={ORCIDiDLogo} alt="orcid-logo" />
                    Login with ORCID
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

export default (connect()(Signin): React$ComponentType<{}>);
