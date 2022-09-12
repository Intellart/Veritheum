// @flow
import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { RadioGroup, Radio } from "@blueprintjs/core";
import axios from 'axios';
import { isEmpty, get, includes } from 'lodash'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import {
    Address,
    BaseAddress,
    MultiAsset,
    Assets,
    ScriptHash,
    Costmdls,
    Language,
    CostModel,
    AssetName,
    TransactionUnspentOutput,
    TransactionUnspentOutputs,
    TransactionOutput,
    Value,
    TransactionBuilder,
    TransactionBuilderConfigBuilder,
    TransactionOutputBuilder,
    LinearFee,
    BigNum,
    BigInt,
    TransactionHash,
    TransactionInputs,
    TransactionInput,
    TransactionWitnessSet,
    Transaction,
    PlutusData,
    PlutusScripts,
    PlutusScript,
    PlutusList,
    Redeemers,
    Redeemer,
    RedeemerTag,
    Ed25519KeyHashes,
    ConstrPlutusData,
    ExUnits,
    Int,
    NetworkInfo,
    EnterpriseAddress,
    TransactionOutputs,
    hash_transaction,
    hash_script_data,
    hash_plutus_data,
    ScriptDataHash, Ed25519KeyHash, NativeScript, StakeCredential,
    Lucid, Blockfrost
} from '@emurgo/cardano-serialization-lib-asmjs';
import { actions, Nft, Utxo } from '../../../store/walletStore';
import { API } from '../../../utils/helpers';
import './WalletConnector.scss';

let Buffer = require('buffer/').Buffer;

type ReduxProps = {
    dispatch: Function,
    isOpen: boolean,
    whichWalletSelected: string,
    walletFound: boolean,
    walletIsEnabled: boolean,
    walletName: string,
    walletIcon: string,
    walletAPIVersion: string,
    wallets: Array,

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
    const isOpen = get(state, "wallet.isOpen", false);
    const whichWalletSelected = get(state, "wallet.whichWalletSelected", '');
    const walletFound = get(state, "wallet.walletFound", false);
    const walletIsEnabled = get(state, "wallet.walletIsEnabled", false);
    const walletName = get(state, "wallet.walletName", '');
    const walletIcon = get(state, "wallet.walletIcon", '');
    const walletAPIVersion = get(state, "wallet.walletAPIVersion", '');
    const wallets = get(state, "wallet.wallets", []);
    const networkID = get(state, 'wallet.network_id', 0);
    const balance = get(state, "wallet.balance", 0);
    const Utxos = get(state, "wallet.Utxos", []);
    const Nfts = get(state, "wallet.Nfts", []);
    const CollatUtxos = get(state, "wallet.CollatUtxos", []);
    const changeAddress = get(state, "wallet.changeAddress", '');
    const rewardAddress = get(state, "wallet.rewardAddress", '');
    const usedAddress = get(state, "wallet.usedAddress", '');
    const txBody = get(state, "wallet.txBody", '');
    const txBodyCborHex_unsigned = get(state, "wallet.txBodyCborHex_unsigned", '');
    const txBodyCborHex_signed = get(state, "wallet.txBodyCborHex_signed", '');
    const submittedTxHash = get(state, "wallet.submittedTxHash", '');
    const addressBech32SendADA = get(state, "wallet.addressBech32SendADA", '');
    const lovelaceToSend = get(state, "wallet.lovelaceToSend", 0);
    const assetNameHex = get(state, "wallet.assetNameHex", '');
    const assetPolicyIdHex = get(state, "wallet.assetPolicyIdHex", '');
    const assetAmountToSend = get(state, "wallet.assetAmountToSend", 0);
    const addressScriptBech32 = get(state, "wallet.addressScriptBech32", '');
    const datumStr = get(state, "wallet.datumStr", '');
    const plutusScriptCborHex = get(state, "wallet.plutusScriptCborHex", '');
    const transactionIdLocked = get(state, "wallet.transactionIdLocked", '');
    const transactionIndxLocked = get(state, "wallet.transactionIndxLocked", 0);
    const lovelaceLocked = get(state, "wallet.lovelaceLocked", 0);
    const manualFee = get(state, "wallet.manualFee", 0);
    const protocolParams = get(state, "wallet.protocolParams", {})

    return {
        isOpen: isOpen,
        whichWalletSelected: whichWalletSelected,
        walletFound: walletFound,
        walletIsEnabled: walletIsEnabled,
        walletName: walletName,
        walletIcon: walletIcon,
        walletAPIVersion: walletAPIVersion,
        wallets: wallets,
        networkID: networkID,
        balance: balance,
        Utxos: Utxos,
        Nfts: Nfts,
        CollatUtxos: CollatUtxos,
        changeAddress: changeAddress,
        rewardAddress: rewardAddress,
        usedAddress: usedAddress,
        txBody: txBody,
        txBodyCborHex_unsigned: txBodyCborHex_unsigned,
        txBodyCborHex_signed: txBodyCborHex_signed,
        submittedTxHash: submittedTxHash,
        addressBech32SendADA: addressBech32SendADA,
        lovelaceToSend: lovelaceToSend,
        assetNameHex: assetNameHex,
        assetPolicyIdHex: assetPolicyIdHex,
        assetAmountToSend: assetAmountToSend,
        addressScriptBech32: addressScriptBech32,
        datumStr: datumStr,
        plutusScriptCborHex: plutusScriptCborHex,
        transactionIdLocked: transactionIdLocked,
        transactionIndxLocked: transactionIndxLocked,
        lovelaceLocked: lovelaceLocked,
        manualFee: manualFee,
        protocolParams: protocolParams
    };
}

class WalletConnector extends Component<ReduxProps, State> {
    handleWalletSelect = (obj, wallet) => {
        const whichWalletSelected = wallet;
        this.props.dispatch(actions.saveWallet({whichWalletSelected: whichWalletSelected}));
        this.props.dispatch(actions.refreshData({...this.props, whichWalletSelected: whichWalletSelected}));
        this.props.dispatch(actions.saveWallet({isOpen: !this.props.isOpen}));
    }

    handleClick = () => {
        this.props.dispatch(actions.saveWallet({isOpen: !this.props.isOpen}));
    };

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
            if (window.cardano[key].enable && wallets.indexOf(key) === -1 && !includes(['eternl', 'yoroi'], key)) {
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
            whichWalletSelected: ''
        }));
    }

    componentDidMount() {
        if (isEmpty(this.props.wallets)) {
            this.pollWallets();
        }

        if (this.props.whichWalletSelected) {
            this.props.dispatch(actions.refreshData(this.props));
        }
    }

    render() {
        const isWalletEnabled = this.props.walletIsEnabled;

        return (
            <Popup trigger={<Link to='#' className='outline'>Wallet</Link>} modal>
                <div className='wallet-wrapper'>
                    <h5 className='select-label'>Select wallet:</h5>
                    <div className='wallet-choice-wrapper'>
                        { this.props.wallets.map((wallet, i) => (
                            <div className="wallet-choice" key={i}>
                                <Link to='/wallet-page'onClick={(e) => this.handleWalletSelect(e, wallet)}>
                                    <img src={window.cardano[wallet].icon} width={24} height={24} alt={wallet}/>
                                    <div className='wallet-label'>{window.cardano[wallet].name}</div>
                                </Link>
                            </div>
                            )
                        )}
                    </div>
                </div>
            </Popup>
        );
    }
}

export default (connect<ReduxProps, Props>(mapStateToProps)(WalletConnector): React$ComponentType<{}>);
