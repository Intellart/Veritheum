import React from 'react';
import GallerySideMenuItem from './GallerySideMenuItem/GalleySideMenuItem';
import {
  MdFilterList, MdArrowBack, MdChevronRight,
  MdCheckBoxOutlineBlank,
} from 'react-icons/md';
import './GallerySideMenu.scss';

type State = {
  menuClosed: boolean,
}

class GallerySideMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      menuClosed: false,
    };
  }

  handleClick = () => {
    this.setState({ menuClosed: !this.state.menuClosed });
  };

  closeMobileMenu = () => {
    this.setState({ menuClosed: false });
  };

  render () {
    const { menuClosed } = this.state;

    return (
      <div className={`gallery-side-menu ${menuClosed ? 'alt' : ''}`}>
        <div className={`gallery-side-menu-toggle ${menuClosed ? 'alt' : ''}`} onClick={this.handleClick}>
          <div className="label">
            <MdFilterList /> Filter
          </div>
          <div className="icon">
            <MdArrowBack />
          </div>
        </div>
        <div className="mobile-options-wrapper">
          <div className="clear-filters">
            Clear
          </div>
          <div className="toggle-menu" onClick={this.closeMobileMenu}>
            Done
          </div>
        </div>
        <div className="gallery-side-menu-body">
          <GallerySideMenuItem label="Price" />
          <GallerySideMenuItem label="Status" />
          <GallerySideMenuItem label="Collections" />
          <GallerySideMenuItem label="Categories" />
        </div>
      </div>
    );
  }
};

export default GallerySideMenu;