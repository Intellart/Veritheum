// @flow
import React from 'react';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import {
  some, isEmpty, map, find, get,
} from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import NftItem from '../NftItem/NftItem';
import FileUpload from '../FileUpload/FileUpload';
import MintingWizard from '../MintingWizard/MintingWizard';
import Selectbox from '../Selectbox/Selectbox';
import { actions as nftActions } from '../../../store/nftStore';
import type { Category } from '../../../store/categoriesStore';
import type { Profile as ProfileType } from '../../../store/userStore';
import type { ReduxState } from '../../../types';
import 'reactjs-popup/dist/index.css';
import './MintingPage.scss';

type State = {
  tradeable: boolean,
  owner: string,
  file: any,
  paperContent: string,
  name: string,
  description: string,
  categoryId: number|null,
  categoryText: string,
  price: number|null,
  mintingProcessStarted: boolean,
}

type Props = {}

type ReduxProps = {
  ...Props,
  dispatch: Function,
  profile: ProfileType,
  categories: Array<Category>
}

class MintingPage extends React.Component<ReduxProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      tradeable: true,
      owner: '',
      file: null,
      paperContent: '',
      name: '',
      description: '',
      categoryId: null,
      categoryText: '',
      price: null,
      mintingProcessStarted: false,
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

  createNft = (e) => {
    e.preventDefault();

    const {
      tradeable, price, name, description, categoryId, file
    } = this.state;

    const randomID = (): string => uuidv4();

    this.props.dispatch(nftActions.createNft({
      tradeable,
      price,
      name,
      description,
      subject: name,
      category_id: categoryId,
      owner_id: this.props.profile.id,
      onchain_transaction_id: 1,
      cardano_address_id: get(this.props.profile, 'wallets[0]cardano_addresses[0]id'),
      fingerprint: randomID(),
      policy_id: randomID(),
      asset_name: randomID(),
      file: file
    }));

    this.setState({ mintingProcessStarted: true });
  };

  finishJSON = (e) => {
    this.createNft(e);

    const json = this.createJSON();
    console.log(json);
  }

  // for JSON parsing
  createJSON = () => {
    const jsonFile = {
      fingerprint: this.state.fingerprint,
      policy_id: this.state.policy_id,
      asset_name: this.state.asset_name,
      price: this.state.price,
      name: this.state.name,
      description: this.state.description,
      subject: this.state.subject,
      owner_id: this.state.owner_id,
      onchain_transaction_id: this.state.onchain_transaction_id,
      cardano_address_id: this.state.cardano_address_id,
      tradeable: this.state.tradeable,
      file: this.state.file,
      paperContent: this.state.paperContent
    }

    const json = JSON.stringify(jsonFile);
    return json;
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
      tradeable, owner, file, paperContent, name, description, categoryText, price, mintingProcessStarted, fingerprint, policy_id, asset_name
    } = this.state;

    const fileUploaded = !isEmpty(file?.name);

    const disabled = tradeable ? (!fileUploaded || some([name, description, categoryText, price], isEmpty)) : some([paperContent, name, description, categoryText, price], isEmpty);

    const jsonFile = this.createJSON();

    return (
      <div className="minting-page">
        <div className="content-wrapper">
          <div className="header">
            <h2>Create item</h2>
          </div>
          {mintingProcessStarted ? (
            <Popup trigger='start-minting-btn' modal closeOnEscape>
              {(close) => (
                <div className='content-wrapper'>
                  <pre>{jsonFile}</pre>
                </div>
              )}
            </Popup>
            //<MintingWizard />
          ) : (
            <div className="row">
              <div className="column">
                <form onSubmit={(e) => this.finishJSON(e)}>
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
                      placeholder="Please type the name of the item here"
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
                  {tradeable ? (
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
                  )}
                  <button id='start-minting-btn' disabled={disabled} onClick={() => this.createJSON()}>
                    Start minting process
                  </button>
                </form>
              </div>
              <div className="column">
                <div>{}</div>
                <div className="subheader">
                  Preview item
                </div>
                <NftItem
                  data={
                    {
                      fingerprint: '',
                      tradeable,
                      name,
                      category: categoryText,
                      price,
                      owner,
                      asset_name,
                      cardano_address: '',
                      description,
                      policy_id,
                      subject: '',
                      endorsers: [],
                      tags: [],
                      likes: [],
                      nft_collection: '',
                      onchain_transaction: 0,
                      verified: false,
                      file: file
                    }
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  const profile = state.user.profile;
  const categories = state.categories;
  const fingerprint = state.fingerprint;
  const policy_id = state.policy_id;
  const asset_name = state.asset_name;
  const paperContent = state.paperContent;
  const file = state.file;

  return {profile, categories, fingerprint, policy_id, asset_name, paperContent, file};
};

export default (connect<ReduxProps, Props>(mapStateToProps)(MintingPage): React$ComponentType<Props>);
