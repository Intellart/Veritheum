import React from 'react';
import {
  MdCollectionsBookmark, MdEdit,
} from 'react-icons/md';
import { IoHeart, IoSearch } from 'react-icons/io5';
import Selectbox from '../Selectbox/Selectbox';
import './GalleryFilters.scss';

type Props = {
  searchText: string,
  filterNftsByName: Function,
  filterNftsByType: Function,
  numberOfItems: number,
  isProfile: boolean,
};

class GalleryFilters extends React.Component<Props> {
  handleChange = (e: Event) => {
    const { filterNftsByName } = this.props;
    filterNftsByName(e.target.value);
  };

  render () {
    const {
      searchText, filterNftsByType, numberOfItems,
      isProfile,
    } = this.props;

    const selectboxOptions = [
      { value: 0, text: 'All items' },
      { value: 1, text: 'Tradable items' },
      { value: 2, text: 'Endorsable items' },
    ];

    return (
      <div className="gallery-filters-wrapper">
        <div className="group main-group">
          {isProfile && (
            <>
              <div className="tab active">
                <MdCollectionsBookmark /> Collected
                <div className="count">
                  27
                </div>
              </div>
              <div className="tab">
                <MdEdit /> Created
                <div className="count">
                  4
                </div>
              </div>
              <div className="tab">
                <IoHeart /> Liked
                <div className="count">
                  92
                </div>
              </div>
            </>
          )}
        </div>

        <div className="group">
          <div className="filter">
            <div className="item-count">
              {numberOfItems} <span>items</span>
            </div>
            <input
              name="search-nfts"
              onChange={this.handleChange}
              placeholder="Search..."
              value={searchText}
            />
            <IoSearch />
          </div>
          <div className="selectbox-wrapper">
            <Selectbox
              onChange={filterNftsByType}
              options={selectboxOptions}
              preselected
            />
          </div>
        </div>
      </div>
    );
  }
}

export default GalleryFilters;
