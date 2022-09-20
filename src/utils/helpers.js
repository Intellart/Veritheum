// @flow
/* eslint-disable no-unused-vars */
import React from 'react';
import { get } from 'lodash';
import axios from 'axios';
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
  // eslint-disable-next-line camelcase
  hash_transaction,
  // eslint-disable-next-line camelcase
  hash_script_data,
  // eslint-disable-next-line camelcase
  hash_plutus_data,
  ScriptDataHash, Ed25519KeyHash, NativeScript, StakeCredential,
  // $FlowFixMe
} from '@emurgo/cardano-serialization-lib-asmjs';
import { toast } from 'react-toastify';
import Error from '../components/App/Errors/Errors';
import { actions } from '../store/walletStore';
import type { Nft, Utxo } from '../store/walletStore';
import type { ReduxProps } from '../components/App/Pages/WalletPage';

const { Buffer } = require('buffer/');

// eslint-disable-next-line import/no-mutable-exports
export let API: any;

/**
 * Fetches data from Cardano API for the asset
 * @returns {Object}
 */
export const getAssetData = (asset: string): any | void => {
  if (asset !== 'lovelace') {
    const test = axios.get(`https://cardano-testnet.blockfrost.io/api/v0/assets/${asset}`, {
      headers: {
        project_id: get(process.env, 'REACT_APP_BLOCKFROST_API_KEY'),
      },
    }).then((response) => response.data);

    return test;
  }
};

/**
 *
 * @param {Nft[]} nfts
 * @returns {Nft[]}
 */
export const fetchNftData = (nfts: Nft[]): Nft[] => {
  const newNfts = [...nfts];
  newNfts.forEach((nft: Object) => {
    const handleAsync = async () => {
      const nftData = await getAssetData(nft.asset);
      nft.data = nftData;
    };
    if (!get(nft, 'data')) handleAsync();
  });

  return newNfts;
};

export const getPlutusContractData = (address: string): any => {
  const test = axios.get(`https://cardano-testnet.blockfrost.io/api/v0/addresses/${address}`, {
    headers: {
      project_id: get(process.env, 'REACT_APP_BLOCKFROST_API_KEY'),
    },
  }).then((response) => response.data).catch((err) => {
    toast.error(<Error error={err} />);
  });

  return test;
};

/**
 * Fetches data from Cardano API for all assets in the Plutus script
 * @returns {Array}
 */
export const fetchPlutusContractNftData = async (props: ReduxProps): Promise<any[]> => {
  const PlutusAddress = 'addr_test1wrwd4hdwm7z9uvqusmckt64999qh63dafc495rwwec9twncha7q6c';
  const data = await getPlutusContractData(PlutusAddress);
  const nftArray = [];

  if (data) {
    const assets = data.amount.slice(0, 100);
    assets.forEach(nft => {
      const handleAsync = async () => {
        const asset = nft.unit;
        const assetData = await getAssetData(asset);
        nft.data = assetData;
      };

      if (!get(nft, 'data')) handleAsync();
      nftArray.push(nft);
    });
    // console.log(assets);
  }

  props.dispatch(actions.saveWallet({ plutusNfts: nftArray }));

  return nftArray;
};

/**
 * Enables the wallet that was chosen by the user. When this executes the user should get a window pop-up
 * from the wallet asking to approve the connection of this app to the wallet.
 * @returns {Promise<boolean>}
 */
export const enableWallet = async (props: Object): Promise<boolean> => {
  const walletKey = props.whichWalletSelected;
  const response = await window.cardano[walletKey].enable();

  if (response) {
    API = response;
    // console.log('Wallet enabled.');
    props.dispatch(actions.saveWallet({ walletIsEnabled: true }));

    return true;
  }

  return false;
};

export const disableWallet = (props: Object) => {
  API = undefined;
  props.dispatch(actions.saveWallet({
    isOpen: false,
    whichWalletSelected: undefined,
    walletFound: false,
    walletIsEnabled: false,
    walletName: undefined,
    walletIcon: undefined,
    walletAPIVersion: undefined,
    fetchedNfts: [],

    networkId: undefined,
    balance: undefined,
    Utxos: undefined,
    Nfts: [],
    CollatUtxos: undefined,
    changeAddress: undefined,
    rewardAddress: undefined,
    usedAddress: undefined,

    txBody: null,
    txBodyCborHex_unsigned: '',
    txBodyCborHex_signed: '',
    submittedTxHash: '',
  }));
};

