// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { filter } from 'lodash';
import Logo from '../../../assets/logo/veritheum_logo.svg';
import MinimizedLogo from '../../../assets/logo/veritheum_logo_only.svg';
import NavigationFilter from '../NavigationFilter/NavigationFilter';
import ProfileMenu from './ProfileMenu/ProfileMenu';
import WalletConnector from '../WalletConnector/WalletConnector';
import './Navigation.scss';
import NavigationFilterResults from '../NavigationFilterResults/NavigationFilterResults';

 type Props = {
   isAuthorized: boolean,
   isAdmin: boolean,
 }
 type State = {
   mobileMenuOpen: boolean,
 }

class Navigation extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      mobileMenuOpen: false,
      filteredNftList: [],
      query: '',
    };
  }

  toggleMobileMenu = () => {
    this.setState({ mobileMenuOpen: !this.state.mobileMenuOpen });
  };

  closeMobileMenu = () => {
    this.setState({ mobileMenuOpen: false });
  };

  handleNftFiltration = (query: string) => {
    this.setState({ query });
    if (query) {
      const filteredNftList = filter(this.props.NftsList, nft => new RegExp(query, 'i').test(nft.name));
      this.setState({ filteredNftList });
    }
  };

  render () {
    const { isAuthorized, isAdmin } = this.props;
    const { mobileMenuOpen, query, filteredNftList } = this.state;

    const html = document.querySelector('html');
    if (mobileMenuOpen) {
      html?.classList.add('no-scroll');
    } else {
      html?.classList.remove('no-scroll');
    }

    return (
      <nav>
        <div className="nav-items-wrapper">
          <div className="item-group">
            <Link to="/" className="logo desktop">
              <img src={Logo} alt="Veritheum Logo" />
            </Link>
            <Link to="/" className="logo mobile" onClick={this.closeMobileMenu}>
              <img src={MinimizedLogo} alt="Veritheum Logo" />
            </Link>
            <NavigationFilter onChange={this.handleNftFiltration} />
            {query && <NavigationFilterResults filteredNftList={filteredNftList} />}
          </div>
          <div className={`item-group mobile-menu ${mobileMenuOpen ? 'show' : ''}`}>
            <div className="links-wrapper">
              <Link to="/" onClick={this.closeMobileMenu}>Home</Link>
              <Link to="/gallery" onClick={this.closeMobileMenu}>Explore</Link>
              <Link to="/marketplace" onClick={this.closeMobileMenu}>Marketplace</Link>
              {isAdmin ? <Link to="/admin-page" onClick={this.closeMobileMenu}>Admin page</Link> : null}
              <div className="group">
                {isAuthorized ? (
                  <>
                    <Link to="/minting-page" className="outline" onClick={this.closeMobileMenu}>Create</Link>
                    <WalletConnector id="wallet-connector" onClick={this.closeMobileMenu} />
                    <ProfileMenu closeMobileMenu={this.closeMobileMenu} />
                  </>
                ) : (
                  <>
                    <Link to="/register" className="outline" onClick={this.closeMobileMenu}>Create</Link>
                    <Link to="/sign_in" className="full" onClick={this.closeMobileMenu}>Sign in</Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={`mobile-menu-toggle ${mobileMenuOpen ? 'menu-open' : ''}`} onClick={this.toggleMobileMenu}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </nav>
    );
  }
}

export default (Navigation: React$ComponentType<Props>);
