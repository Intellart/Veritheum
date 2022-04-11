import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/logo/veritheum_logo.svg';
import NavigationFilter from '../NavigationFilter/NavigationFilter';
import { MdMenu, MdClose } from "react-icons/md";
import './Navigation.scss';

type State = {
  mobileMenuOpen: boolean,
}

class Navigation extends React.Component {
  constructor() {
    super();
    this.state = {
      mobileMenuOpen: false,
    };
  }

  toggleMobileMenu = () => {
    this.setState({ mobileMenuOpen: !this.state.mobileMenuOpen })
  };

  render () {
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
              <Link to="/">Home</Link>
              <Link to="/gallery">Explore</Link>
              <div className="group">
                <Link to="/" className="outline">Create</Link>
                <Link to="/sign_in" className="full">Sign in</Link>
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
};

export default Navigation;