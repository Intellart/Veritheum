import React from 'react';
import { MdFilterList, MdArrowBack } from 'react-icons/md';
import GallerySideMenuItem from './GallerySideMenuItem/GallerySideMenuItem';
import './GallerySideMenu.scss';

type State = {
  menuClosed: boolean,
}

type Props = {
  filterNftsByCategory: Function,
  filterNftsByPrice: Function,
  initialMinPrice: number,
  initialMaxPrice: number,
  clearFilters: Function,
}

class GallerySideMenu extends React.Component<Props, State> {
  constructor(props) {
    super(props);
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
    const {
      filterNftsByCategory, filterNftsByPrice, initialMinPrice,
      initialMaxPrice, clearFilters,
    } = this.props;

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
          <div className="clear-filters" onClick={clearFilters}>
            Clear
          </div>
          <div className="toggle-menu" onClick={this.closeMobileMenu}>
            Done
          </div>
        </div>
        <div className="gallery-side-menu-body">
          <GallerySideMenuItem
            label="Price"
            filterNftsByPrice={filterNftsByPrice}
            initialMinPrice={initialMinPrice}
            initialMaxPrice={initialMaxPrice}
          />
          {/* <GallerySideMenuItem label="Collections" /> */}
          <GallerySideMenuItem label="Categories" filterNftsByCategory={filterNftsByCategory} />
        </div>
      </div>
    );
  }
}

export default GallerySideMenu;
