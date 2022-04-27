import React from 'react';
import './NftListTabs.scss';

type Props = {
  selectedTab: Number,
  handleTabSelect: Function,
}

class NftListTabs extends React.Component<Props> {
  render () {
    const { selectedTab, handleTabSelect } = this.props;

    return (
      <div className="nft-list-tabs">
        <div className={`tab all ${selectedTab === null ? 'active' : ''}`} onClick={() => handleTabSelect(null)}>
          All
        </div>
        <div className={`tab biology ${selectedTab === 1 ? 'active' : ''}`} onClick={() => handleTabSelect(1)}>
          Biology
        </div>
        <div className={`tab physics ${selectedTab === 2 ? 'active' : ''}`} onClick={() => handleTabSelect(2)}>
          Physics
        </div>
        <div className={`tab chemistry ${selectedTab === 3 ? 'active' : ''}`} onClick={() => handleTabSelect(3)}>
          Chemistry
        </div>
      </div>
    );
  }
}

export default NftListTabs;
