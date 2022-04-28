import React from 'react';
import { Link } from 'react-router-dom';
import { IoLogoTwitter, IoLogoGithub } from 'react-icons/io5';
import { FaDiscord } from 'react-icons/fa';
import logoIcon from '../../../assets/logo/veritheum_logo_white.svg';
import './Footer.scss';

class Footer extends React.Component {
  render () {
    const today = new Date();
    const graphics = (
      <div className="graphics-wrapper">
        <div className="circle-graphic gr-1" />
        <div className="circle-graphic gr-2" />
        <div className="circle-graphic gr-3" />
        <div className="circle-graphic gr-4" />
        <div className="circle-graphic gr-5" />
      </div>
    );

    return (
      <footer>
        <div className="footer-content-wrapper">
          <div className="row">
            <div className="column logo-column">
              <div className="column-title">
                <a href="/">
                  <img src={logoIcon} alt='Intellart logo' />
                </a>
              </div>
            </div>
            <div className="column">
              <div className="column-title">
                Social
              </div>
              <div className="column-item social-links">
                <a href="#" target="_blank" rel="noopener noreferrer" title="Twitter">
                  <IoLogoTwitter />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" title="Discord">
                  <FaDiscord />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" title="Github">
                  <IoLogoGithub />
                </a>
              </div>
            </div>
            <div className="column">
              <div className="column-title">
                Contact
              </div>
              <div className="column-item">
                <a href="mailto:info@intellart.ca" className="email">info@intellart.ca</a>
              </div>
            </div>
            <div className="column">
              <div className="column-title">
                Navigation
              </div>
              <div className="column-item">
                <Link to="/" >
                  Home
                </Link>
              </div>
              <div className="column-item">
                <Link to="/gallery" >
                  Explore
                </Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="copyright">
              © {today.getFullYear()} Intellart. All rights reserved.
            </div>
            <div className="action-links">
              <Link to="/terms-of-use">Terms of Use</Link>|<Link to="/cookie-policy">Cookie policy</Link>|<Link to="/privacy-policy">Privacy policy</Link>
            </div>
          </div>
        </div>
        {graphics}
      </footer>
    );
  }
}

export default Footer;
