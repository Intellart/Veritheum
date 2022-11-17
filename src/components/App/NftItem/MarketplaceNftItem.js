// @flow
import React from 'react';
import type { Node } from 'react';
import { get, isArray } from 'lodash';
import type { Nft } from '../../../store/nftStore';
import './NftItem.scss';
import { submitBuyRequest } from '../../../utils/plutus_helpers';

type Props = {
  data: {
    ...Nft,
    ...Object
},
};

function MarketplaceNftItem(props: Props): Node {
  // TODO: get the image directly from url if NFT image does not have ipfs image format
  const getNftImage = (): Node => {
    if (props.data?.onchain_metadata) {
      const img = props.data.onchain_metadata.image;
      if (img) {
        const uri = isArray(img) ? img[0].replace('ipfs://', 'https://ipfs.io/ipfs/') : img.replace('ipfs://', 'https://ipfs.io/ipfs/');

        return (
          <img
            src={uri}
            height={200}
            width={200}
            alt="nft"
          />
        );
      }
    }

    return (
      <div className="loading-nft atom-wrapper">
        <div className="coin" />
      </div>
    );
  };

  return (
    <div className="nft-item-wrapper">
      <div className="nft-item">
        <div className="nft-item-name-wrapper">
          <div className="nft-item-name">{get(props.data, 'onchain_metadata.name', '')}</div>
        </div>
        <div className='nft-image'>
          {getNftImage()}
        </div>
        {get(props.data, 'metadata') && (
        <div className="nft-item-top-info">
          <div className="metadata-section info-label">
            Metadata
            <div className='metadata-code'>
              <pre>{typeof props.data.metadata === 'object' ? JSON.stringify(props.data.metadata, null, 2) : props.data.metadata.description}</pre>
            </div>
          </div>
        </div>
        )}
        <div className="nft-item-bottom-info">
          <button className='outline' onClick={() => submitBuyRequest(props.data.asset)}>Buy</button>
        </div>
      </div>
    </div>
  );
}

export default MarketplaceNftItem;
