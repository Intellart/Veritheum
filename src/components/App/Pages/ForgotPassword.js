// @flow
import React from 'react';
import Footer from '../Footer/Footer';
import Logo from '../../../assets/graphics/veritheum_logo_cb.png';
import FormLogo from '../../../assets/logo/veritheum_logo_only.svg';
import './session_pages.scss';

type State = {
  email: string,
}

class ForgotPassword extends React.Component<{}, State> {
  constructor() {
    super();
    this.state = {
      email: '',
    };
  }

  render () {
    const { email } = this.state;
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
        <div className="forgot-password-page">
          <div className="content-wrapper">
            <div className="column">
              <div className="form-wrapper">
                <div className="form-logo-wrapper">
                  <img src={FormLogo} alt="Veritheum logo" />
                </div>
                <div className="form-header">
                  Forgot password?
                </div>
                <div className="form-subheader">
                  No worries! Input your email and we will send you a link to reset your password.
                </div>
                <form>
                  <div className="input-wrapper">
                    <label htmlFor="forgot-email-input">Email</label>
                    <input
                      id="forgot-email-input"
                      autoComplete="email"
                      placeholder="Please input your email"
                      value={email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </div>
                  <button>
                    Reset password
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

export default (ForgotPassword: React$ComponentType<{}>);
