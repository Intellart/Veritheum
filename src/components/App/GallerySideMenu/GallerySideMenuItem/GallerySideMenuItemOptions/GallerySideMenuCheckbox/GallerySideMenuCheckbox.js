import React from 'react';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import './GallerySideMenuCheckbox.scss';

type State = {
  checked: boolean,
}

type Props = {
  label: String,
  filterNftsByCategory: Function,
}

class GallerySideMenuCheckbox extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  handleClick = () => {
    const { label } = this.props;

    let selectedValue;
    if (label === 'Biology') {
      selectedValue = 'biology';
    } else if (label === 'Physics') {
      selectedValue = 'physics';
    } else if (label === 'Chemistry') {
      selectedValue = 'chemistry';
    }

    this.setState({ checked: !this.state.checked });
    this.props.filterNftsByCategory(selectedValue);
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
}

export default GallerySideMenuCheckbox;
