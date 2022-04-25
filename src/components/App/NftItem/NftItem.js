import React from 'react';
import { IoHeart, IoHeartOutline, IoShieldCheckmarkSharp } from 'react-icons/io5';
import User from '../../../assets/icons/user.svg';
import './NftItem.scss';

type Props = {
  categoryId: number,
  tradeable: boolean,
  price: number,
  author: string,
  verified: boolean,
  name: string,
  trending?: boolean,
}

class NftItem extends React.Component<Props> {
  render () {
    const {
      categoryId, tradeable, price,
      author, verified, name, trending,
    } = this.props;

    let category;
    if (categoryId === 1) {
      category = 'biology';
    } else if (categoryId === 2) {
      category = 'physics';
    } else {
      category = 'chemistry';
    }

    let type;
    if (tradeable === true) {
      type = 'Tradable';
    } else {
      type = 'Endorsable';
    }

    const liked = false;

    return (
      <div className="nft-item-wrapper">
        {trending ? (
          <div className={`trending-nft-item ${category}`}>
            <div className="trending-nft-item-top-info">
              <div className="name">
                {name}
              </div>
            </div>
            <div className="trending-nft-item-bottom-info">
              <div className="trending-nft-item-type">
                {type}
              </div>
              <div className="group">
                {verified && (
                  <div className="verified-user">
                    <IoShieldCheckmarkSharp />
                  </div>
                )}
                <div className="like-button">
                  {liked ? <IoHeart /> : <IoHeartOutline /> }
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="nft-item">
            <div className="nft-item-name-wrapper">
              <div className="nft-item-name">
                {name}
              </div>
            </div>
            <div className="nft-item-top-info">
              <div className="group">
                <div className={`category ${category}`}>
                  {category}
                </div>
              </div>
              <div className="group">
                {verified && (
                  <div className="verified-user">
                    <IoShieldCheckmarkSharp />
                  </div>
                )}
                <div className="like-button">
                  {liked ? <IoHeart /> : <IoHeartOutline /> }
                </div>
              </div>
            </div>
            <div className="nft-item-bottom-info">
              {tradeable ? (
                <>
                  <div className="group">
                    <div className="info-label">
                      Price
                    </div>
                    <div className="price-info">
                      {price} ADA
                      <div className="to-dollars">
                        ≈ $ 12.75
                      </div>
                    </div>
                  </div>
                  <div className="group">
                    <div className="info-label">
                      Author
                    </div>
                    <div className="author">
                      <div className="author-image">
                        <img src={User} alt="User" />
                      </div>
                      {author}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="group">
                    <div className="info-label">
                      Endorsed by
                    </div>
                    <div className="endorsed-by-info">
                      <div className="top-endorser">
                        <img src={User} alt="User" />
                      </div>
                      <div className="top-endorser">
                        <img src={User} alt="User" />
                      </div>
                      <div className="top-endorser">
                        <img src={User} alt="User" />
                      </div>
                      <div className="other-endorsers">
                        +27
                      </div>
                    </div>
                  </div>
                  <div className="group align-end">
                    <div className="endorse-btn">
                      Endorse
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default NftItem;
