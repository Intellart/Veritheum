// @flow
import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { secondsToMilliseconds } from 'date-fns';
import {
  filter, get, isEmpty, isEqual, keyBy, map,
} from 'lodash';
import GallerySideMenu from '../GallerySideMenu/GallerySideMenu';
import GalleryFilters from '../GalleryFilters/GalleryFilters';
import NftList from '../NftList/NftList';
import { fetchPlutusContractNftData } from '../../../utils/helpers';
import { actions } from '../../../store/walletStore';
import type { Nft } from '../../../store/nftStore';

function MarketPlace(): Node {
  const dispatch = useDispatch();
  const plutusNfts = useSelector((state) => (get(state, 'wallet.plutusNfts', {})), isEqual);
  const [plutus, setPlutus] = useState(false);
  const [state, setState] = useState<Object>({
    galleryNftList: {},
    searchText: '',
    initialMinPrice: null,
    initialMaxPrice: null,
    minPrice: null,
    maxPrice: null,
  });

  let filteredNftList: Nft[] = state.galleryNftList;

  // Filter by price
  filteredNftList = filter(filteredNftList, (nft: Nft) => {
    if (state.minPrice && state.maxPrice) return Number(nft.price) >= state.minPrice && Number(nft.price) <= state.maxPrice;

    return true;
  });

  useEffect(() => {
    const handleAsync = async () => {
      const plutusNftsNew = await fetchPlutusContractNftData();
      dispatch(actions.saveWallet({ plutusNfts: keyBy(plutusNftsNew, 'unit') }));
    };
    if (isEmpty(plutusNfts)) handleAsync();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const list = keyBy(filter(map(plutusNfts, 'data'), (data) => !isEmpty(data)), 'fingerprint');

      const minPrice = Math.min.apply(null, map(list, (nft: Nft) => Number(nft?.price)));
      const maxPrice = Math.max.apply(null, map(list, (nft: Nft) => Number(nft?.price)));

      setState({
        galleryNftList: list,
        initialMinPrice: minPrice,
        initialMaxPrice: maxPrice,
        minPrice,
        maxPrice,
      });
      setPlutus(!plutus);
    }, secondsToMilliseconds(2));

    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plutusNfts]);

  const handleFiltersChange = (key: string, value) => setState({ ...state, [key]: value });

  const filterNftsByCategory = (value) => {
    const { selectedCategory } = state;
    const categoryList = selectedCategory;
    if (!categoryList.includes(value)) {
      categoryList.push(value);
    } else {
      categoryList.splice(categoryList.indexOf(value), 1);
    }

    setState({
      ...state,
      selectedCategory: categoryList,
    });
  };

  const filterNftsByPrice = (minPrice, maxPrice) => {
    setState({
      ...state,
      minPrice,
      maxPrice,
    });
  };

  const clearFilters = () => {
    window.location.reload();
  };

  return (
    <div className="gallery-page">
      <GallerySideMenu
        filterNftsByCategory={filterNftsByCategory}
        filterNftsByPrice={filterNftsByPrice}
        initialMinPrice={state.initialMinPrice}
        initialMaxPrice={state.initialMaxPrice}
        clearFilters={clearFilters}
      />
      <div className="gallery-content-area">
        <GalleryFilters
          onFiltersChange={handleFiltersChange}
          filteredItemCount={filteredNftList.length}
          tabs={state.galleryTabs}
          selectedTab={state.selectedTab}
          searchText={state.searchText}
        />
        <NftList nftList={filteredNftList} isPlutus />
      </div>
    </div>
  );
}

export default MarketPlace;
