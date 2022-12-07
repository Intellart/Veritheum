// @flow
import React from 'react';
import { connect, useSelector } from 'react-redux';
import {
  some, isEmpty, map, find, get, isEqual
} from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import NftItem from '../NftItem/NftItem';
import FileUpload from '../FileUpload/FileUpload';
import Selectbox from '../Selectbox/Selectbox';
import { actions as nftActions } from '../../../store/nftStore';
import type { Category } from '../../../store/categoriesStore';
import type { Profile as ProfileType } from '../../../store/userStore';
import { selectors } from '../../../store/walletStore';
import { selectors as nftSelectors } from '../../../store/nftStore';
import type { ReduxState } from '../../../types';
import 'reactjs-popup/dist/index.css';
import './MintingPage.scss';
import { postMintBuildTx, postSubmitTx } from '../../../api'
import { constructAssetNameHex, constructFingerprint } from '../../../utils/helpers';

const { Buffer } = require('buffer/');

type State = {
  tradeable: boolean,
  owner: string,
  file: any,
  paperContent: string,
  name: string,
  description: string,
  categoryId: number|null,
  categoryText: string,
  fingerprint: string,
  nft_id: number|null,
  policy_id: string,
}

type Props = {}

type ReduxProps = {
  ...Props,
  dispatch: Function,
  profile: ProfileType,
  categories: Array<Category>,
  walletIsEnabled: boolean,
  nfts: Object
}

class MintingPage extends React.Component<ReduxProps, State> {
  constructor(props) {
    super(props);

    this.startNftMinting = this.startNftMinting.bind(this);
    this.createNft = this.createNft.bind(this);
    this.signTx = this.signTx.bind(this);
    this.sendTxAndWitnessBack = this.sendTxAndWitnessBack.bind(this);

    this.state = {
      tradeable: true,
      owner: '',
      file: null,
      paperContent: '',
      name: '',
      description: '',
      categoryId: null,
      categoryText: '',
      fingerprint: '',
      policy_id: get(process.env, 'REACT_APP_PLUTUS_POLICY_ID', ''),
      nft_id: null,
      nfts: {}
    };
  }

  componentDidMount() {
    const owner = `${this.props.profile.first_name} ${this.props.profile.last_name}`;
    this.setState({ owner });
  }

  onTypeSelect = (value) => {
    this.setState({ tradeable: value });
  };

  handleFileUpload = (event) => {
    this.setState({ file: event.target.files[0] });
  };

  onCategorySelect = (value) => {
    const categoryText = find(this.props.categories, ['id', value])?.category_name;
    this.setState({
      categoryId: value,
      categoryText,
    });
  };

  startNftMinting = (e) => {
    e.preventDefault();

    this.createNft(e);
    this.prepareSender();
  };

  // here we first save the NFT to the db, then build the tx and ask the user to sign
  // TODO: If the user hasn't connected his wallet, prompt him to do so
  createNft = (e) => {
    e.preventDefault();

    const {
      tradeable, name, description, categoryId, file, policy_id
    } = this.state;

    const fingerprint = constructFingerprint(policy_id, name);

    // state is not updated
    this.setState({ fingerprint: fingerprint });
    console.log('fingerprint: ', fingerprint);
    this.props.dispatch(nftActions.createNft({
      fingerprint,
      tradeable,
      name,
      description,
      // TODO: why is this commented?
      // category_id: categoryId,
      owner_id: this.props.profile.id,
      policy_id,
      asset_name: name,
      file,
    }));
  };

  // 0.
  prepareSender() {
    // TODO: check which wallet is selected and use that one
    window.cardano.getUsedAddresses().then((senders) => {
      window.cardano.getChangeAddress().then((change_address) => {
        this.submitMintRequest(senders, change_address);
      })
    });
  }

  // 1.
  submitMintRequest(senders, change_address) {
    // TODO: get this data from the backend, still not implemented
    // NFT props not updating with new data
    //console.log(this.props);
    //const { nfts } = this.state.nfts;
    //const this_nft = find(nfts, ['fingerprint', this.state.fingerprint]);
    //const { nft_id, asset_name, description, url } = this_nft;
    //console.log(nft_id, asset_name, description, url);
    const newNFTId = 2;
    const newNFTName = this.state.name;
    const newNFTLongName = this.state.name;
    const newNFTDescription = this.state.description;
    const newNFTImageIPFS = 'ipfs://QmRhTTbUrPYEw3mJGGhQqQST9k86v1DPBiTTWJGKDJsVFw';//this.props.url;

    const payload = JSON.stringify({
      'senders': senders,
      'change_address': change_address,
      'nft_id': newNFTId,
      'nft_name': newNFTName,
      'nft_long_name': newNFTLongName,
      'nft_description': newNFTDescription,
      'nft_image_ipfs': newNFTImageIPFS
    });

    postMintBuildTx(payload)
      .then(response => response)
      .then(this.signTx);
  }

