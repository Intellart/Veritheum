// @flow
import React from 'react';
import type { Node } from 'react';
import { get, isArray } from 'lodash';
// import { buildSendTokenToPlutusScript } from '../../../utils/helpers';
import type { Nft } from '../../../store/nftStore';

type Props = {
  data: {
    ...Nft,
    ...Object
},
};

function MarketplaceNftItem(props: Props): Node {
  const buy = () => {
    // buildSendTokenToPlutusScript(nftKey, redux);
  };

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
        <div className='nft-item-img'>
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
          <button className='outline' onClick={() => buy()}>Buy</button>
        </div>
      </div>
    </div>
  );
}

export default MarketplaceNftItem;
