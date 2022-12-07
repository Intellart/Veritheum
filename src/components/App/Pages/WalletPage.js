// @flow
/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import type { Node } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  map, get, toNumber, isArray, isEqual, includes,
} from 'lodash';
import { disableWallet, constructAssetNameHex } from '../../../utils/helpers';
import { submitSellRequest } from '../../../utils/plutus_helpers';
import './WalletPage.scss';
import '../NftItem/NftItem.scss';
import '../NftList/NftList.scss';
import './session_pages.scss';
import { actions } from '../../../store/walletStore';
import type { Utxo, Nft } from '../../../store/walletStore';

export type ReduxProps = {
    walletIsEnabled: boolean,
    whichWalletSelected: string,
    walletName: string,
    balance: number,
    Utxos: Utxo[],
    Nfts: Nft[],
    api_version: string,
    network_id: number,
    changeAddress: string,
    rewardAddress: string,
    dispatch: function,
}

function WalletPage(): Node {
  const redux = useSelector((state) => ({
    walletIsEnabled: get(state, 'wallet.walletIsEnabled', ''),
    whichWalletSelected: get(state, 'wallet.whichWalletSelected', ''),
    walletName: get(state, 'wallet.walletName', ''),
    balance: get(state, 'wallet.balance', 0),
    Utxos: get(state, 'wallet.Utxos', []),
    Nfts: get(state, 'wallet.Nfts', []),
    network_id: get(state, 'wallet.network_id', 0),
    api_version: get(state, 'wallet.api_version', ''),
    changeAddress: get(state, 'wallet.changeAddress', ''),
    rewardAddress: get(state, 'wallet.rewardAddress', ''),
    dispatch: useDispatch(),
  }), isEqual);
  const dispatch = useDispatch();
  const [showHideMoreInfo, setShowHideMoreInfo] = useState(false);
  const nfts = redux.Nfts;
  const utxos = redux.Utxos;

  const hideComponent = () => {
    setShowHideMoreInfo(!showHideMoreInfo);
  };

  const handleRefresh = () => {
    dispatch(actions.refreshData(redux));
  };

  const getNftImage = (nftKey): Node => {
    if (nftKey.data?.onchain_metadata) {
      const img = nftKey.data.onchain_metadata.image;
      if (img) {
        const uri = isArray(img) ? img[0].replace('ipfs://', 'https://ipfs.io/ipfs/') : img.replace('ipfs://', 'https://ipfs.io/ipfs/');

        return (
          <img
            src={uri}
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
    <div className="wallet-page">
      <div className="content-wrapper">
        <h1>My Wallet</h1>
        <div className='wallet-actions'>
          <button className='outline' onClick={handleRefresh}>Refresh wallet data</button>
          <button className='outline' onClick={() => disableWallet(redux, dispatch)}>Disconnect wallet</button>
        </div>

        <div className='wallet-dash'>
          <div className='wallet-info'>
            <div className='row'>
              <h4 className='column'>Connected to: </h4>
              <h5 className='column text-right'>{ redux.walletName }</h5>
            </div>
            <div className='row'>
              <h4 className='column'>Balance:</h4>
              <h5 className='column text-right'>{ toNumber(redux.balance / 1000000) } ADA</h5>
            </div>
            <div className='row'>
              <h4 className='column'>Network:</h4>
              <h5 className='column text-right'>{ redux.network_id === 0 ? 'Testnet' : 'Mainnet' }</h5>
            </div>
          </div>
          <div className='toggle-more-info' onClick={() => hideComponent()}>{!showHideMoreInfo ? 'Show more info' : 'Hide more info'}</div>
          {showHideMoreInfo && (
            <div className='wallet-more-info'>
              <div className='row'>
                <h4 className='column'>Main address:</h4>
                <h5 className='column text-right'>{ redux.changeAddress }</h5>
              </div>
              <div className='row'>
                <h4 className='column'>Stake address:</h4>
                <h5 className='column text-right'>{ redux.rewardAddress }</h5>
              </div>
              <div className='wallet-utxos'>
                <h4>List of transactions:</h4>
                <table className='utxo-table'>
                  <thead>
                    <tr>
                      <th>Tx index</th>
                      <th>Unspent output</th>
                    </tr>
                  </thead>
                  <tbody>
                    {map(utxos, (utxo, i) => (
                      <tr key={i}>
                        <td>#{utxo.txindx}</td>
                        <td>{utxo.amount + ' ' + utxo.multiAssetStr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className='wallet-nfts'>
            <h3 className='wallet-nfts-label'>NFTs</h3>
            <div className='nft-list-wrapper'>
              <div className='nft-list'>
                {map(nfts, (nftKey, i) => (
                  <div key={i} className="nft-item-wrapper">
                    <div className="nft-item">
                      <div className="nft-item-name-wrapper">
                        <div className="nft-item-name">{nftKey.data?.onchain_metadata?.name}</div>
                      </div>
                      <div className='nft-image'>
                        {getNftImage(nftKey)}
                      </div>
                      {nftKey.data?.metadata && (
                      <div className="nft-item-top-info">
                        <div className="metadata-section info-label">
                          Metadata
                          <div className='metadata-code'>
                            <pre>{nftKey.data.metadata}</pre>
                          </div>
                        </div>
                      </div>
                      )}
                      <div className="nft-item-bottom-info">
                        <div className="info-label column">Quantity: {nftKey.data?.quantity}</div>
                        <button className='outline' onClick={() => submitSellRequest(nftKey.data?.asset_name, nftKey, redux)}>Sell</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletPage;
