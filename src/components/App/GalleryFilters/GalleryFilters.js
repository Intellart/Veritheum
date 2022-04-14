import React from 'react';
import Selectbox from '../Selectbox/Selectbox';
import {
  MdCollectionsBookmark, MdEdit, IoMdHeart
} from 'react-icons/md';
import { IoHeart, IoSearch } from 'react-icons/io5';
import './GalleryFilters.scss';

type Props = {
  profile: boolean,
}

class GalleryFilters extends React.Component {
  render () {
    const { profile } = this.props;

    return (
      <div className="gallery-filters-wrapper">
        <div className="group main-group">
          {profile && (
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
            <input placeholder="Search..." />
            <IoSearch />
          </div>
          <Selectbox />
        </div>
      </div>
    );
  }
};

export default GalleryFilters;