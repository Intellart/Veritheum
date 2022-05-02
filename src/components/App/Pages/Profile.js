// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { VscGlobe } from 'react-icons/vsc';
import { IoLogoTwitter, IoSettings } from 'react-icons/io5';
import { FaDiscord } from 'react-icons/fa';
import GalleryContent from '../GalleryContent/GalleryContent';
import { formatDate } from '../../../utils';
import Logo from '../../../assets/graphics/veritheum_logo_cb.png';
import UserImagePlaceholder from '../../../assets/icons/user.svg';
import type { Profile as ProfileType } from '../../../store/userStore';
import type { ReduxState } from '../../../types';
import './Profile.scss';

type Props = {
  profile: ProfileType,
}

class Profile extends React.Component<Props> {
  render () {
    const { profile } = this.props;
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
      <div className="profile-page">
        <div className="upper-profile-page-wrapper">
          <div className="user-info">
            <div className="user-image">
              <img src={UserImagePlaceholder} alt="User" />
            </div>
            <div className="user-name">
              {profile.user.first_name} {profile.user.last_name}
            </div>
            <div className="user-date-joined">
              Joined: {formatDate(profile.user.created_at)}
            </div>
          </div>
          {graphics}
        </div>
        <div className="lower-profile-page-wrapper">
          <div className="toolbar-links">
            <Link to="/profile">
              <VscGlobe />
            </Link>
            <Link to="/profile">
              <IoLogoTwitter />
            </Link>
            <Link to="/profile">
              <FaDiscord />
            </Link>
            <Link to="/settings">
              <IoSettings />
            </Link>
          </div>
          <GalleryContent isProfile />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  const { profile } = state.user;

  return { profile };
};

export default (connect(mapStateToProps)(Profile): React$ComponentType<{}>);
