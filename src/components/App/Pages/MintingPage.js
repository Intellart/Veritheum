import React from 'react';
import { connect } from 'react-redux';
import { some, isEmpty } from 'lodash';
import NftItem from '../NftItem/NftItem';
import FileUpload from '../FileUpload/FileUpload';
import MintingWizard from '../MintingWizard/MintingWizard';
import Selectbox from '../Selectbox/Selectbox';
import type { Profile as ProfileType } from '../../../store/userStore';
import type { ReduxState } from '../../../types';
import './MintingPage.scss';
import { actions as nftActions } from '../../../store/nftStore';
import { Category } from '../../../store/categoriesStore';

type State = {
  tradeable: boolean,
  owner: string,
  file: any,
  paperContent: string,
  name: string,
  description: string,
  categoryId: number,
  categoryText: string,
  price: number,
  mintingProcessStarted: boolean,
}

type Props = {
  profile: ProfileType,
  categories: Array<Category>
}

class MintingPage extends React.Component<Props, State> {
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
    const categoryText = this.props.categories.find(category => category.id === value).category_name;
    this.setState({
      categoryId: value,
      categoryText,
    });
  };

  createNft = () => {
    const {
      tradeable, price, name, description, categoryId,
    } = this.state;

    /*  this.props.dispatch(nftActions.createNft({
      tradeable,
      price,
      name,
      description,
      category_id: categoryId,
      owner_id: this.props.profile.id,
      fingerprint: 'fingerprint-example',
      policy_id: '8001dede26bb7cbbe4ee5eae6568e763422e0a3c776b3f70878b03f1',
      onchain_transaction_id: 1,
      asset_name: 'lion00024',
      // TODO
    })); */

    this.setState({ mintingProcessStarted: true });
  };

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

    const categoryOptions = this.props.categories.length > 0 && this.props.categories.map((category) => ({
      value: category.id,
      text: category.category_name,
    }));

    const {
      // eslint-disable-next-line no-unused-vars
      tradeable, owner, file, paperContent, name, description, categoryText, price,
      mintingProcessStarted,
    } = this.state;

    let fileUploaded;
    if (file && file.name.length) {
      fileUploaded = true;
    } else {
      fileUploaded = false;
    }

    const disabled = tradeable ? (fileUploaded === false || some([name, description, categoryText, price], isEmpty)) : some([paperContent, name, description, categoryText, price], isEmpty);

    return (
      <div className="minting-page">
        <div className="content-wrapper">
          <div className="header">
            <h2>Create item</h2>
          </div>
          {mintingProcessStarted ? (
            <MintingWizard />
          ) : (
            <div className="row">
              <div className="column">
                <form onSubmit={(e) => e.preventDefault()}>
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
                  <button onClick={this.createNft} disabled={disabled}>
                    Start minting process
                  </button>
                </form>
              </div>
              <div className="column">
                <div className="subheader">
                  Preview item
                </div>
                <NftItem
                  tradeable={tradeable}
                  name={name}
                  category={categoryText}
                  price={price}
                  owner={owner}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  profile: state.user.profile,
  categories: state.categories,
});

export default (connect(mapStateToProps)(MintingPage): React$ComponentType<{}>);
