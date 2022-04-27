// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';
import Logo from '../../../assets/logo/veritheum_logo.svg';
import NavigationFilter from '../NavigationFilter/NavigationFilter';
import './Navigation.scss';

type Props = {
  isAuthorized: boolean,
}
type State = {
  mobileMenuOpen: boolean,
}

class Navigation extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      mobileMenuOpen: false,
    };
  }

  toggleMobileMenu = () => {
    this.setState({ mobileMenuOpen: !this.state.mobileMenuOpen });
  };

  closeMobileMenu = () => {
    this.setState({ mobileMenuOpen: false });
  };

  render () {
    const { isAuthorized } = this.props;
    const { mobileMenuOpen } = this.state;

    return (
      <nav>
        <div className="nav-items-wrapper">
          <div className="item-group">
            <Link to="/" className="logo">
              <img src={Logo} alt="Veritheum Logo" />
            </Link>
            <NavigationFilter />
          </div>
          <div className={`item-group mobile-menu ${mobileMenuOpen ? 'show' : ''}`}>
            <div className="links-wrapper">
              <Link to="/" onClick={this.closeMobileMenu}>Home</Link>
              <Link to="/gallery" onClick={this.closeMobileMenu}>Explore</Link>
              <div className="group">
                <Link to="/" className="outline" onClick={this.closeMobileMenu}>Create</Link>
                {isAuthorized ? (
                  <Link to="/profile" className="full" onClick={this.closeMobileMenu}>Profile</Link>
                ) : (
                  <Link to="/sign_in" className="full" onClick={this.closeMobileMenu}>Sign in</Link>
                )}
              </div>
            </div>
          </div>
          <div className={`mobile-menu-toggle ${mobileMenuOpen ? 'menu-open' : ''}`} onClick={this.toggleMobileMenu}>
            {mobileMenuOpen ? <MdClose /> : <MdMenu />}
          </div>
        </div>
      </nav>
    );
  }
}

export default ((Navigation): React$ComponentType<Props>);
