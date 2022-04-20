import React from 'react';
import GallerySideMenu from '../GallerySideMenu/GallerySideMenu';
import GalleryFilters from '../GalleryFilters/GalleryFilters';
import NftList from '../NftList/NftList';
import { fakeNftList } from '../../../utils/fakeNftList';

type Props = {
  isProfile: Boolean,
}

type State = {
  searchText: string,
  selectedOption: Number,
  selectedCategory: string,
}

class GalleryContent extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      nftList: fakeNftList,
      searchText: '',
      selectedOption: null,
      selectedCategory: [],
    };
  };

  filterNftsByName = (value) => {
    this.setState({ searchText: value })
  };

  filterNftsByType = (value) => {
    this.setState({ selectedOption: value });
  };

  filterNftsByCategory = (value) => {
    const { selectedCategory } = this.state;
    let array = selectedCategory;
    if (!array.includes(value)){
      array.push(value);
    } else {
      array.splice(array.indexOf(value), 1);
    }

    let newList = fakeNftList.filter(nft => array.includes(nft.category_id));

    this.setState({
      selectedCategory: array,
      nftList: newList,
    });
  };

  render () {
    const { isProfile } = this.props;
    const { nftList, selectedOption } = this.state;
    const filteredNftList = nftList.filter(nft => {
      if (selectedOption === 1) {
        return nft.name.toLowerCase().indexOf(this.state.searchText.toLowerCase()) >= 0 && nft.tradeable === true;
      } else if (selectedOption === 2) {
        return nft.name.toLowerCase().indexOf(this.state.searchText.toLowerCase()) >= 0 && nft.tradeable === false;
      } else {
        return nft.name.toLowerCase().indexOf(this.state.searchText.toLowerCase()) >= 0;
      }
    });

    const itemsCount = filteredNftList.length;

    return (
      <>
        <GallerySideMenu
          filterNftsByCategory={this.filterNftsByCategory}
        />
        <div className={isProfile ? 'profile-content-area' : 'gallery-content-area'}>
          <GalleryFilters
            filterNftsByName={this.filterNftsByName}
            filterNftsByType={this.filterNftsByType}
            numberOfItems={itemsCount}
            isProfile
          />
          <NftList
            nftList={filteredNftList}
          />
        </div>
      </>
    );
  }
};

export default GalleryContent;