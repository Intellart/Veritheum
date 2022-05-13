// @flow
import React from 'react';
import { IoHeart, IoHeartOutline, IoShieldCheckmarkSharp } from 'react-icons/io5';
import { connect } from 'react-redux';
import { get } from 'lodash';
import User from '../../../assets/icons/user.svg';
import { actions } from '../../../store/nftStore';
import { findNftLike } from '../../../utils';
import type { Nft, NftLike } from '../../../store/nftStore';
import type { ReduxState } from '../../../types';
import './NftItem.scss';

type Props = {
  data: Nft,
  trending?: boolean,
}

type ReduxProps = {
  ...Props,
  dispatch: Function,
  userId: ?number,
}

class NftItem extends React.Component<ReduxProps> {
  handleLike = (like: ?NftLike) => {
    const {
      dispatch, userId, data, trending,
    } = this.props;

    if (!userId || trending) return;

    if (like) {
      dispatch(actions.dislikeNft(like.id));
    } else {
      dispatch(actions.likeNft({
        fingerprint: data.fingerprint,
        user_id: userId,
      }));
    }
  };

  render () {
    const { data, trending, userId } = this.props;
    const {
      tradeable, category, name, verified, owner, price,
    } = data;
    const like = findNftLike(data, userId);

    let type;
    if (tradeable === true) {
      type = 'Tradable';
    } else {
      type = 'Endorsable';
    }

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
                  {like ? <IoHeart /> : <IoHeartOutline /> }
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
                {category && (
                  <div className={`category ${category}`}>
                    {category}
                  </div>
                )}
              </div>
              <div className="group">
                {verified && (
                  <div className="verified-user">
                    <IoShieldCheckmarkSharp />
                  </div>
                )}
                <div className="like-button" onClick={() => this.handleLike(like)}>
                  {like ? <IoHeart /> : <IoHeartOutline /> }
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
                      {owner.full_name}
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

const mapStateToProps = (state: ReduxState) => ({
  userId: get(state, 'user.profile.id'),
});

export default (connect<ReduxProps, Props>(mapStateToProps)(NftItem): React$ComponentType<Props>);
