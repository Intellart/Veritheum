// @flow
import React from 'react';
import type { Node } from 'react';
import Logo from '../../../assets/logo/veritheum_logo_only_white.svg';
import './Loader.scss';

function Loader(): Node {
  return (
    <div className="loading-wrapper">
      <div className="atom-wrapper">
        <div className="coin">
          <img src={Logo} alt="logo" />
        </div>
      </div>
      <h1>We are getting everything ready for you...</h1>
      <h2>Please be patient</h2>
    </div>
  );
}

export default Loader;
