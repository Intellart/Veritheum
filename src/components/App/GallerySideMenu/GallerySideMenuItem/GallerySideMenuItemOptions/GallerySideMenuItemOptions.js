import React from 'react';
import GallerySideMenuCheckbox from './GallerySideMenuCheckbox/GallerySideMenuCheckbox';
import './GallerySideMenuItemOptions.scss';

type State = {
  menuOpen: boolean,
}

type Props = {
  label: String,
  filterNftsByCategory: Function,
}

class GallerySideMenuItemOptions extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }

  handleClick = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  render () {
    const { menuOpen } = this.state;
    const { label, filterNftsByCategory } = this.props;

    if (label === 'Categories') {
      return (
        <div className="gallery-side-menu-item-options">
          <GallerySideMenuCheckbox label="Biology" filterNftsByCategory={filterNftsByCategory} />
          <GallerySideMenuCheckbox label="Physics" filterNftsByCategory={filterNftsByCategory} />
          <GallerySideMenuCheckbox label="Chemistry" filterNftsByCategory={filterNftsByCategory} />
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