// @flow
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { map, get, any, isEmpty, toInteger, toNumber, every, isNull } from 'lodash';
import { refreshData, disableWallet, buildSendTokenToPlutusScript, fetchPlutusContractNftData } from '../../../utils/helpers';
import './WalletPage.scss';
import '../NftItem/NftItem.scss';
import '../NftList/NftList.scss';
import './session_pages.scss';
import { actions, Utxo, Nft } from '../../../store/walletStore';
import Selectbox from '../Selectbox/Selectbox';
//import { BlockFrostAPI } from '@blockfrost/blockfrost-js';

type ReduxProps = {
    dispatch: Function,
    whichWalletSelected: string,
    walletName: string,
    balance: number,
    Utxos: Utxo[],
    Nfts: Nft[],
    api_version: string,
    network_id: number,
    changeAddress: string,
    rewardAddress: string,
    protocolParams: Object,
    addressScriptBech32: string,
    datumStr: string,
    assetNameHex: string,
    assetPolicyIdHex: string,
    assetAmountToSend: number,
    lovelaceToSend: number,
    plutusNfts: Array
}

const mapStateToProps = (state) => {
    const whichWalletSelected = get(state, "wallet.whichWalletSelected", '');
    const walletName = get(state, "wallet.walletName", '');
    const balance = get(state, "wallet.balance", 0);
    const Utxos = get(state, "wallet.Utxos", []);
    const Nfts = get(state, "wallet.Nfts", []);
    const networkID = get(state, 'wallet.network_id', 0);
    const apiVersion = get(state, 'wallet.api_version', '');
    const changeAddress = get(state, "wallet.changeAddress", '');
    const rewardAddress = get(state, "wallet.rewardAddress", '');
    const protocolParams = get(state, "wallet.protocolParams", {});
    const addressScriptBech32 = get(state, "wallet.addressScriptBech32", '');
    const datumStr = get(state, "wallet.datumStr", '');
    const assetNameHex = get(state, "wallet.assetNameHex", '');
    const assetPolicyIdHex = get(state, "wallet.assetPolicyIdHex", '');
    const assetAmountToSend = get(state, "wallet.assetAmountToSend", 0);
    const lovelaceToSend = get(state, "wallet.lovelaceToSend", 0);
    const plutusNfts = get(state, "wallet.plutusNfts", []);

    return {
        whichWalletSelected: whichWalletSelected,
        walletName: walletName,
        balance: balance,
        Utxos: Utxos,
        Nfts: Nfts,
        network_id: networkID,
        api_version: apiVersion,
        changeAddress: changeAddress,
        rewardAddress: rewardAddress,
        protocolParams: protocolParams,
        addressScriptBech32: addressScriptBech32,
        datumStr: datumStr,
        assetNameHex: assetNameHex,
        assetPolicyIdHex: assetPolicyIdHex,
        assetAmountToSend: assetAmountToSend,
        lovelaceToSend: lovelaceToSend,
        plutusNfts: plutusNfts
    };
};

class WalletPage extends Component<ReduxProps, State> {
    constructor() {
        super();
        this.state = {
            showHideMoreInfo: false,
            sendNftAddress: undefined,
            sellNftAddress: undefined
        }

        this.hideComponent = this.hideComponent.bind(this);
    }

    hideComponent() {
        this.setState({showHideMoreInfo: !this.state.showHideMoreInfo});
    }

    onNftSelect(nft) {
        this.setState({selectedNft: nft});
    }

    setNftState(nftKey) {
        this.setState({
            assetNameHex: nftKey.data.asset_name,
            assetPolicyIdHex: nftKey.data.policy_id
        });
    }

    sellNft(nftKey) {
        this.setNftState(nftKey);
        buildSendTokenToPlutusScript(nftKey, this.props);
    }

    getNftImage(nftKey) {
        let img = ''

        if (nftKey.data?.onchain_metadata) {
            try {
                img = nftKey.data.onchain_metadata.image
                // in some cases image property is an array
                if (typeof img == 'object') { img = img[0]; };
                if (img !== undefined) {
                    img = img.replace("ipfs://", "https://ipfs.io/ipfs/")
                }
            } catch (err) {
                console.log(err);
            }
        }

        return img;
    }

