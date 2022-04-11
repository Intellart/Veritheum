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
import './pages.scss';

class Home extends React.Component {
  render () {
    const fakeNftList = [
      {
        title: "CAMAP: Artificial neural networks unveil the role of codon arrangement in modulating MHC-I peptides presentation",
        category: "biology",
        price: 13.36,
        type: 'tradable',
        verifiedUser: true,
        liked: false,
        author: 'John Doe'
      },
      {
        title: "Enhanced four-wave mixing from multi-resonant silicon dimer-hole membrane metasurfaces",
        category: "physics",
        price: 13.36,
        type: 'endorsable',
        verifiedUser: true,
        liked: true,
        author: 'John Doe'
      },
      {
        title: "Supramolecular strategies in artificial photosynthesis",
        category: "chemistry",
        price: 13.36,
        type: 'tradable',
        verifiedUser: false,
        liked: true,
        author: 'John Doe'
      },
      {
        title: "Fermi surface transformation at the pseudogap critical point of a cuprate superconductor",
        category: "physics",
        price: 13.36,
        type: 'endorsable',
        verifiedUser: true,
        liked: true,
        author: 'John Doe'
      },
      {
        title: "The Hitchhiker's guide to biocatalysis: recent advances in the use of enzymes in organic synthesis",
        category: "chemistry",
        price: 13.36,
        type: 'endorsable',
        verifiedUser: false,
        liked: false,
        author: 'John Doe'
      },
      {
        title: "Effect of gut microbiota on depressive-like behaviors in mice is mediated by the endocannabinoid systems",
        category: "biology",
        price: 13.36,
        type: 'tradable',
        verifiedUser: true,
        liked: true,
        author: 'John Doe'
      },
      {
        title: "Effect of gut microbiota on depressive-like behaviors in mice is mediated by the endocannabinoid system",
        category: "physics",
        price: 13.36,
        type: 'tradable',
        verifiedUser: false,
        liked: false,
        author: 'John Doe'
      },
      {
        title: "Design of molecular water oxidation catalysts with earth-abundant metal ions",
        category: "chemistry",
        price: 13.36,
        type: 'endorsable',
        verifiedUser: false,
        liked: false,
        author: 'John Doe'
      },
    ];

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
              <NftListTabs />
              <div className="homepage-nft-list">
                {fakeNftList.map(nft => (
                  <NftItem
                    title={nft.title}
                    category={nft.category}
                    price={nft.price}
                    type={nft.type}
                    verifiedUser={nft.verifiedUser}
                    liked={nft.liked}
                    author={nft.author}
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
};

export default Home;