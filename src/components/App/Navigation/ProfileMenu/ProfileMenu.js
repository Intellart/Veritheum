// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  MdAccountCircle, MdSettings, MdLogout, MdChevronRight,
} from 'react-icons/md';
import { actions } from '../../../../store/userStore';
import UserImagePlaceholder from '../../../../assets/icons/user.svg';
import './ProfileMenu.scss';

type State = {
  isOpen: boolean,
}

type Props = {
  dispatch: Function,
  closeMobileMenu: Function,
}

class ProfileMenu extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }

  menuRef: ?HTMLElement;

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick);
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleOutsideClick);
  }

  handleLogOut = () => {
    const { closeMobileMenu, dispatch } = this.props;

    dispatch(actions.logoutUser());
    closeMobileMenu();
  };

  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  handleOutsideClick = (e: any) => {
    const isDescendant = this.menuRef && this.menuRef.contains(e.target);
    if (this.state.isOpen && !isDescendant) {
      this.setState({ isOpen: false });
    }
  };

  closeMenu = () => {
    const { closeMobileMenu } = this.props;

    this.setState({ isOpen: false });
    closeMobileMenu();
  };

  render () {
    const { isOpen } = this.state;

    return (
      <div className="profile-menu" ref={(node) => { this.menuRef = node; }}>
        <div className="profile-image" onClick={this.handleClick}>
          <img src={UserImagePlaceholder} alt="user" />
        </div>
        <div className={`mobile-profile-menu-toggle ${isOpen ? 'active' : ''}`} onClick={this.handleClick}>
          Account <MdChevronRight />
        </div>
        {isOpen && (
          <div className="profile-menu-dropdown">
            <Link to="/profile" className="dropdown-item" onClick={this.closeMenu}>
              <div className="icon"><MdAccountCircle /></div>
              <div className="label">Profile</div>
            </Link>
            <Link to="/settings" className="dropdown-item" onClick={this.closeMenu}>
              <div className="icon"><MdSettings /></div>
              <div className="label">Settings</div>
            </Link>
            <div className="dropdown-item" onClick={this.handleLogOut}>
              <div className="icon"><MdLogout /></div>
              <div className="label">Logout</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default (connect()(ProfileMenu): React$ComponentType<{}>);
