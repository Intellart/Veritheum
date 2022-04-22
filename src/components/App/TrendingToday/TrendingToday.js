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
        {nftList.map((nft, i) => (
          <React.Fragment key={nft.id}>
            {i >= lowestIndex && i <= highestIndex && (
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
                trending
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );

    return (
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
    );
  }
}

const mapStateToProps = state => ({
  nftList: nftSelectors.getNfts(state),
});

export default connect(mapStateToProps, null)(TrendingToday);
