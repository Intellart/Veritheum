// @flow
/* eslint-disable camelcase */
/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import {
  isEmpty, get, includes, map,
} from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from '../../../store/walletStore';
import type { Nft, Utxo } from '../../../store/walletStore';
import 'reactjs-popup/dist/index.css';
import './WalletConnector.scss';

type ReduxProps = {
    dispatch: Function,
    isOpen: boolean,
    whichWalletSelected: string,
    walletFound: boolean,
    walletIsEnabled: boolean,
    walletName: string,
    walletIcon: string,
    walletAPIVersion: string,
    wallets: Array<any>,
    networkId: string,
    balance: string,
    Utxos: Utxo[],
    Nfts: Nft[],
    CollatUtxos: Utxo[],
    changeAddress: string,
    rewardAddress: string,
    usedAddress: string,

    txBody: string,
    txBodyCborHex_unsigned: string,
    txBodyCborHex_signed: string,
    submittedTxHash: string,

    addressBech32SendADA: string,
    lovelaceToSend: number,
    assetNameHex: string,
    assetPolicyIdHex: string,
    assetAmountToSend: number,
    addressScriptBech32: string,
    datumStr: string,
    plutusScriptCborHex: string,
    transactionIdLocked: string,
    transactionIndxLocked: number,
    lovelaceLocked: number,
    manualFee: number,

    protocolParams: Object
}

const mapStateToProps = (state) => {
  const isOpen = get(state, 'wallet.isOpen', false);
  const whichWalletSelected = get(state, 'wallet.whichWalletSelected', '');
  const walletFound = get(state, 'wallet.walletFound', false);
  const walletIsEnabled = get(state, 'wallet.walletIsEnabled', false);
  const walletName = get(state, 'wallet.walletName', '');
  const walletIcon = get(state, 'wallet.walletIcon', '');
  const walletAPIVersion = get(state, 'wallet.walletAPIVersion', '');
  const wallets = get(state, 'wallet.wallets', []);
  const networkID = get(state, 'wallet.network_id', 0);
  const balance = get(state, 'wallet.balance', 0);
  const Utxos = get(state, 'wallet.Utxos', []);
  const Nfts = get(state, 'wallet.Nfts', []);
  const CollatUtxos = get(state, 'wallet.CollatUtxos', []);
  const changeAddress = get(state, 'wallet.changeAddress', '');
  const rewardAddress = get(state, 'wallet.rewardAddress', '');
  const usedAddress = get(state, 'wallet.usedAddress', '');
  const txBody = get(state, 'wallet.txBody', '');
  const txBodyCborHex_unsigned = get(state, 'wallet.txBodyCborHex_unsigned', '');
  const txBodyCborHex_signed = get(state, 'wallet.txBodyCborHex_signed', '');
  const submittedTxHash = get(state, 'wallet.submittedTxHash', '');
  const addressBech32SendADA = get(state, 'wallet.addressBech32SendADA', '');
  const lovelaceToSend = get(state, 'wallet.lovelaceToSend', 0);
  const assetNameHex = get(state, 'wallet.assetNameHex', '');
  const assetPolicyIdHex = get(state, 'wallet.assetPolicyIdHex', '');
  const assetAmountToSend = get(state, 'wallet.assetAmountToSend', 0);
  const addressScriptBech32 = get(state, 'wallet.addressScriptBech32', '');
  const datumStr = get(state, 'wallet.datumStr', '');
  const plutusScriptCborHex = get(state, 'wallet.plutusScriptCborHex', '');
  const transactionIdLocked = get(state, 'wallet.transactionIdLocked', '');
  const transactionIndxLocked = get(state, 'wallet.transactionIndxLocked', 0);
  const lovelaceLocked = get(state, 'wallet.lovelaceLocked', 0);
  const manualFee = get(state, 'wallet.manualFee', 0);
  const protocolParams = get(state, 'wallet.protocolParams', {});

  return {
    isOpen,
    whichWalletSelected,
    walletFound,
    walletIsEnabled,
    walletName,
    walletIcon,
    walletAPIVersion,
    wallets,
    networkID,
    balance,
    Utxos,
    Nfts,
    CollatUtxos,
    changeAddress,
    rewardAddress,
    usedAddress,
    txBody,
    txBodyCborHex_unsigned,
    txBodyCborHex_signed,
    submittedTxHash,
    addressBech32SendADA,
    lovelaceToSend,
    assetNameHex,
    assetPolicyIdHex,
    assetAmountToSend,
    addressScriptBech32,
    datumStr,
    plutusScriptCborHex,
    transactionIdLocked,
    transactionIndxLocked,
    lovelaceLocked,
    manualFee,
    protocolParams,
  };
};

class WalletConnector extends Component<ReduxProps> {
  handleWalletSelect = (close, wallet) => {
    const whichWalletSelected = wallet;
    this.props.dispatch(actions.saveWallet({ whichWalletSelected }));
    this.props.dispatch(actions.refreshData({ ...this.props, whichWalletSelected }));
    this.props.dispatch(actions.saveWallet({ isOpen: !this.props.isOpen }));
    close();
  };

  // handleClick = () => {
  //   this.props.dispatch(actions.saveWallet({ isOpen: !this.props.isOpen }));
  // };

  /**
     * Poll the wallets it can read from the browser.
     * Sometimes the html document loads before the browser initialized browser plugins (like Nami or Flint).
     * So we try to poll the wallets 3 times (with 1 second in between each try).
     *
     * Note: CCVault and Eternl are the same wallet, Eternl is a rebrand of CCVault
     * So both of these wallets as the Eternl injects itself twice to maintain
     * backward compatibility
     *
     * @param count The current try count.
     */
    pollWallets = (count = 0) => {
        const wallets = [];

        for (const key in window.cardano) {
            if (window.cardano[key].enable && wallets.indexOf(key) === -1 && !includes(['eternl', 'yoroi', 'typhon', 'typhoncip30'], key)) {
                wallets.push(key);
            }
        }

    if (wallets.length === 0 && count < 2) {
      setTimeout(() => {
        this.pollWallets(count + 1);
      }, 1000);

      return;
    }

    this.props.dispatch(actions.saveWallet({
      wallets,
      whichWalletSelected: '',
    }));
  };

  componentDidMount() {
    if (isEmpty(this.props.wallets)) {
      this.pollWallets();
    }

    if (this.props.whichWalletSelected) {
      this.props.dispatch(actions.refreshData(this.props));
    }
  }

  render() {
    // const isWalletEnabled = this.props.walletIsEnabled;

    return (
      <Popup trigger={<Link to='#' className='outline'>Wallet</Link>} modal closeOnEscape>
        {(close) => (
          <div className='wallet-wrapper'>
            <h5 className='select-label'>Select wallet:</h5>
            <div className='wallet-choice-wrapper'>
              {map(this.props.wallets, (wallet, i) => (
                <div className="wallet-choice" key={i}>
                  <Link to='/wallet-page' onClick={() => this.handleWalletSelect(close, wallet)}>
                    <img src={window.cardano[wallet].icon} width={24} height={24} alt={wallet} />
                    <div className='wallet-label'>{window.cardano[wallet].name}</div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </Popup>
    );
  }
}

export default (connect(mapStateToProps)(WalletConnector): React$ComponentType<{}>);