/**
     * Checks if the wallet is running in the browser. Does this for Nami, Eternl and Flint wallets.
     * @returns {boolean}
     */
export const checkIfWalletFound = (props: Object): boolean => {
  const walletKey = props.whichWalletSelected;
  const walletFound = !!window?.cardano?.[walletKey];
  props.dispatch(actions.saveWallet({ walletFound }));

  return walletFound;
};

/**
 * Checks if a connection has been established with the wallet.
 * @returns {Promise<boolean>}
 */
export const checkIfWalletEnabled = async (props: Object): Promise<boolean> => {
  let walletIsEnabled = false;
  const walletName = props.whichWalletSelected;
  walletIsEnabled = await window.cardano[walletName].isEnabled();
  props.dispatch(actions.saveWallet({ walletIsEnabled }));

  return walletIsEnabled;
};

/**
 * Gets the current balance of in Lovelace in the user's wallet, doesn't return the amounts of all other Tokens.
 * For other tokens you need to look into the full UTXO list.
 * @returns {Promise<void>}
 */
export const getBalance = async (props: Object): Promise<?number> => {
  try {
    const balanceCBORHex = await API.getBalance();
    const balance = Value.from_bytes(Buffer.from(balanceCBORHex, 'hex')).coin().to_str();
    props.dispatch(actions.saveWallet({ balance }));

    return balance;
  } catch (err) {
    toast.error(<Error error={err} />);
  }

  return null;
};

/**
 * Gets the Network ID to which the wallet is connected and writes it to state.
 * 0 = testnet
 * 1 = mainnet
 * @returns {Promise<void>}
 */
export const getNetworkId = async (props: Object): Promise<?number> => {
  try {
    const networkId = await API.getNetworkId();
    props.dispatch(actions.saveWallet({ networkId }));

    return networkId;
  } catch (err) {
    toast.error(<Error error={err} />);
  }

  return null;
};

/**
 * Get the API version used by the wallets, writes the value to state.
 * @returns {*}
 */
export const getAPIVersion = (props: Object): string => {
  const walletKey = props.whichWalletSelected;
  const walletAPIVersion = window?.cardano?.[walletKey].apiVersion;
  props.dispatch(actions.saveWallet({ walletAPIVersion }));

  return walletAPIVersion;
};

/**
 * Get the name of the wallet (nami, eternl, flint) and store it in state.
 * @returns {*}
 */
export const getWalletName = (props: Object): string => {
  const walletKey = props.whichWalletSelected;
  const walletName = window?.cardano?.[walletKey].name;
  props.dispatch(actions.saveWallet({ walletName }));

  return walletName;
};

/**
 * The collateral is need for working with Plutus Scripts
 * Essentially you need to provide collateral to pay for fees if the
 * script execution fails after the script has been validated...
 * this should be an uncommon occurrence and would suggest the smart contract
 * would have been incorrectly written.
 * The amount of collateral to use is set in the wallet
 * @returns {Promise<void>}
 */
export const getCollateral = async (props: Object): Promise<?any[]> => {
  const CollatUtxos = [];

  try {
    let collateral = [];

    const wallet = props.whichWalletSelected;
    if (wallet === 'nami') {
      collateral = await API.experimental.getCollateral();
    } else {
      collateral = await API.getCollateral();
    }

    for (const x of collateral) {
      const utxo = TransactionUnspentOutput.from_bytes(Buffer.from(x, 'hex'));
      CollatUtxos.push(utxo);
    }

    props.dispatch(actions.saveWallet({ CollatUtxos }));

    return CollatUtxos;
  } catch (err) {
    toast.error(<Error error={err} />);
  }

  return null;
};

/**
 * Get the address from the wallet into which any spare UTXO should be sent
 * as change when building transactions.
 * @returns {Promise<void>}
 */
export const getChangeAddress = async (props: Object): Promise<?string> => {
  try {
    const raw = await API.getChangeAddress();
    const changeAddress = Address.from_bytes(Buffer.from(raw, 'hex')).to_bech32();
    props.dispatch(actions.saveWallet({ changeAddress }));

    return changeAddress;
  } catch (err) {
    toast.error(<Error error={err} />);
  }

  return null;
};

/**
 * This is the Staking address into which rewards from staking get paid into
 * @returns {Promise<void>}
 */
export const getRewardAddresses = async (props: Object): Promise<?string> => {
  try {
    const raw = await API.getRewardAddresses();
    const rawFirst = raw[0];
    const rewardAddress = Address.from_bytes(Buffer.from(rawFirst, 'hex')).to_bech32();
    props.dispatch(actions.saveWallet({ rewardAddress }));

    return rewardAddress;
  } catch (err) {
    toast.error(<Error error={err} />);
  }

  return null;
};

