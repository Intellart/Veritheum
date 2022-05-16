// @flow
import React from 'react';
import { isEmpty, map } from 'lodash';
import NftItem from '../NftItem/NftItem';
import type { Nft } from '../../../store/nftStore';
import './NftList.scss';

type Props = {
  nftList: Nft[],
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
            {map(nftList, (nft: Nft) => (
              <NftItem
                key={nft.fingerprint}
                data={nft}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default (NftList: React$ComponentType<Props>);
