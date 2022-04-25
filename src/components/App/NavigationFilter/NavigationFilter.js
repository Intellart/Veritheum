import React from 'react';
import { IoSearch } from 'react-icons/io5';
import './NavigationFilter.scss';

class NavigationFilter extends React.Component {
  render () {
    return (
      <div className="navigation-filter">
        <IoSearch />
        <input placeholder="Collection, item or user" />
      </div>
    );
  }
}

export default NavigationFilter;
