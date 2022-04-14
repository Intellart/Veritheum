import React from 'react';
import { MdChevronRight } from 'react-icons/md';
import './Selectbox.scss';

type State = {
  isOpen: boolean,
};

type Props = {
  label: String,
}

class Selectbox extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }

  selectBoxRef: ?HTMLElement;

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick);
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleOutsideClick);
  }

  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  handleOutsideClick = (e: any) => {
    const isDescendant = this.selectBoxRef && this.selectBoxRef.contains(e.target);
    if (this.state.isOpen && !isDescendant) {
      this.setState({ isOpen: false });
    }
  };

  render () {
    const { isOpen } = this.state;

    return (
      <div className={`selectbox ${isOpen ? 'open' : ''}`} ref={(node) => { this.selectBoxRef = node; }} onClick={this.handleClick}>
        <div className="selected">
          All items
        </div>
        <div className="icon-wrapper">
          <MdChevronRight />
        </div>
        {isOpen && (
          <div className="selectbox-options">
            <ul>
              <li>Tradable items</li>
              <li>Endorsable items</li>
            </ul>
          </div>
        )}
      </div>
    );

  }
};

export default Selectbox;