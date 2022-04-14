import React from 'react';
import { MdChevronRight } from 'react-icons/md';
import './GallerySideMenuItem.scss';
import GallerySideMenuItemOptions from './GallerySideMenuItemOptions/GallerySideMenuItemOptions';

type State = {
  menuOpen: boolean,
}

type Props = {
  label: String,
}

class GallerySideMenuItem extends React.Component {
  constructor() {
    super();
    this.state = {
      menuOpen: false,
    };
  }

  handleClick = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  render () {
    const { menuOpen } = this.state;
    const { label } = this.props;

    return (
      <div className={`gallery-side-menu-item ${menuOpen ? 'show' : ''}`}>
        <div className="item-toggle" onClick={this.handleClick}>
          <div className="label">{label}</div>
          <div className="icon"><MdChevronRight /></div>
        </div>
        {menuOpen && <GallerySideMenuItemOptions label={label} />}
      </div>
    );
  }
};

export default GallerySideMenuItem;