/**
 * Gets previsouly used addresses
 * @returns {Promise<void>}
 */
export const getUsedAddresses = async (props: Object): Promise<?string> => {
  try {
    let usedAddress = '';
    const raw = await API.getUsedAddresses();
    const rawFirst = raw[0];
    if (rawFirst) {
      usedAddress = Address.from_bytes(Buffer.from(rawFirst, 'hex')).to_bech32();
    }

    props.dispatch(actions.saveWallet({ usedAddress }));

    return usedAddress;
  } catch (err) {
    toast.error(<Error error={err} />);
  }

  return null;
};

/**
 * Gets the UTXOs from the user's wallet and then stores them in an object in the state.
 * @returns {Promise<void>}
 */
export const getUtxos = async (props: Object): Promise<?{Utxos: Utxo[], Nfts: Nft[]}> => {
  const Utxos = [];
  const Nfts = [];

  try {
    const rawUtxos = await API.getUtxos();

    for (const rawUtxo of rawUtxos) {
      const utxo = TransactionUnspentOutput.from_bytes(Buffer.from(rawUtxo, 'hex'));
      const input = utxo.input();
      const txid = Buffer.from(input.transaction_id().to_bytes(), 'utf8').toString('hex');
      const txindx = input.index();
      const output = utxo.output();
      const amount = output.amount().coin().to_str(); // ADA amount in lovelace
      const multiasset = output.amount().multiasset();
      let multiAssetStr = '';

      if (multiasset) {
        const keys = multiasset.keys(); // policy Ids of thee multiasset
        const N = keys.len();

        for (let i = 0; i < N; i++) {
          const policyId = keys.get(i);
          const policyIdHex = Buffer.from(policyId.to_bytes(), 'utf8').toString('hex');
          const assets = multiasset.get(policyId);
          const assetNames = assets.keys();
          const K = assetNames.len();

          for (let j = 0; j < K; j++) {
            const assetName = assetNames.get(j);
            const assetNameString = Buffer.from(assetName.name(), 'utf8').toString();
            const assetNameHex = Buffer.from(assetName.name(), 'utf8').toString('hex');
            const multiassetAmt = multiasset.get_asset(policyId, assetName);
            multiAssetStr += `+ ${multiassetAmt.to_str()} + ${policyIdHex}.${assetNameHex} (${assetNameString})`;

            const nft = { asset: policyIdHex + assetNameHex };
            Nfts.push(nft);
          }
        }
      }

      const obj = {
        txid,
        txindx,
        amount,
        str: `${txid} #${txindx} = ${amount}`,
        multiAssetStr,
        TransactionUnspentOutput: utxo,
      };
      Utxos.push(obj);
    }

    props.dispatch(actions.saveWallet({ Utxos, Nfts }));

    return { Utxos, Nfts };
  } catch (err) {
    toast.error(<Error error={err} />);
  }

  return null;
};

/**
* Refresh all the data from the user's wallet
* @returns {Promise<void>}
*/
export const refreshData = async (props: Object): Promise<Object> => {
  try {
    const walletFound = checkIfWalletFound(props);
    if (walletFound) {
      const walletAPIVersion = getAPIVersion(props);
      const walletName = getWalletName(props);
      const walletEnabled = await enableWallet(props);
      if (walletEnabled) {
        const networkID = await getNetworkId(props);
        const balance = await getBalance(props);
        const utxosAndNfts = await getUtxos(props);
        const nfts = utxosAndNfts?.Nfts ? fetchNftData(utxosAndNfts.Nfts) : null;
        const collatUtxos = await getCollateral(props);
        const changeAddress = await getChangeAddress(props);
        const rewardAddress = await getRewardAddresses(props);
        const usedAddress = await getUsedAddresses(props);

        return {
          walletAPIVersion,
          walletIsEnabled: walletEnabled,
          walletName,
          networkID,
          balance,
          Utxos: utxosAndNfts?.Utxos,
          Nfts: nfts,
          CollatUtxos: collatUtxos,
          changeAddress,
          rewardAddress,
          usedAddress,
        };
      } else {
        return {
          isOpen: false,
          whichWalletSelected: '',
          walletFound: false,

          Utxos: [],
          Nfts: [],
          CollatUtxos: [],
          balance: null,
          changeAddress: null,
          rewardAddress: null,
          usedAddress: null,

          txBody: null,
          txBodyCborHex_unsigned: '',
          txBodyCborHex_signed: '',
          submittedTxHash: '',
        };
      }
    } else {
      return {
        isOpen: false,
        walletIsEnabled: false,
        whichWalletSelected: '',
        walletFound: false,

        Utxos: [],
        Nfts: [],
        CollatUtxos: [],
        balance: null,
        changeAddress: null,
        rewardAddress: null,
        usedAddress: null,

        txBody: null,
        txBodyCborHex_unsigned: '',
        txBodyCborHex_signed: '',
        submittedTxHash: '',
      };
    }
  } catch (err) {
    toast.error(<Error error={err} />);
  }

  return {};
};

