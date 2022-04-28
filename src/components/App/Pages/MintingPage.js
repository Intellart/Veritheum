import React from 'react';
import { connect } from 'react-redux';
import Selectbox from '../Selectbox/Selectbox';
import NftItem from '../NftItem/NftItem';
import FileUpload from '../FileUpload/FileUpload';
import type { Profile as ProfileType } from '../../../store/userStore';
import type { ReduxState } from '../../../types';
import './MintingPage.scss';

type State = {
  tradeable: boolean,
  author: string,
  file: any,
  paperContent: string,
  name: string,
  description: string,
  category_id: number,
  price: number,
}

type Props = {
  profile: ProfileType,
}

class MintingPage extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      tradeable: true,
      author: '',
      file: null,
      paperContent: '',
      name: '',
      description: '',
      categoryId: null,
      price: null,
    };
  }

  componentDidMount() {
    const author = `${this.props.profile.first_name} ${this.props.profile.last_name}`;
    this.setState({ author })
  }

  onTypeSelect = (value) => {
    this.setState({ tradeable: value });
  };

  handleFileUpload = (event) => {
    this.setState({ file: event.target.files[0] })
  };

  onCategorySelect = (value) => {
    this.setState({ categoryId: value });
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

    const categoryOptions = [
      {
        value: 1,
        text: 'Biology',
      },
      {
        value: 2,
        text: 'Physics',
      },
      {
        value: 3,
        text: 'Chemistry',
      },
    ];

    const {
      tradeable, author, file, paperContent, name,
      description, categoryId, price,
    } = this.state;

    return (
      <div className="minting-page">
        <div className="content-wrapper">
          <div className="header">
            <h2>Create item</h2>
          </div>
          <div className="row">
            <div className="column">
              <form>
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
                <button>
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
                categoryId={categoryId}
                price={price}
                author={author}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  profile: state.user.profile,
});

export default (connect(mapStateToProps)(MintingPage): React$ComponentType<{}>);