import React from 'react';
import GallerySideMenu from '../GallerySideMenu/GallerySideMenu';
import GalleryFilters from '../GalleryFilters/GalleryFilters';
import NftList from '../NftList/NftList';

class Gallery extends React.Component {
  render () {
    return (
      <div className="gallery-page">
        <GallerySideMenu />
        <div className="gallery-content-area">
          <GalleryFilters />
          <NftList />
        </div>
      </div>
    );
  }
};

export default Gallery;