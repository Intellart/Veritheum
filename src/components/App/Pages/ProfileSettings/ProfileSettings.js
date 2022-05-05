/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../../store/userStore';
import type { Profile as ProfileType } from '../../../store/userStore';
import type { ReduxState } from '../../../types';
import './ProfileSettings.scss';

type State = {
  firstName: string,
}

type Props = {
  dispatch: Function,
  profile: ProfileType,
}

class ProfileSettings extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
    };
  }

  componentDidMount() {
    const { first_name, last_name } = this.props.profile;

    this.setState({
      firstName: first_name,
      lastName: last_name,
    });
  }

  // TODO
  updateUser(e: Event) {
    e.preventDefault();
    const {
      firstName, lastName,
    } = this.state;
    this.props.dispatch(actions.updateUser({
      ...this.props.profile,
      first_name: firstName,
      last_name: lastName,
      full_name: `${firstName} ${lastName}`,
      orcid_id: this.props.profile.orcid_id,
    }));
  }

  render () {
    const { firstName, lastName } = this.state;

    return (
      <div className="profile-settings">
        <div className="header">
          <h2>Settings</h2>
        </div>
        <form onSubmit={(e) => this.updateUser(e)}>
          <div className="input-wrapper">
            <label htmlFor="edit-first-name-input">First name</label>
            <input
              id="edit-first-name-input"
              autoComplete="given-name"
              placeholder="Please input your first name"
              value={firstName}
              onChange={(e) => this.setState({ firstName: e.target.value })}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="edit-last-name-input">Last name</label>
            <input
              id="edit-last-name-input"
              autoComplete="given-name"
              placeholder="Please input your last name"
              value={lastName}
              onChange={(e) => this.setState({ lastName: e.target.value })}
            />
          </div>
          <button>
            Save changes
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  const { profile } = state.user;

  return { profile };
};

export default (connect(mapStateToProps)(ProfileSettings): React$ComponentType<{}>);
