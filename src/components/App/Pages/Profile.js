import React from 'react';
import { Link } from 'react-router-dom';
import { VscGlobe } from "react-icons/vsc";
import { IoLogoTwitter, IoSettings } from "react-icons/io5";
import { FaDiscord } from "react-icons/fa";
import GallerySideMenu from '../GallerySideMenu/GallerySideMenu';
import GalleryFilters from '../GalleryFilters/GalleryFilters';
import NftList from '../NftList/NftList';
import Logo from '../../../assets/graphics/veritheum_logo_cb.png';
import UserImagePlaceholder from '../../../assets/icons/user.svg';
import './Profile.scss';

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
              <img src={UserImagePlaceholder} alt="User image" />
            </div>
            <div className="user-name">
              John Doe
            </div>
            <div className="user-date-joined">
              Joined: April 1st, 2022
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
          <GallerySideMenu />
          <div className="profile-content-area">
            <GalleryFilters />
            <NftList />
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;