  // 2.
  signTx(tx) {
    window.cardano.signTx(tx['tx']).then((witness) => {
      this.sendTxAndWitnessBack(tx['tx'], witness);
    });
  }

  // 3.
  sendTxAndWitnessBack(tx, witness) {
    const payload = {
      tx_id: tx,
      witness,
    };

    this.props.dispatch(nftActions.updateTxAndWitness(payload, this.state.fingerprint))
      .then(window.location.replace('/profile'));
  }

  render () {
    const typeOptions = [
      {
        value: true,
        text: 'Tradeable osNFT',
      },
      {
        value: false,
        text: 'Endorsable osNFT',
      },
    ];

    const categoryOptions = map(this.props.categories, (category) => ({
      value: category.id,
      text: category.category_name,
    }));

    const {
      tradeable, owner, file, paperContent, name, description, categoryText
    } = this.state;

    const fileUploaded = !isEmpty(file?.name);

    const disabled = tradeable ? (!fileUploaded || some([name, description, categoryText], isEmpty)) : some([paperContent, name, description, categoryText], isEmpty);

    return (
      <div className="minting-page">
        <div className="content-wrapper">
          <div className="header">
            <h2>Create item</h2>
          </div>
            <div className="row">
              <div className="column">
                <form onSubmit={(e) => this.startNftMinting(e)}>
                  <div className="input-wrapper">
                    <label htmlFor="minting-nft-type-selectbox">Type</label>
                    <Selectbox
                      id="minting-nft-type-selectbox"
                      options={typeOptions}
                      onChange={this.onTypeSelect}
                      preselected
                    />
                  </div>
                  {tradeable ? (
                    <div className="input-wrapper">
                      <FileUpload
                        file={file}
                        handleFileUpload={this.handleFileUpload}
                        onChange={(e) => this.setState({ file: e.target.files[0] })}
                      />
                    </div>
                  ) : (
                    <div className="input-wrapper">
                      <label htmlFor="minting-nft-paper-content">Paper content</label>
                      <textarea
                        id="minting-nft-paper-content"
                        className="paper-content"
                        placeholder="Please provide the paper content here"
                        onChange={(e) => this.setState({ paperContent: e.target.value })}
                      />
                    </div>
                  )}
                  <div className="input-wrapper">
                    <label htmlFor="minting-nft-title">Title</label>
                    <input
                      id="minting-nft-title"
                      placeholder="Please type the name of the item here - must be unique"
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="minting-nft-description">Description</label>
                    <textarea
                      id="minting-nft-description"
                      className="description"
                      placeholder="Please provide a detailed description of your item here"
                      onChange={(e) => this.setState({ description: e.target.value })}
                    />
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="minting-nft-category">Category</label>
                    <Selectbox
                      id="minting-nft-category"
                      options={categoryOptions}
                      onChange={this.onCategorySelect}
                      placeholder="Select a category for your item"
                    />
                  </div>

                  {/* {tradeable ? (
                    <div className="input-wrapper">
                      <label htmlFor="minting-nft-price">Price</label>
                      <input
                        id="minting-nft-price"
                        type="number"
                        placeholder="Please provide the price of your item (ADA)"
                        onChange={(e) => this.setState({ price: e.target.value })}
                      />
                    </div>
                  ) : (
                    <div className="input-wrapper">
                      <label htmlFor="minting-nft-endorsement">Endorsement</label>
                      <input
                        id="minting-nft-endorsement"
                        type="number"
                        placeholder="Please provide the endorsement amount (ADA)"
                        onChange={(e) => this.setState({ price: e.target.value })}
                      />
                    </div>
                  )} */}
                  <button  id='start-minting-btn' disabled={disabled}>
                    Send request for minting
                  </button>
                </form>
              </div>
              <div className="column">
                <div>{}</div>
                <div className="subheader">
                  Preview item
                </div>
                <NftItem
                  data={{
                    state: '',
                    fingerprint: '',
                    tradeable,
                    name,
                    category: categoryText,
                    owner,
                    // eslint-disable-next-line camelcase
                    asset_name: '',
                    description,
                    // eslint-disable-next-line camelcase
                    policy_id: '',
                    nft_id: null,
                    subject: '',
                    endorsers: [],
                    tags: [],
                    likes: [],
                    nft_collection: '',
                    verified: false,
                    file,
                  }
                  }
                />
              </div>
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  const { profile } = state.user;
  const { categories } = state;
  const { walletIsEnabled } = state.wallet.walletIsEnabled;
  // const { nfts } = state.nfts;

  // console.log(state);
  // console.log('------------------------------------------------------------------------------');
  // console.log(state.nfts);


  return { profile, categories, walletIsEnabled };
};

export default (connect<ReduxProps, Props>(mapStateToProps)(MintingPage): React$ComponentType<Props>);
