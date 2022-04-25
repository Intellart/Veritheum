import React from 'react';
import { Link } from 'react-router-dom';
import { VscGlobe } from 'react-icons/vsc';
import { IoLogoTwitter, IoSettings } from 'react-icons/io5';
import { FaDiscord } from 'react-icons/fa';
import Logo from '../../../assets/graphics/veritheum_logo_cb.png';
import UserImagePlaceholder from '../../../assets/icons/user.svg';
import './Profile.scss';
import GalleryContent from '../GalleryContent/GalleryContent';
import { currentUser } from '../../../localStorage';
import { formatDate } from '../../../utils';

class Profile extends React.Component {
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
      <div className="profile-page">
        <div className="upper-profile-page-wrapper">
          <div className="user-info">
            <div className="user-image">
              <img src={UserImagePlaceholder} alt="User" />
            </div>
            <div className="user-name">
              {currentUser.first_name} {currentUser.last_name}
            </div>
            <div className="user-date-joined">
              Joined: {formatDate(currentUser.created_at)}
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
            <Link to="/profile">
              <IoSettings />
            </Link>
          </div>
          <GalleryContent isProfile />
        </div>
      </div>
    );
  }
}

export default Profile;
