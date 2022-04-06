import React from 'react';
import { IoHeart, IoHeartOutline, IoShieldCheckmarkSharp } from "react-icons/io5";
import User from '../../../assets/icons/user.svg';
import './NftItem.scss';

class NftItem extends React.Component {
  render () {
    const {
      title, category, price, author,
      liked, type, verifiedUser, trending,
    } = this.props;
    return (
      <>
        {trending ? (
          <div className={`trending-nft-item ${category}`}>
            <div className="trending-nft-item-top-info">
              <div className="title">
                {title}
              </div>
            </div>
            <div className="trending-nft-item-bottom-info">
              <div className="trending-nft-item-type">
                {type}
              </div>
              <div className="group">
                {verifiedUser && (
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
            <div className="nft-item-title-wrapper">
              <div className="nft-item-title">
                {title}
              </div>
            </div>
            <div className="nft-item-top-info">
              <div className="group">
                <div className={`category ${category}`}>
                  {category}
                </div>
              </div>
              <div className="group">
                {verifiedUser && (
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
              {type === 'endorsable' ? (
                <>
                  <div className="group">
                    <div className="info-label">
                      Endorsed by
                    </div>
                    <div className="endorsed-by-info">
                      <div className="top-endorser">
                        <img src={User} alt="User image" />
                      </div>
                      <div className="top-endorser">
                        <img src={User} alt="User image" />
                      </div>
                      <div className="top-endorser">
                        <img src={User} alt="User image" />
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
              ) : (
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
                        <img src={User} alt="User image" />
                      </div>
                      {author}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
};

export default NftItem;