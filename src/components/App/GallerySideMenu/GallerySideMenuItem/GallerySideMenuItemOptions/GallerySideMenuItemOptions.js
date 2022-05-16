// @flow
import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import MultiRangeSlider from '../../../MultiRangeSlider/MultiRangeSlider';
import GallerySideMenuCheckbox from './GallerySideMenuCheckbox/GallerySideMenuCheckbox';
import type { Category } from '../../../../../store/categoriesStore';
import type { ReduxState } from '../../../../../types';
import './GallerySideMenuItemOptions.scss';

type Props = {
  label: string,
  filterNftsByCategory: Function,
  filterNftsByPrice: Function,
  initialMinPrice: number,
  initialMaxPrice: number,
  categories: Array<Category>,
}

class GallerySideMenuItemOptions extends React.Component<Props> {
  render () {
    const {
      label, filterNftsByCategory, filterNftsByPrice,
      initialMinPrice, initialMaxPrice, categories,
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
          {map(categories, (category) => (
            <GallerySideMenuCheckbox key={category.id} label={category.category_name} filterNftsByCategory={filterNftsByCategory} />
          ))}
        </div>
      );
    } else {
      return (
        <div className="gallery-side-menu-item-options">Coming soon!</div>
      );
    }
  }
}

const mapStateToProps = (state: ReduxState) => ({
  categories: state.categories,
});

export default (connect(mapStateToProps)(GallerySideMenuItemOptions): React$ComponentType<{}>);
