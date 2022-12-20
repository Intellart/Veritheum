// @flow
/* eslint-disable camelcase */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { IoHeart, IoHeartOutline, IoShieldCheckmarkSharp } from 'react-icons/io5';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import User from '../../../assets/icons/user.svg';
import { actions } from '../../../store/nftStore';
import { calcExchangeRate, findNftLike } from '../../../utils';
import { selectors as exchangeRatesSelectors } from '../../../store/exchangeRatesStore';
import { submitSellRequest, submitCloseSellRequest, submitBuyRequest } from '../../../utils/plutus_helpers';
import type { Nft, NftLike } from '../../../store/nftStore';
import type { Utxo } from '../../../store/walletStore';
import type { State as ExchangeRates } from '../../../store/exchangeRatesStore';
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
  exchangeRates: ExchangeRates,
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
    const {
      data, trending, userId, exchangeRates
    } = this.props;
    const {
      tradeable, category, name, verified, owner, price, asset_name, policy_id, url, state, fingerprint
    } = data;
    const like = findNftLike(data, userId);
    const userIsOwner = userId === owner.id;

    let type;
    if (tradeable === true) {
      type = 'Tradeable';
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
              <div className="nft-image">
                <img src={url} height={200} width={200} alt="nft"></img>
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
              <div className="nft-image">
                <img src={url}></img>
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
                        ≈ $ {calcExchangeRate(exchangeRates, Number(price), 'usd')}
                      </div>
                    </div>
                  </div>
                  <div className="group">
                    <div className="info-label">
                      Author
                    </div>
                    <Link to={`/profile/${owner.id}`} className="author">
                      <div className="author-image">
                        <img src={User} alt="User" />
                      </div>
                      {owner.full_name}
                    </Link>
                  </div>
                  { userId && (
                    <div className='group'>
                    { userIsOwner ? (
                      <>
                      { state === 'on_sale' ? (
                        <button className='close-nft-btn' onClick={() => submitCloseSellRequest(asset_name, fingerprint, price, this.props)}>
                          Close sale
                        </button>
                      ) : (
                        <button className='sell-nft-btn' onClick={() => submitSellRequest(asset_name, fingerprint, this.props)}>
                          Sell
                        </button>
                      ) }
                      </>
                    ) : (
                      <>
                      { state === 'on_sale' && (
                        <button className='buy-nft-btn' onClick={() => submitBuyRequest(asset_name, fingerprint, price, this.props)}>
                          Buy
                        </button>
                      )}
                      </>
                    )}
                  </div>
                  )}
                </>
              ) : (
                <>
                  <div className="group">
                    {/* TODO: implement endorsers on an NFT */}
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
  exchangeRates: exchangeRatesSelectors.getExchangeRates(state),
});

export default (connect(mapStateToProps)(NftItem): React$ComponentType<Props>);
