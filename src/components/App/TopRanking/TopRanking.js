import React from 'react';
import User from '../../../assets/icons/user.svg';
import './TopRanking.scss';

class TopRanking extends React.Component {
  calculatePercentage = (x, y) => (((y - x) / x) * 100).toFixed(2);

  render () {
    const fakeTopRankingList = [
      {
        id: 1,
        author: 'John Doe',
        initialPrice: 12.65,
        currentPrice: 27.28,
      },
      {
        id: 2,
        author: 'Sidney Ortega',
        initialPrice: 5.34,
        currentPrice: 63.11,
      },
      {
        id: 3,
        author: 'Martin Stanley',
        initialPrice: 3.2,
        currentPrice: 12.3,
      },
      {
        id: 4,
        author: 'Mercedes Alvarado',
        initialPrice: 3.2,
        currentPrice: 3,
      },
      {
        id: 5,
        author: 'Elbert Brewer',
        initialPrice: 12.65,
        currentPrice: 27.28,
      },
      {
        id: 6,
        author: 'Elizabeth Oliver',
        initialPrice: 5.34,
        currentPrice: 63.11,
      },
      {
        id: 7,
        author: 'Calvin Curry',
        initialPrice: 3.2,
        currentPrice: 12.3,
      },
      {
        id: 8,
        author: 'Wade Santiago',
        initialPrice: 3.2,
        currentPrice: 3,
      },
      {
        id: 9,
        author: 'Ricky Newton',
        initialPrice: 3.2,
        currentPrice: 3,
      },
    ];

    const getRankings = (lowestIndex, highestIndex) => (
      <div className="top-ranking-column">
        {fakeTopRankingList.map((item, i) => (
          <React.Fragment key={item.id}>
            {i >= lowestIndex && i <= highestIndex && (
            <div className="top-ranking">
              <div className="top-ranking-index">
                {i + 1}
              </div>
              <div className="top-ranking-user-image">
                <img src={User} alt="User" />
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
}

export default TopRanking;