/**
 * Every transaction starts with initializing the TransactionBuilder and setting the protocol parameters
 * This is boilerplate
 * @returns {Promise<TransactionBuilder>}
 */
export const initTransactionBuilder = (protocolParams: Object): any => {
  const txBuilder = TransactionBuilder.new(
    TransactionBuilderConfigBuilder.new()
      .fee_algo(LinearFee.new(BigNum.from_str(protocolParams.linearFee.minFeeA), BigNum.from_str(protocolParams.linearFee.minFeeB)))
      .pool_deposit(BigNum.from_str(protocolParams.poolDeposit))
      .key_deposit(BigNum.from_str(protocolParams.keyDeposit))
      .coins_per_utxo_word(BigNum.from_str(protocolParams.coinsPerUtxoWord))
      .max_value_size(protocolParams.maxValSize)
      .max_tx_size(protocolParams.maxTxSize)
      .prefer_pure_change(true)
      .build(),
  );

  return txBuilder;
};

/**
 * Builds an object with all the UTXOs from the user's wallet
 * @returns {Promise<TransactionUnspentOutputs>}
 */
export const getTxUnspentOutputs = (props: Object): any => {
  const txOutputs = TransactionUnspentOutputs.new();
  for (const utxo of props.Utxos) {
    txOutputs.add(utxo.TransactionUnspentOutput);
  }

  return txOutputs;
};

export const buildSendTokenToPlutusScript = async (nftKey: Object, state: Object) => {
  const txBuilder = await initTransactionBuilder(state.protocolParams);
  const ScriptAddress = Address.from_bech32(state.addressScriptBech32);
  const shelleyChangeAddress = Address.from_bech32(state.changeAddress);

  let txOutputBuilder = TransactionOutputBuilder.new();
  txOutputBuilder = txOutputBuilder.with_address(ScriptAddress);

  const dataHash = hash_plutus_data(PlutusData.new_integer(BigInt.from_str(state.datumStr)));

  txOutputBuilder = txOutputBuilder.with_data_hash(dataHash);
  txOutputBuilder = txOutputBuilder.next();

  const multiAsset = MultiAsset.new();
  const assets = Assets.new();

  assets.insert(
    AssetName.new(Buffer.from(nftKey.data.asset_name, 'hex')), // Asset Name
    BigNum.from_str(state.assetAmountToSend.toString()), // How much to send
  );
  multiAsset.insert(
    ScriptHash.from_bytes(Buffer.from(nftKey.data.policy_id, 'hex')), // PolicyID
    assets,
  );

  // txOutputBuilder = txOutputBuilder.with_asset_and_min_required_coin(multiAsset, BigNum.from_str(this.protocolParams.coinsPerUtxoWord))
  txOutputBuilder = txOutputBuilder.with_coin_and_asset(BigNum.from_str(state.lovelaceToSend.toString()), multiAsset);

  const txOutput = txOutputBuilder.build();
  txBuilder.add_output(txOutput);

  // Find the available UTXOs in the wallet and use them as Inputs
  const txUnspentOutputs = await getTxUnspentOutputs(state);

  // console.log(txUnspentOutputs);

  // !!!!--------------------- this line breaks ----------------------!!!!
  txBuilder.add_inputs_from(txUnspentOutputs, 3);

  // calculate the min fee required and send any change to an address
  txBuilder.add_change_if_needed(shelleyChangeAddress);

  // once the transaction is ready, we build it to get the tx body without witnesses
  const txBody = txBuilder.build();

  // Tx witness
  const transactionWitnessSet = TransactionWitnessSet.new();

  const tx = Transaction.new(
    txBody,
    TransactionWitnessSet.from_bytes(transactionWitnessSet.to_bytes()),
  );

  let txVkeyWitnesses = await API.signTx(Buffer.from(tx.to_bytes(), 'utf8').toString('hex'), true);
  txVkeyWitnesses = TransactionWitnessSet.from_bytes(Buffer.from(txVkeyWitnesses, 'hex'));

  transactionWitnessSet.set_vkeys(txVkeyWitnesses.vkeys());

  const signedTx = Transaction.new(
    tx.body(),
    transactionWitnessSet,
  );

  const submittedTxHash = await API.submitTx(Buffer.from(signedTx.to_bytes(), 'utf8').toString('hex'));
  state.dispatch(actions.saveWallet({ submittedTxHash, transactionIdLocked: submittedTxHash, lovelaceLocked: state.lovelaceToSend }));
};

