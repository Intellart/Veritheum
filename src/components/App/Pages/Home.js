import React from 'react';
import { Link } from 'react-router-dom';
import HeroCta from '../HeroCta/HeroCta';
import NftItem from '../NftItem/NftItem';
import NftListTabs from '../NftListTabs/NftListTabs';
import TopRanking from '../TopRanking/TopRanking';
import TrendingToday from '../TrendingToday/TrendingToday';
import Footer from '../Footer/Footer';
import WalletIcon from '../../../assets/graphics/wallet.svg';
import NoteIcon from '../../../assets/graphics/note-plus.svg';
import WebIcon from '../../../assets/graphics/web.svg';
import { fakeNftList } from '../../../utils/fakeNftList';
import './pages.scss';

type State = {
  nftList: Array<Object>,
  selectedTab: number,
}

class Home extends React.Component<State> {
  constructor(props) {
    super(props);
    this.state = {
      nftList: fakeNftList,
      selectedTab: null,
    };
  }

  handleTabSelect = (value: number) => {
    this.setState({ selectedTab: value });
  };

  render () {
    const { nftList, selectedTab } = this.state;
    const filteredNftList = nftList.filter(nft => {
      if (selectedTab === null) {
        return nft;
      } else {
        return nft.category_id === selectedTab;
      }
    });

    return (
      <div className="home-page-wrapper">
        <HeroCta />
        <div className="home-page-content">
          <section>
            <div className="section-header">
              <h2>Browse osNFTs by category</h2>
              <h3>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</h3>
            </div>
            <div className="section-content mt-40">
              <NftListTabs
                selectedTab={selectedTab}
                handleTabSelect={this.handleTabSelect}
              />
              <div className="homepage-nft-list">
                {filteredNftList.slice(0, 8).map(nft => (
                  <NftItem
                    key={nft.id}
                    id={nft.id}
                    categoryId={nft.category_id}
                    tradeable={nft.tradeable}
                    price={nft.price}
                    author={nft.author}
                    verified={nft.verified}
                    likes={nft.likes}
                    name={nft.name}
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
              <h3>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</h3>
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="section-header">
              <h2>Top ranking osNFTs</h2>
              <h3>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</h3>
            </div>
            <div className="section-content mt-40">
              <TopRanking />
            </div>
          </section>
          <section className="grey">
            <div className="section-header">
              <h2>Trending today</h2>
              <h3>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</h3>
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

export default Home;
