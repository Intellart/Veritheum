import React from 'react';
import { connect } from 'react-redux';
import GallerySideMenu from '../GallerySideMenu/GallerySideMenu';
import GalleryFilters from '../GalleryFilters/GalleryFilters';
import NftList from '../NftList/NftList';
import { selectors as nftSelectors } from '../../../store/nftStore';

type Props = {
  nftList: Array<Object>,
  isProfile?: Boolean,
}

type State = {
  searchText: string,
  selectedOption: Number,
  selectedCategory: string,
  initialMinPrice: number,
  initialMaxPrice: number,
  minPrice: number,
  maxPrice: number,
}

class GalleryContent extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      searchText: '',
      selectedOption: null,
      selectedCategory: [],
      initialMinPrice: null,
      initialMaxPrice: null,
      minPrice: null,
      maxPrice: null,
    };
  }

  componentDidMount() {
    const { nftList } = this.props;

    const minPrice = Math.min.apply(null, nftList.map((nft) => nft.price));
    const maxPrice = Math.max.apply(null, nftList.map((nft) => nft.price));

    this.setState({
      initialMinPrice: minPrice,
      initialMaxPrice: maxPrice,
      minPrice,
      maxPrice,
    });
  }

  filterNftsByName = (value) => {
    this.setState({ searchText: value });
  };

  filterNftsByType = (value) => {
    this.setState({ selectedOption: value });
  };

  filterNftsByCategory = (value) => {
    const { selectedCategory } = this.state;
    const categoryList = selectedCategory;
    if (!categoryList.includes(value)) {
      categoryList.push(value);
    } else {
      categoryList.splice(categoryList.indexOf(value), 1);
    }

    this.setState({
      selectedCategory: categoryList,
    });
  };

  filterNftsByPrice = (minPrice, maxPrice) => {
    this.setState({
      minPrice,
      maxPrice,
    });
  };

  render () {
    const { nftList, isProfile } = this.props;
    const {
      selectedOption, selectedCategory, initialMinPrice,
      initialMaxPrice, minPrice, maxPrice,
    } = this.state;
    let filteredNftList;

    // Filter by search input or type
    filteredNftList = nftList.filter(nft => {
      if (selectedOption === 1) {
        return nft.name.toLowerCase().indexOf(this.state.searchText.toLowerCase()) >= 0 && nft.tradeable === true;
      } else if (selectedOption === 2) {
        return nft.name.toLowerCase().indexOf(this.state.searchText.toLowerCase()) >= 0 && nft.tradeable === false;
      } else {
        return nft.name.toLowerCase().indexOf(this.state.searchText.toLowerCase()) >= 0;
      }
    });

    // Filter by category
    if (selectedCategory.length > 0) {
      filteredNftList = filteredNftList.filter(nft => selectedCategory.includes(nft.category_id));
    }

    // FIlter by price
    filteredNftList = filteredNftList.filter(nft => nft.price >= minPrice && nft.price <= maxPrice);

    const itemsCount = filteredNftList.length;

    return (
      <>
        <GallerySideMenu
          filterNftsByCategory={this.filterNftsByCategory}
          filterNftsByPrice={this.filterNftsByPrice}
          initialMinPrice={initialMinPrice}
          initialMaxPrice={initialMaxPrice}
        />
        <div className={isProfile ? 'profile-content-area' : 'gallery-content-area'}>
          <GalleryFilters
            filterNftsByName={this.filterNftsByName}
            filterNftsByType={this.filterNftsByType}
            numberOfItems={itemsCount}
            isProfile={isProfile === true}
          />
          <NftList
            nftList={filteredNftList}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  nftList: nftSelectors.getNfts(state),
});

export default connect(mapStateToProps, null)(GalleryContent);
