import React from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import NftItem from '../NftItem/NftItem';
import { selectors as nftSelectors } from '../../../store/nftStore';
import './TrendingToday.scss';

type Props = {
  nftList: Array<Object>,
}

class TrendingToday extends React.Component<Props> {
  render () {
    const { nftList } = this.props;
    const getSlide = (lowestIndex, highestIndex) => (
      <div className="slide">
        {nftList.length > 0 && nftList.map((nft, i) => (
          <React.Fragment key={nft.fingerprint}>
            {i >= lowestIndex && i <= highestIndex && (
              <NftItem
                key={nft.fingerprint}
                category={nft.category}
                tradeable={nft.tradeable}
                price={nft.price}
                verified={nft.verified}
                owner={nft.owner}
                likes={nft.likes}
                name={nft.name}
                trending
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );

    const getSlides = () => {
      if (nftList.length > 0 && nftList.length <= 6) {
        return (
          <div className="trending-today">
            <Carousel
              autoPlay
              showThumbs={false}
            >
              {getSlide(0, 5)}
            </Carousel>
          </div>
        )
      } else if (nftList.length >= 7 && nftList.length < 13) {
        return (
          <div className="trending-today">
            <Carousel
              autoPlay
              showThumbs={false}
            >
              {getSlide(0, 5)}
              {getSlide(6, 11)}
            </Carousel>
          </div>
        )
      } else {
        <div className="trending-today">
          <Carousel
            autoPlay
            showThumbs={false}
          >
            {getSlide(0, 5)}
            {getSlide(6, 11)}
            {getSlide(12, 17)}
          </Carousel>
        </div>
      }
    }

    return (
      <>
        {getSlides()}
      </>
    );
  }
}

const mapStateToProps = state => ({
  nftList: nftSelectors.getNfts(state),
});

export default connect(mapStateToProps, null)(TrendingToday);
