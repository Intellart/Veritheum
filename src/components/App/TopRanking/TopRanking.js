import React from 'react';
import User from '../../../assets/icons/user.svg';
import './TopRanking.scss';

class TopRanking extends React.Component {
  calculatePercentage = (x, y) => {
    return (((y - x) / x) * 100).toFixed(2);
  };

  render () {
    const fakeTopRankingList = [
      {
        author: "John Doe",
        initialPrice: 12.65,
        currentPrice: 27.28,
      },
      {
        author: "John Doe",
        initialPrice: 5.34,
        currentPrice: 63.11,
      },
      {
        author: "John Doe",
        initialPrice: 3.2,
        currentPrice: 12.3,
      },
      {
        author: "John Doe",
        initialPrice: 3.2,
        currentPrice: 3,
      },
      {
        author: "John Doe",
        initialPrice: 12.65,
        currentPrice: 27.28,
      },
      {
        author: "John Doe",
        initialPrice: 5.34,
        currentPrice: 63.11,
      },
      {
        author: "John Doe",
        initialPrice: 3.2,
        currentPrice: 12.3,
      },
      {
        author: "John Doe",
        initialPrice: 3.2,
        currentPrice: 3,
      },
      {
        author: "John Doe",
        initialPrice: 3.2,
        currentPrice: 3,
      },
    ];

    const getRankings = (lowestIndex, highestIndex) => {
      return (
        <div className="top-ranking-column">
          {fakeTopRankingList.map((item, i) => (
            <React.Fragment key={i}>
              {i >= lowestIndex && i <= highestIndex && (
                <div className="top-ranking">
                  <div className="top-ranking-index">
                    {i + 1}
                  </div>
                  <div className="top-ranking-user-image">
                    <img src={User} alt="User image" />
                  </div>
                  <div className="column">
                    <div className="top-ranking-upper-info">
                      <div className="top-ranking-user-name">
                        {item.author}
                      </div>
                      <div className={`top-ranking-percentage-tag ${this.calculatePercentage(item.initialPrice, item.currentPrice) < 0 ? 'negative' : ''}`}>
                        {this.calculatePercentage(item.initialPrice, item.currentPrice) > 0 && '+'}{this.calculatePercentage(item.initialPrice, item.currentPrice)}%
                      </div>
                    </div>
                    <div className="top-ranking-bottom-info">
                      <div className="top-ranking-previous-price">
                        <span>Floor price:</span> {item.initialPrice} ADA
                      </div>
                      <div className="top-ranking-current-price">
                        {item.currentPrice} ADA
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      );
    }

    return (
      <div className="top-ranking-wrapper">
        <div className="top-ranking-column">
          {getRankings(0, 2)}
        </div>
        <div className="top-ranking-column">
          {getRankings(3, 5)}
        </div>
        <div className="top-ranking-column">
          {getRankings(6, 8)}
        </div>
      </div>
    );
  }
};

export default TopRanking;