export const buildRedeemTokenFromPlutusScript = async (assetName: string, policyId: string, state: Object) => {
  const txBuilder = await initTransactionBuilder(state.protocolParams);
  const ScriptAddress = Address.from_bech32(state.addressScriptBech32);
  const shelleyChangeAddress = Address.from_bech32(state.changeAddress);
  const assetNameHex = '5a656c6356656e64696e674d616368696e6530303735';// Buffer.from(assetName, "utf8").toString("hex");
  const policyID = 'a63cda2d3bcc09a828b57f20609ab22288c3317522719c45e3f2946a';

  const multiAsset = MultiAsset.new();
  const assets = Assets.new();

  // console.log(assetNameHex);

  assets.insert(
    AssetName.new(Buffer.from(assetNameHex, 'hex')), // Asset Name
    BigNum.from_str(state.assetAmountToSend.toString()), // How much to send
  );

  multiAsset.insert(
    ScriptHash.from_bytes(Buffer.from(policyID, 'hex')), // PolicyID
    assets,
  );

  txBuilder.add_input(
    ScriptAddress,
    TransactionInput.new(
      TransactionHash.from_bytes(Buffer.from(state.transactionIdLocked, 'hex')),
      state.transactionIndxLocked.toString()),
    Value.new_from_assets(multiAsset),
  ); // how much lovelace is at that UTXO

  txBuilder.set_fee(BigNum.from_str(Number(state.manualFee).toString()));

  const scripts = PlutusScripts.new();
  scripts.add(PlutusScript.from_bytes(Buffer.from(state.plutusScriptCborHex, 'hex'))); // from cbor of plutus script

  // Add outputs
  const outputVal = state.lovelaceLocked.toString() - Number(state.manualFee);
  const outputValStr = outputVal.toString();

  let txOutputBuilder = TransactionOutputBuilder.new();
  txOutputBuilder = txOutputBuilder.with_address(shelleyChangeAddress);
  txOutputBuilder = txOutputBuilder.next();
  txOutputBuilder = txOutputBuilder.with_coin_and_asset(BigNum.from_str(outputValStr), multiAsset);

  const txOutput = txOutputBuilder.build();
  txBuilder.add_output(txOutput);

  // once the transaction is ready, we build it to get the tx body without witnesses
  const txBody = txBuilder.build();

  const collateral = state.CollatUtxos;
  const inputs = TransactionInputs.new();
  collateral.forEach((utxo) => {
    inputs.add(utxo.input());
  });

  const datums = PlutusList.new();
  // datums.add(PlutusData.from_bytes(Buffer.from(state.datumStr, "utf8")))
  datums.add(PlutusData.new_integer(BigInt.from_str(state.datumStr)));

  const redeemers = Redeemers.new();

  const data = PlutusData.new_constr_plutus_data(
    ConstrPlutusData.new(
      BigNum.from_str('0'),
      PlutusList.new(),
    ),
  );

  const redeemer = Redeemer.new(
    RedeemerTag.new_spend(),
    BigNum.from_str('0'),
    data,
    ExUnits.new(
      BigNum.from_str('7000000'),
      BigNum.from_str('3000000000'),
    ),
  );

  redeemers.add(redeemer);

  // Tx witness
  const transactionWitnessSet = TransactionWitnessSet.new();

  transactionWitnessSet.set_plutus_scripts(scripts);
  transactionWitnessSet.set_plutus_data(datums);
  transactionWitnessSet.set_redeemers(redeemers);

  // Pre Vasil hard fork cost model
  // const costModelVals = [197209, 0, 1, 1, 396231, 621, 0, 1, 150000, 1000, 0, 1, 150000, 32, 2477736, 29175, 4, 29773, 100, 29773, 100, 29773, 100, 29773, 100, 29773, 100, 29773, 100, 100, 100, 29773, 100, 150000, 32, 150000, 32, 150000, 32, 150000, 1000, 0, 1, 150000, 32, 150000, 1000, 0, 8, 148000, 425507, 118, 0, 1, 1, 150000, 1000, 0, 8, 150000, 112536, 247, 1, 150000, 10000, 1, 136542, 1326, 1, 1000, 150000, 1000, 1, 150000, 32, 150000, 32, 150000, 32, 1, 1, 150000, 1, 150000, 4, 103599, 248, 1, 103599, 248, 1, 145276, 1366, 1, 179690, 497, 1, 150000, 32, 150000, 32, 150000, 32, 150000, 32, 150000, 32, 150000, 32, 148000, 425507, 118, 0, 1, 1, 61516, 11218, 0, 1, 150000, 32, 148000, 425507, 118, 0, 1, 1, 148000, 425507, 118, 0, 1, 1, 2477736, 29175, 4, 0, 82363, 4, 150000, 5000, 0, 1, 150000, 32, 197209, 0, 1, 1, 150000, 32, 150000, 32, 150000, 32, 150000, 32, 150000, 32, 150000, 32, 150000, 32, 3345831, 1, 1];

  /*
    Post Vasil hard fork cost model
    If you need to make this code work on the Mainnnet, before Vasil hard-fork
    Then you need to comment this section below and uncomment the cost model above
    Otherwise it will give errors when redeeming from Scripts
    Sending assets and ada to Script addresses is unaffected by this cost model
     */
  const costModelVals = [
    205665, 812, 1, 1, 1000, 571, 0, 1, 1000, 24177, 4, 1, 1000, 32, 117366,
    10475, 4, 23000, 100, 23000, 100, 23000, 100, 23000, 100, 23000, 100, 23000,
    100, 100, 100, 23000, 100, 19537, 32, 175354, 32, 46417, 4, 221973, 511, 0, 1,
    89141, 32, 497525, 14068, 4, 2, 196500, 453240, 220, 0, 1, 1, 1000, 28662, 4,
    2, 245000, 216773, 62, 1, 1060367, 12586, 1, 208512, 421, 1, 187000, 1000,
    52998, 1, 80436, 32, 43249, 32, 1000, 32, 80556, 1, 57667, 4, 1000, 10,
    197145, 156, 1, 197145, 156, 1, 204924, 473, 1, 208896, 511, 1, 52467, 32,
    64832, 32, 65493, 32, 22558, 32, 16563, 32, 76511, 32, 196500, 453240, 220, 0,
    1, 1, 69522, 11687, 0, 1, 60091, 32, 196500, 453240, 220, 0, 1, 1, 196500,
    453240, 220, 0, 1, 1, 806990, 30482, 4, 1927926, 82523, 4, 265318, 0, 4, 0,
    85931, 32, 205665, 812, 1, 1, 41182, 32, 212342, 32, 31220, 32, 32696, 32,
    43357, 32, 32247, 32, 38314, 32, 9462713, 1021, 10,
  ];

  const costModel = CostModel.new();
  costModelVals.forEach((x, i) => costModel.set(i, Int.new_i32(x)));

  const costModels = Costmdls.new();
  costModels.insert(Language.new_plutus_v1(), costModel);

  const scriptDataHash = hash_script_data(redeemers, costModels, datums);
  txBody.set_script_data_hash(scriptDataHash);
  txBody.set_collateral(inputs);

  const baseAddress = BaseAddress.from_address(shelleyChangeAddress);
  const requiredSigners = Ed25519KeyHashes.new();
  requiredSigners.add(baseAddress.payment_cred().to_keyhash());

  txBody.set_required_signers(requiredSigners);

  const tx = Transaction.new(
    txBody,
    TransactionWitnessSet.from_bytes(transactionWitnessSet.to_bytes()),
  );

  let txVkeyWitnesses = await API.signTx(Buffer.from(tx.to_bytes(), 'utf8').toString('hex'), true);
  txVkeyWitnesses = TransactionWitnessSet.from_bytes(Buffer.from(txVkeyWitnesses, 'hex'));

  transactionWitnessSet.set_vkeys(txVkeyWitnesses.vkeys());

  const signedTx = Transaction.new(
    tx.body(),
    transactionWitnessSet,
  );

  const submittedTxHash = await API.submitTx(Buffer.from(signedTx.to_bytes(), 'utf8').toString('hex'));
  // console.log(submittedTxHash);
  state.dispatch(actions.saveWallet({ submittedTxHash }));
};
