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
    const selectedValue = label;

    this.setState({ checked: !this.state.checked });
    this.props.filterNftsByCategory(selectedValue);
  };

  render () {
    const { checked } = this.state;
    const { label } = this.props;
    const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1);

    return (
      <div className="gallery-side-menu-checkbox" onClick={this.handleClick}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />} {capitalizedLabel}
      </div>
    );
  }
}

export default GallerySideMenuCheckbox;
