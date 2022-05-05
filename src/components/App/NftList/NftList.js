import React from 'react';
import { isEmpty } from 'lodash';
import NftItem from '../NftItem/NftItem';
import './NftList.scss';

type Props = {
  nftList: Array<Object>,
}

class NftList extends React.Component<Props> {
  render () {
    const { nftList } = this.props;

    return (
      <div className="nft-list-wrapper">
        {isEmpty(nftList) ? (
          <div className="no-results-message">
            No items to display...
          </div>
        ) : (
          <div className="nft-list">
            {nftList.map(nft => (
              <NftItem
                key={nft.fingerprint}
                category={nft.category}
                tradeable={nft.tradeable}
                price={nft.price}
                verified={nft.verified}
                owner={nft.owner}
                likes={nft.likes}
                name={nft.name}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default NftList;
