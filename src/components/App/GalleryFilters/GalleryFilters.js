// @flow
import React from 'react';
import { map } from 'lodash';
import { IoSearch } from 'react-icons/io5';
import Selectbox from '../Selectbox/Selectbox';
import './GalleryFilters.scss';

type Props = {
  onFiltersChange: Function,
  searchText: string,
  filteredItemCount: number,
  selectedTab: string,
  tabs: Object[],
  isProfile?: boolean,
};

class GalleryFilters extends React.Component<Props> {
  render () {
    const {
      tabs, searchText, filteredItemCount,
      isProfile, selectedTab, onFiltersChange,
    } = this.props;

    const selectboxOptions = [
      { value: 0, text: 'All items' },
      { value: 1, text: 'Tradeable items' },
      { value: 2, text: 'Endorsable items' },
    ];

    return (
      <div className="gallery-filters-wrapper">
        <div className="group main-group">
          {isProfile && map(tabs, (tab) => (
            <div key={tab.value.id} className={`tab ${selectedTab === tab.value.id ? 'active' : ''}`} onClick={() => onFiltersChange('selectedTab', tab.value.id)}>
              {tab.icon}
              {tab.label}
              <div className="count">
                {tab.count}
              </div>
            </div>
          ))}
        </div>

        <div className="group">
          <div className="filter">
            <div className="item-count">
              {filteredItemCount} <span>items</span>
            </div>
            <input
              name="search-nfts"
              onChange={(e) => onFiltersChange('searchText', e.target.value)}
              placeholder="Search..."
              defaultValue={searchText}
            />
            <IoSearch />
          </div>
          <div className="selectbox-wrapper">
            <Selectbox
              onChange={(val) => onFiltersChange('selectedOption', val)}
              options={selectboxOptions}
              preselected
            />
          </div>
        </div>
      </div>
    );
  }
}

export default (GalleryFilters: React$ComponentType<Props>);
