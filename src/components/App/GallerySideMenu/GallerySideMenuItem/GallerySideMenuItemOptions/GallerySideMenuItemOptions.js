import React from 'react';
import MultiRangeSlider from '../../../MultiRangeSlider/MultiRangeSlider';
import GallerySideMenuCheckbox from './GallerySideMenuCheckbox/GallerySideMenuCheckbox';
import './GallerySideMenuItemOptions.scss';

type Props = {
  label: String,
  filterNftsByCategory: Function,
  filterNftsByPrice: Function,
  initialMinPrice: number,
  initialMaxPrice: number,
}

class GallerySideMenuItemOptions extends React.Component<Props> {
  render () {
    const {
      label, filterNftsByCategory, filterNftsByPrice,
      initialMinPrice, initialMaxPrice,
    } = this.props;

    if (label === 'Price') {
      return (
        <div className="gallery-side-menu-item-options">
          <MultiRangeSlider
            min={Math.floor(initialMinPrice)}
            max={Math.ceil(initialMaxPrice)}
            onChange={({ min, max }) => filterNftsByPrice(min, max)}
          />
        </div>
      );
    } else if (label === 'Categories') {
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
}

export default GallerySideMenuItemOptions;
