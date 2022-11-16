// @flow
import React from 'react';
import type { Node } from 'react';
import { get, isArray } from 'lodash';
import type { Nft } from '../../../store/nftStore';
import './NftItem.scss';
import { postBuyBuildTx, postBuySubmitTx } from '../../../api';

type Props = {
  data: {
    ...Nft,
    ...Object
},
};

function MarketplaceNftItem(props: Props): Node {
  // TODO: implement close sell funcionality for NFTs owned by user
  const submitBuyRequest = (tokenName) => {
    let adaValue = prompt("Please enter token value (in ADA)", "2");

    if (adaValue == null) {
        return
    } else {
        adaValue = adaValue * 1000000;
    }

    window.cardano.getUsedAddresses().then((senders) => {
      window.cardano.getChangeAddress().then((change_address) => {
        const payload = JSON.stringify({
          'senders': senders,
          'change_address': change_address,
          'nft_name': tokenName,
          'nft_price': adaValue
        });

        postBuyBuildTx(payload)
          .then(response => response)
          .then(buySignTx);
      });
    });
  };

  const buySignTx = (tx) => {
    const witnessSet = tx['witness_set'];
    const datum = tx['datum'];

    window.cardano.signTx(tx['tx'], true).then((witness) => {
      buySendTxAndWitnessBack(tx['tx'], witness, witnessSet, datum);
    });
  };

  const buySendTxAndWitnessBack = (tx, witness, witnessSet, datum) => {
    const payload = JSON.stringify({ 'tx': tx, 'witness': witness, 'witness_set': witnessSet, 'datum': datum });

    postBuySubmitTx(payload)
      .then(response => response)
      .then(data => {
          alert("Transaction: " + data["tx_id"] + " submitted!");
      });
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