    render () {
        const nfts = this.props.Nfts;
        const utxos = this.props.Utxos;
        const plutus_nfts = this.props.plutusNfts;
        const {sendNftAddress, sellNftAddress, showHideMoreInfo} = this.state;

        let walletNfts: Object[] = [{ value: null, text: 'None' }];

        if (!isEmpty(nfts)) {
            walletNfts = [...walletNfts, ...map(nfts, (nft: Nft) => ({
              value: nft.asset,
              text: nft.data ? nft.data.onchain_metadata.name : '',
            }))];
          }

        const json_code_sample = `
{
  "721": {
    <policy_id>: {
      <asset_name>: {
        "name": <string>,
        "image": <uri | array>,
        "mediaType": image/<mime_sub_type>,
        "description": <string | array>,
        "files": [{
          "name": <string>,
          "mediaType": <mime_type>,
          "src": <uri | array>,
          <other_properties>
        }],
        <other properties>
      }
    },
    "version": <version_id>
  }
}`

        return (
            <div className="wallet-page">
                <div className="content-wrapper">
                    <h1>My Wallet</h1>
                    <div className='wallet-actions'>
                        <button className='outline' onClick={() => refreshData(this.props)}>Refresh wallet data</button>
                        <button className='outline' onClick={() => disableWallet(this.props)}>Disconnect wallet</button>
                        <button className='outline' onClick={() => fetchPlutusContractNftData(this.props)}>Fetch Plutus Data</button>
                    </div>

                    <div className='wallet-dash'>
                        <div className='wallet-info'>
                            <div className='row'>
                                <h4 className='column'>Connected to: </h4>
                                <h5 className='column text-right'>{ this.props.walletName }</h5>
                            </div>
                            <div className='row'>
                                <h4 className='column'>Balance:</h4>
                                <h5 className='column text-right'>{ toNumber(this.props.balance / 1000000) } ADA</h5>
                            </div>
                            <div className='row'>
                                <h4 className='column'>Network:</h4>
                                <h5 className='column text-right'>{ this.props.network_id === 0 ? 'Testnet' : 'Mainnet' }</h5>
                            </div>
                        </div>
                        <div className='toggle-more-info' onClick={() => this.hideComponent()}>{!showHideMoreInfo ? 'Show more info' : 'Hide more info'}</div>
                        {showHideMoreInfo && (
                        <div className='wallet-more-info'>
                            <div className='row'>
                                <h4 className='column'>Main address:</h4>
                                <h5 className='column text-right'>{ this.props.changeAddress }</h5>
                            </div>
                            <div className='row'>
                                <h4 className='column'>Stake address:</h4>
                                <h5 className='column text-right'>{ this.props.rewardAddress }</h5>
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
                                    { utxos ? (
                                    <tbody>
                                    { utxos.map(
                                        (utxo, i) => (
                                        <tr key={i}>
                                            <td>#{utxo.txindx}</td>
                                            <td>{utxo.amount + ' ' + utxo.multiAssetStr}</td>
                                        </tr>
                                        )
                                    )}
                                    </tbody> ) : (<tbody></tbody>)
                                    }
                                </table>
                            </div>
                        </div>)
                        }
                        <div className='wallet-nfts'>
                            <h3 className='wallet-nfts-label'>NFTs</h3>
                            <div className='nft-list-wrapper'>
                                <div className='nft-list'>
                                    { map(nfts,
                                        (nftKey, i) => (
                                        <div key={i} className="nft-item-wrapper">
                                            <div className="nft-item">
                                                <div className="nft-item-name-wrapper">
                                                    <div className="nft-item-name">{nftKey.data?.onchain_metadata?.name}</div>
                                                </div>
                                                <div className='nft-item-img'>
                                                    <img src={nftKey.data ? this.getNftImage(nftKey) : ''} height={200} width={200}/>
                                                </div>
                                                {nftKey.data?.metadata ?
                                                    (<div className="nft-item-top-info">
                                                        <div className="metadata-section info-label">
                                                            Metadata
                                                            <div className='metadata-code'>
                                                                <pre>{nftKey.data.metadata}</pre>
                                                            </div>
                                                        </div>
                                                    </div>) : (<></>)
                                                }
                                                <div className="nft-item-bottom-info">
                                                    <div className="info-label column">Quantity: {nftKey.data?.quantity}</div>
                                                    <button className='outline' onClick={() => this.sellNft(nftKey)}>Sell</button>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    ) }
                                </div>
                            </div>
                        </div>
                        <div className='wallet-nfts'>
                            <h3 className='wallet-nfts-label'>Plutus Script NFTs</h3>
                            <div className='nft-list-wrapper'>
                                <div className='nft-list' id='plutus-nfts'>
                                    { map(plutus_nfts,
                                        (nftKey, i) => (
                                            <div key={i} className="nft-item-wrapper">
                                                <div className="nft-item">
                                                    <div className="nft-item-name-wrapper">
                                                        <div className="nft-item-name">{nftKey.data?.onchain_metadata?.name}</div>
                                                    </div>
                                                    <div className='nft-item-img'>
                                                        <img src={nftKey.data ? this.getNftImage(nftKey) : ''} height={200} width={200}/>
                                                    </div>
                                                    {nftKey.data?.metadata ?
                                                        (<div className="nft-item-top-info">
                                                            <div className="metadata-section info-label">
                                                                Metadata
                                                                <div className='metadata-code'>
                                                                    <pre>{typeof nftKey.data.metadata == 'object' ? JSON.stringify(nftKey.data.metadata, null, 2) : nftKey.data.metadata.description}</pre>
                                                                </div>
                                                            </div>
                                                        </div>) : (<></>)
                                                    }
                                                    <div className="nft-item-bottom-info">
                                                        <div className="info-label column">Quantity: {nftKey.quantity}</div>
                                                        <button className='outline' onClick={() => this.sellNft(nftKey.unit)}>Sell</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    ) }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default (connect<ReduxProps>(mapStateToProps)(WalletPage): React$ComponentType<{}>);