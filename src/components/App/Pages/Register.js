import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { MdChevronRight } from 'react-icons/md';
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
  first_name: string,
  last_name: string,
  showPassword: boolean,
}

class Register extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      showPassword: false,
    };
  }

  registerUser(e: Event) {
    e.preventDefault();
    this.props.dispatch(actions.registerUser({
      email: this.state.email,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
    }));
  }

  togglePasswordVisibility() {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  render () {
    const {
      email, password, first_name, last_name, showPassword,
    } = this.state;
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
        <div className="register-page">
          <div className="content-wrapper">
            <div className="column negative-margin">
              <h1><b>Start creating</b><br />your <b>osNFTs</b> today</h1>
              <h3>Follow these steps in order to start minting your creations:</h3>
              <div className="minting-instructions-steps">
                <div className="item">
                  <div className="item-number">1</div>
                  <div className="item-description">Create your Veritheum account</div>
                </div>
                <div className="item">
                  <div className="item-number">2</div>
                  <div className="item-description">Add your work</div>
                </div>
                <div className="item">
                  <div className="item-number">3</div>
                  <div className="item-description">Release it to the world</div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="form-wrapper">
                <div className="form-logo-wrapper">
                  <img src={FormLogo} alt="Veritheum logo" />
                </div>
                <div className="form-header">
                  Register
                </div>
                <form>
                  <div className="input-wrapper">
                    <label>First name</label>
                    <input
                      placeholder="Please input your first name"
                      value={first_name}
                      onChange={(e) => this.setState({ first_name: e.target.value })}
                    />
                  </div>
                  <div className="input-wrapper">
                    <label>Last name</label>
                    <input
                      placeholder="Please input your last name"
                      value={last_name}
                      onChange={(e) => this.setState({ last_name: e.target.value })}
                    />
                  </div>
                  <div className="input-wrapper">
                    <label>Field of study</label>
                    <div className="selectbox-wrapper">
                      <div className="selected">
                        None
                      </div>
                      <MdChevronRight />
                    </div>
                  </div>
                  <div className="input-wrapper">
                    <label>Email</label>
                    <input
                      placeholder="Please input your email"
                      value={email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </div>
                  <div className="input-wrapper">
                    <label>Password</label>
                    <div className="password-field-wrapper">
                      <input
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
                  <div className="input-wrapper">
                    <label>Confirm password</label>
                    <div className="password-field-wrapper">
                      <input placeholder="Please confirm your password" />
                    </div>
                  </div>
                  <button onClick={(e) => this.registerUser(e)}>
                    Register
                  </button>
                </form>
                <div className="form-footer">
                  Already have an account?
                  &nbsp;
                  <Link to="/sign_in">Sign in</Link>
                </div>
              </div>
              <div className="form-notice">
                <div className="form-notice-content-wrapper">
                  By creating an account you agree to our <span>Terms and Conditions</span> and <span>Data Protection Guidelines</span>.
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

export default connect()(Register);
