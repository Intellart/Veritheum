import React from 'react';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import './GallerySideMenuCheckbox.scss';

type State = {
  checked: boolean,
}

type Props = {
  label: String,
}

class GallerySideMenuCheckbox extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
    };
  }

  handleClick = () => {
    this.setState({ checked: !this.state.checked });
  };

  render () {
    const { checked } = this.state;
    const { label } = this.props;
    return (
      <div className="gallery-side-menu-checkbox" onClick={this.handleClick}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />} {label}
      </div>
    );

  }
};

export default GallerySideMenuCheckbox;