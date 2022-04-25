import React from 'react';
import { MdChevronRight } from 'react-icons/md';
import { map } from 'lodash';
import './Selectbox.scss';

type State = {
  isOpen: boolean,
  selected: string,
};

type Props = {
  onChange: Function,
  options: Array,
}

class Selectbox extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selected: this.props.options[0].text,
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

  handleSelect = (option: number) => {
    const { onChange } = this.props;
    onChange(option.value);

    this.setState({ selected: option.text });
  };

  render () {
    const { isOpen, selected } = this.state;
    const { options } = this.props;

    const selectboxItems = map(options, (option) => (
      <li
        key={option.value}
        value={option.value}
        onClick={() => this.handleSelect(option)}
      >
        {option.text}
      </li>
    ));

    return (
      <div className={`selectbox ${isOpen ? 'open' : ''}`} ref={(node) => { this.selectBoxRef = node; }} onClick={this.handleClick}>
        <div className="selected">
          {selected}
        </div>
        <div className="icon-wrapper">
          <MdChevronRight />
        </div>
        {isOpen && (
          <div className="selectbox-options">
            <ul>
              {selectboxItems}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Selectbox;
