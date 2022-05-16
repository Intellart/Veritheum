import React from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import { map } from 'lodash';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import NftItem from '../NftItem/NftItem';
import { selectors as nftSelectors } from '../../../store/nftStore';
import type { Nft } from '../../../store/nftStore';
import './TrendingToday.scss';

type Props = {
  nftList: Nft[],
}

class TrendingToday extends React.Component<Props> {
  render () {
    const { nftList } = this.props;
    const getSlide = (lowestIndex, highestIndex) => (
      <div className="slide">
        {map(nftList, (nft: Nft, i) => {
          if (i < lowestIndex || i > highestIndex) return null;

          return (
            <NftItem
              key={nft.fingerprint}
              data={nft}
              trending
            />
          );
        })}
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
        );
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
        );
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
        </div>;
      }
    };

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

export default (connect(mapStateToProps, null)(TrendingToday): React$ComponentType<{}>);
