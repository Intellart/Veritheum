import React from 'react';
import GallerySideMenuCheckbox from './GallerySideMenuCheckbox/GallerySideMenuCheckbox';
import './GallerySideMenuItemOptions.scss';

type State = {
  menuOpen: boolean,
}

type Props = {
  label: String,
}

class GallerySideMenuItemOptions extends React.Component {
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

    if (label === 'Categories') {
      return (
        <div className="gallery-side-menu-item-options">
          <GallerySideMenuCheckbox label="Biology" />
          <GallerySideMenuCheckbox label="Physics" />
          <GallerySideMenuCheckbox label="Chemistry" />
        </div>
      );
    } else {
      return (
        <div className="gallery-side-menu-item-options">Lorem ipsum</div>
      );
    }
  }
};

export default GallerySideMenuItemOptions;