import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import NftItem from '../NftItem/NftItem';
import { fakeNftList as nftList } from '../../../utils/fakeNftList';
import './TrendingToday.scss';
class TrendingToday extends React.Component {
  render () {
    const getSlide = (lowestIndex, highestIndex) => {
      return (
        <div className="slide">
          {nftList.map((nft, i) => (
            <React.Fragment key={i}>
              {i >= lowestIndex && i <= highestIndex && (
                <NftItem
                  key={i}
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
    }

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
};

export default TrendingToday;