// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import {
  some, isEmpty, get, isEqual,
} from 'lodash';
import Selectbox from '../Selectbox/Selectbox';
import Footer from '../Footer/Footer';
import { actions as userActions, selectors as orcidSelectors } from '../../../store/userStore';
import { actions as studyFieldActions, selectors as studyFieldsSelectors, StudyField } from '../../../store/studyFieldsStore';
import { orcidOAuthLink } from '../../../utils';
import Logo from '../../../assets/graphics/veritheum_logo_cb.png';
import FormLogo from '../../../assets/logo/veritheum_logo_only.svg';
import ORCIDiDLogo from '../../../assets/logo/ORCIDiD_logo.svg';
import './session_pages.scss';

type Props = {
  dispatch: Function,
  orcidAccount: Object,
  studyFields: Array<StudyField>,
}

type State = {
  email: string,
  password: string,
  confirmPassword: string,
  firstName: string,
  lastName: string,
  fieldOfStudy: string|null,
  orcidId: string|null,
  showPassword: boolean,
}

class Register extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      fieldOfStudy: null,
      showPassword: false,
      orcidId: null,
    };
  }

  registerUser() {
    const {
      email, password, firstName, lastName, fieldOfStudy, orcidId,
    } = this.state;
    let additionalInfo = {};
    if (fieldOfStudy) additionalInfo = { ...additionalInfo, ...{ study_field_id: fieldOfStudy } };
    if (orcidId) additionalInfo = { ...additionalInfo, ...{ orcid_id: orcidId } };

    this.props.dispatch(userActions.registerUser({
      ...additionalInfo,
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    }));
  }

  togglePasswordVisibility() {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  onOptionSelect = (value) => {
    this.setState({ fieldOfStudy: value });
  };

  handleORCID() {
    window.location.assign(orcidOAuthLink(window.location.pathname));
  }

  componentDidMount() {
    this.props.dispatch(studyFieldActions.getStudyFields());

    const code = new URL(window.location.href).searchParams.get('code');
    if (!isEmpty(code) && code) {
      window.history.replaceState({}, document.title, window.location.pathname);
      this.props.dispatch(userActions.registerUserORCID({
        code,
        redirect_uri: window.location.origin + window.location.pathname,
      }));
    }
  }

  componentDidUpdate(prevProps) {
    if (!isEmpty(this.props.orcidAccount) && !isEqual(prevProps.orcidAccount, this.props.orcidAccount)) {
      this.setState({
        firstName: get(this.props.orcidAccount, 'person.name.given-names.value', ''),
        lastName: get(this.props.orcidAccount, 'person.name.family-name.value', ''),
        email: get(this.props.orcidAccount, 'person.emails.email[0].email', ''),
        orcidId: get(this.props.orcidAccount, 'orcid-identifier.path', ''),
      });
    }
  }

  render () {
    const {
      email, password, confirmPassword, firstName, lastName, showPassword,
    } = this.state;

    const { studyFields } = this.props;
    let studyFieldsOptions = studyFields.length > 0 && studyFields.map((studyField) => ({
      value: studyField.id,
      text: studyField.field_name,
    }));

    studyFieldsOptions = studyFields.length > 0 ? [{value: null, text: 'None'}, ...studyFieldsOptions] : [{value: null, text: 'None'}];

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
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="input-wrapper">
                    <label htmlFor="first-name-input">First name</label>
                    <input
                      id="first-name-input"
                      autoComplete="given-name"
                      placeholder="Please input your first name"
                      value={firstName}
                      onChange={(e) => this.setState({ firstName: e.target.value })}
                    />
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="last-name-input">Last name</label>
                    <input
                      id="last-name-input"
                      autoComplete="family-name"
                      placeholder="Please input your last name"
                      value={lastName}
                      onChange={(e) => this.setState({ lastName: e.target.value })}
                    />
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="field-of-study-input">Field of study</label>
                    <div className="selectbox-wrapper" id="field-of-study-input">
                      <Selectbox
                        options={studyFieldsOptions}
                        onChange={this.onOptionSelect}
                        preselected
                      />
                    </div>
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="email-input">Email</label>
                    <input
                      id="email-input"
                      autoComplete="email"
                      placeholder="Please input your email"
                      value={email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="password-input">Password</label>
                    <div className="password-field-wrapper">
                      <input
                        id="password-input"
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
                  <div className="input-wrapper">
                    <label htmlFor="confirm-password-input">Confirm password</label>
                    <div className="password-field-wrapper">
                      <input
                        id="confirm-password-input"
                        placeholder="Please confirm your password"
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                      />
                    </div>
                  </div>
                  <button className="orcid-button" onClick={() => this.handleORCID()}>
                    <img src={ORCIDiDLogo} alt="orcid-logo" />
                    Connect your ORCID iD
                  </button>
                  <button onClick={() => this.registerUser()} disabled={some([email, password, confirmPassword, firstName, lastName], isEmpty) || password !== confirmPassword}>
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

const mapStateToProps = (state) => ({
  orcidAccount: orcidSelectors.getOrcid(state),
  studyFields: studyFieldsSelectors.getStudyFields(state),
});

export default (connect(mapStateToProps)(Register): React$ComponentType<{}>);
