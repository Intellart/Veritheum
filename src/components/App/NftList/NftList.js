import React from 'react';
import NftItem from '../NftItem/NftItem';
import { fakeNftList as nftList } from '../../../utils/fakeNftList';
import './NftList.scss';

class NftList extends React.Component {
  render () {
    return (
      <div className="nft-list">
        {nftList.map((nft, i) => (
          <NftItem
            key={i}
            id={nft.id}
            categoryId={nft.category_id}
            tradeable={nft.tradeable}
            price={nft.price}
            author={nft.author}
            verified={nft.verified}
            likes={nft.likes}
            name={nft.name}
          />
        ))}
      </div>
    );
  }
};

export default NftList;