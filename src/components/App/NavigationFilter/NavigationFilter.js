/* eslint-disable react/function-component-definition */
import React from 'react';
import { IoSearch } from 'react-icons/io5';
import './NavigationFilter.scss';

type Props = {
  onChange: () => void;
}

const NavigationFilter = ({ onChange }: Props) => (
  <div className="navigation-filter">
    <IoSearch />
    <input placeholder="Collection, item or user" onChange={(e) => onChange(e.target.value)} />
  </div>
);

export default NavigationFilter;
