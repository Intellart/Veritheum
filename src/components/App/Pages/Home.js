// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { filter, map } from 'lodash';
import { selectors as nftSelectors } from '../../../store/nftStore';
import HeroCta from '../HeroCta/HeroCta';
import NftItem from '../NftItem/NftItem';
import NftCategoryListTabs from '../NftCategoryListTabs/NftCategoryListTabs';
import TopRanking from '../TopRanking/TopRanking';
import TrendingToday from '../TrendingToday/TrendingToday';
import Footer from '../Footer/Footer';
import WalletIcon from '../../../assets/graphics/wallet.svg';
import NoteIcon from '../../../assets/graphics/note-plus.svg';
import WebIcon from '../../../assets/graphics/web.svg';
import type { Nft } from '../../../store/nftStore';
import './pages.scss';

type Props = {
  nftList: Nft[],
}

type State = {
  selectedTab: number|null,
}

class Home extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: null,
    };
  }

  handleTabSelect = (value: number) => {
    this.setState({ selectedTab: value });
  };

  render () {
    const { selectedTab } = this.state;
    const { nftList } = this.props;
    const filteredNftList = filter(nftList, nft => {
      if (!selectedTab) {
        return nft;
      } else {
        return nft.category === selectedTab;
      }
    });

    return (
      <div className="home-page-wrapper">
        <HeroCta />
        <div className="home-page-content">
          <section>
            <div className="section-header">
              <h2>Browse osNFTs by category</h2>
              <h3>Which one do you think will contain the most engaging content?</h3>
            </div>
            <div className="section-content mt-40">
              <NftCategoryListTabs
                selectedTab={selectedTab}
                handleTabSelect={this.handleTabSelect}
              />
              <div className="homepage-nft-list">
                {map(filteredNftList.slice(0, 8), (nft: Nft) => (
                  <NftItem
                    key={nft.fingerprint}
                    data={nft}
                  />
                ))}
              </div>
              <div className="home-cta-wrapper">
                <Link to="/gallery" className="home-cta-btn">
                  Explore the marketplace
                </Link>
              </div>
            </div>
          </section>
          <section className="grey">
            <div className="section-header">
              <h2>Start creating your osNFTs today</h2>
              <h3>No paper yet? No problem! You can use one of our osNFT frameworks.</h3>
            </div>
            <div className="section-content mt-80">
              <div className="info-section">
                <div className="item">
                  <div className="item-image">
                    <img src={WalletIcon} alt="Wallet icon" />
                  </div>
                  <div className="item-title">
                    Setup your finnie wallet
                  </div>
                  <div className="item-text">
                    The first step for uploading your osNFT is to setup an NFT-capable wallet. We recommend using the Finnie wallet.
                  </div>
                </div>
                <div className="item">
                  <div className="item-image">
                    <img src={NoteIcon} alt="Note icon" />
                  </div>
                  <div className="item-title">
                    Add your work
                  </div>
                  <div className="item-text">
                    Create your osNFT and submit it through the Finnie wallet to have it vetted by our team of experts (tip: you can be one, too! Contact us at info@intellart.ca).
                  </div>
                </div>
                <div className="item">
                  <div className="item-image">
                    <img src={WebIcon} alt="Web icon" />
                  </div>
                  <div className="item-title">
                    Release it to the world
                  </div>
                  <div className="item-text">
                    Congrats! Now your osNFT is on the market, you will earn 10% royalties on each re-purchase and 20% of the fees will fund the Open Access Treasury.
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="section-header">
              <h2>Top ranking osNFTs</h2>
              <h3>Open Science NFTs with the most value. The ranking is not to your liking? Change it by having a more active role on the platform!</h3>
            </div>
            <div className="section-content mt-40">
              <TopRanking />
            </div>
          </section>
          <section className="grey">
            <div className="section-header">
              <h2>Trending today</h2>
              <h3>Here are the most popular osNFTs accross all categories</h3>
            </div>
            <div className="section-content mt-40">
              <TrendingToday />
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  nftList: nftSelectors.getNfts(state),
});

export default (connect(mapStateToProps, null)(Home): React$ComponentType<{}>);
