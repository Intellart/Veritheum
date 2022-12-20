// @flow
import React from 'react';
import { connect } from 'react-redux';
import { map, isEmpty } from 'lodash';
import Select from 'react-select';
import { actions } from '../../../../store/userStore';
import { actions as studyFieldActions, selectors as studyFieldsSelectors } from '../../../../store/studyFieldsStore';
//import Selectbox from '../../Selectbox/Selectbox';
import type { ReduxState } from '../../../../types';
import type { Profile as ProfileType } from '../../../../store/userStore';
import type { StudyField } from '../../../../store/studyFieldsStore';
import './ProfileSettings.scss';

type State = {
  firstName: string,
  lastName: string,
  studyField: string,
  twitterLink: string,
  websiteLink: string,
  discordLink: string,
}

type Props = {
  dispatch: Function,
  profile: ProfileType,
  studyFields: Array<StudyField>,
}

class ProfileSettings extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.profile.first_name,
      lastName: this.props.profile.last_name,
      studyField: this.props.profile.study_field,
      twitterLink: this.props.profile?.twitter_link,
      websiteLink: this.props.profile?.website_link,
      discordLink: this.props.profile?.discord_link,
    };
  }

  componentDidMount() {
    if (isEmpty(this.props.studyFields)) this.props.dispatch(studyFieldActions.getStudyFields());
  }

  onOptionSelect = (value) => {
    this.setState({ studyField: value });
  };

  updateUser(e: Event) {
    e.preventDefault();
    const {
      firstName, lastName, studyField,
    } = this.state;
    this.props.dispatch(actions.updateUser({
      userId: this.props.profile.id,
      user: {
        first_name: firstName,
        last_name: lastName,
        study_field_id: studyField,
        orcid_id: this.props.profile.orcid_id,
      },
    }));
  }

  render () {
    const {
      firstName, lastName, studyField,
      twitterLink, discordLink, websiteLink,
    } = this.state;
    const { studyFields } = this.props;

    let studyFieldsOptions: Object[] = [];
    if (studyFields) {
      studyFieldsOptions = [...studyFieldsOptions, ...map(studyFields, (sf: StudyField) => ({
        value: sf.id,
        label: sf.field_name,
      }))];
    }

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

          <div className="input-wrapper">
            <label htmlFor="edit-field-of-study-input">Field of study</label>
            <div className="selectbox-wrapper" id="edit-field-of-study-input">
              <Select
                isMulti
                defaultValue={studyField}
                name="studyFieldOptions"
                options={studyFieldsOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={this.onOptionSelect}
              />
            </div>
          </div>
          <div className="input-wrapper">
            <label htmlFor="website-input-link">Website link</label>
            <input
              id="website-input-link"
              placeholder="Please input your website link"
              value={websiteLink}
              onChange={(e) => this.setState({ websiteLink: e.target.value })}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="discord-link-input">Discord link</label>
            <input
              id="discord-link-input"
              autoComplete="given-name"
              placeholder="Please input your Discord link"
              value={discordLink}
              onChange={(e) => this.setState({ discordLink: e.target.value })}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="twitter-link-input">Twitter link</label>
            <input
              id="twitter-link-input"
              placeholder="Please input your Twitter link"
              value={twitterLink}
              onChange={(e) => this.setState({ twitterLink: e.target.value })}
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

const mapStateToProps = (state: ReduxState) => ({
  profile: state.user.profile,
  studyFields: studyFieldsSelectors.getStudyFields(state),
});

export default (connect(mapStateToProps)(ProfileSettings): React$ComponentType<{}>);
