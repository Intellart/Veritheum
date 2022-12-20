import React from 'react';
import './NavigationFilterResults.scss';

type Props = {
  filteredNftList: Nft[],
}

function NavigationFilterResults({ filteredNftList }: Props) {
  return (
    <div className='filter-results-wrapper'>
      {filteredNftList.map((nft) => (
        <div className='nft-result' key={nft.fingerprint}>{nft.name}</div>
      ))}
    </div>
  );
}

export default NavigationFilterResults;