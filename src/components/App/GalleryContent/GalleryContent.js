// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  filter, map, get, isEqual,
} from 'lodash';
import GallerySideMenu from '../GallerySideMenu/GallerySideMenu';
import GalleryFilters from '../GalleryFilters/GalleryFilters';
import NftList from '../NftList/NftList';
import { selectors as nftSelectors } from '../../../store/nftStore';
import { selectors as userSelectors } from '../../../store/userStore';
import { buildUserGalleryNftList } from '../../../utils';
import type { Nft } from '../../../store/nftStore';
import type { Profile } from '../../../store/userStore';

type Props = {
  isProfile?: boolean,
  tabs?: Object[],
}

type ReduxProps = {
  ...Props,
  profile: Profile,
  nftList: Nft[],
  userNfts: Nft[],
}

type State = {
  galleryNftList: {[string]: Nft[]},
  galleryTabs: Object[],
  searchText: string,
  selectedTab: string,
  selectedOption: number|null,
  selectedCategory: string[],
  initialMinPrice: number|null,
  initialMaxPrice: number|null,
  minPrice: number|null,
  maxPrice: number|null,
}

class GalleryContent extends React.Component<ReduxProps, State> {
  constructor() {
    super();
    this.state = {
      galleryNftList: {},
      galleryTabs: [],
      searchText: '',
      selectedTab: get(this.props, 'tabs[0].value.id', 'all'),
      selectedOption: null,
      selectedCategory: [],
      initialMinPrice: null,
      initialMaxPrice: null,
      minPrice: null,
      maxPrice: null,
    };
  }

  componentDidMount() {
    const {
      isProfile, profile, userNfts, nftList, tabs,
    } = this.props;
    const { selectedTab } = this.state;

    const list = isProfile ? userNfts : nftList;
    if (list) {
      const minPrice = Math.min.apply(null, map(list, (nft: Nft) => Number(nft.price)));
      const maxPrice = Math.max.apply(null, map(list, (nft: Nft) => Number(nft.price)));

      const gallery = isProfile && tabs ? buildUserGalleryNftList(tabs, profile, list) : { list: { all: list }, tabs: [] };

      this.setState({
        selectedTab: isProfile && selectedTab !== 'all' ? selectedTab : get(tabs, '[0].value.id', 'all'),
        galleryNftList: gallery.list,
        galleryTabs: gallery.tabs,
        initialMinPrice: minPrice,
        initialMaxPrice: maxPrice,
        minPrice,
        maxPrice,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      isProfile, profile, userNfts, nftList, tabs,
    } = this.props;
    const { selectedTab } = this.state;

    const list = isProfile ? userNfts : nftList;
    const prevList = isProfile ? prevProps.userNfts : prevProps.nftList;

    if (!isEqual(list, prevList)) {
      const minPrice = Math.min.apply(null, map(list, (nft: Nft) => Number(nft.price)));
      const maxPrice = Math.max.apply(null, map(list, (nft: Nft) => Number(nft.price)));

      const gallery = isProfile && tabs ? buildUserGalleryNftList(tabs, profile, list) : { list: { all: list }, tabs: [] };

      this.setState({
        selectedTab: isProfile && selectedTab !== 'all' ? selectedTab : get(tabs, '[0].value.id', 'all'),
        galleryNftList: gallery.list,
        galleryTabs: gallery.tabs,
        initialMinPrice: minPrice,
        initialMaxPrice: maxPrice,
        minPrice,
        maxPrice,
      });
    }
  }

  handleFiltersChange = (key: string, value) => this.setState({ [key]: value });

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

  clearFilters = () => {
    window.location.reload();
  };

  render () {
    const { isProfile } = this.props;
    const {
      selectedTab, selectedOption, selectedCategory, initialMinPrice,
      initialMaxPrice, minPrice, maxPrice, searchText, galleryNftList,
      galleryTabs,
    } = this.state;

    let filteredNftList = get(galleryNftList, selectedTab, []);

    // Filter by search input or type
    filteredNftList = filter(filteredNftList, (nft: Nft) => {
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
      filteredNftList = filter(filteredNftList, (nft: Nft) => selectedCategory.includes(nft.category));
    }

    // Filter by price
    filteredNftList = filter(filteredNftList, (nft: Nft) => {
      if (minPrice && maxPrice) return Number(nft.price) >= minPrice && Number(nft.price) <= maxPrice;

      return true;
    });

    return (
      <>
        <GallerySideMenu
          filterNftsByCategory={this.filterNftsByCategory}
          filterNftsByPrice={this.filterNftsByPrice}
          initialMinPrice={initialMinPrice}
          initialMaxPrice={initialMaxPrice}
          clearFilters={this.clearFilters}
        />
        <div className={isProfile ? 'profile-content-area' : 'gallery-content-area'}>
          <GalleryFilters
            onFiltersChange={this.handleFiltersChange}
            filteredItemCount={filteredNftList.length}
            tabs={galleryTabs}
            selectedTab={selectedTab}
            searchText={searchText}
            isProfile={isProfile}
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
  profile: userSelectors.getUser(state),
  nftList: nftSelectors.getNfts(state),
  userNfts: userSelectors.getUserNfts(state),
});

export default (connect<ReduxProps, Props>(mapStateToProps, null)(GalleryContent): React$ComponentType<Props>);
