import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectors as userSelectors } from '../../../store/userStore';
import Logo from '../../../assets/graphics/veritheum_logo_cb.png';
import type { Profile } from '../../../store/userStore';
import './HeroCta.scss';

type Props = {
  profile: Profile,
}

class HeroCta extends React.Component<Props> {
  render () {
    const registeredUser = this.props.profile;
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
      <div className="hero-cta">
        <div className="hero-cta-content-wrapper">
          <h1><b>Create and sell</b><br />your own unique <b>osNFTs</b></h1>
          <h3>Own your data. Own your money. Own your intellect. Share your knowledge freely through your very own Open Science NFT.</h3>
          <div className="hero-btns-wrapper">
            <Link to="/gallery" className="full">Explore</Link>
            {registeredUser ? (
              <Link to="/minting-page" className="outline">Create</Link>
            ) : (
              <Link to="/register" className="outline">Create</Link>
            )}
          </div>
        </div>
        {graphics}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: userSelectors.getUser(state),
});

export default (connect(mapStateToProps, null)(HeroCta): React$ComponentType<Props>);
