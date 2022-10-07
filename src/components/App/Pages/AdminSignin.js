// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { some, isEmpty } from 'lodash';
import Footer from '../Footer/Footer';
import { actions } from '../../../store/userStore';
import Logo from '../../../assets/graphics/veritheum_logo_cb.png';
import FormLogo from '../../../assets/logo/veritheum_logo_only.svg';
import './session_pages.scss';

type Props = {
  dispatch: Function,
}

type State = {
  email: string,
  password: string,
  showPassword: boolean,
}

class AdminSignin extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false,
    };
  }

  loginAdmin() {
    this.props.dispatch(actions.loginAdmin({ email: this.state.email, password: this.state.password }));
  }

  togglePasswordVisibility() {
    this.setState({
      showPassword: !this.state.showPassword,
    });
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
              <div className="form-wrapper">
                <div className="form-logo-wrapper">
                  <img src={FormLogo} alt="Veritheum logo" />
                </div>
                <div className="form-header">
                  Admin Sign in
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
                  <button onClick={() => this.loginAdmin()} disabled={some([email, password], isEmpty)}>
                    Login
                  </button>
                </form>
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

export default (connect()(AdminSignin): React$ComponentType<{}>);
