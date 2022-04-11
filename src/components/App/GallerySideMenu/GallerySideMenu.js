import React from 'react';
import {
  MdFilterList, MdArrowBack, MdChevronRight,
  MdCheckBoxOutlineBlank,
} from 'react-icons/md';
import './GallerySideMenu.scss';

type State = {
  menuClosed: boolean,
}

class GallerySideMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      menuClosed: false,
    };
  }

  handleClick = () => {
    this.setState({ menuClosed: !this.state.menuClosed });
  };

  render () {
    const { menuClosed } = this.state;

    return (
      <div className={`gallery-side-menu ${menuClosed ? 'minimized' : ''}`}>
        {menuClosed ? (
          <div className="gallery-side-menu-toggle active" onClick={this.handleClick}>
            <div className="label">
              <MdFilterList /> Filter
            </div>
            <div className="icon">
              <MdArrowBack />
            </div>
          </div>
        ) : (
          <>
            <div className="gallery-side-menu-toggle" onClick={this.handleClick}>
              <div className="label">
                <MdFilterList /> Filter
              </div>
              <div className="icon">
                <MdArrowBack />
              </div>
            </div>
            <div className="gallery-side-menu-body">
              <div className="item">
                <div className="item-toggle">
                  <div className="label">Status</div>
                  <div className="icon"><MdChevronRight /></div>
                </div>
              </div>
              <div className="item">
                <div className="item-toggle">
                  <div className="label">Price</div>
                  <div className="icon"><MdChevronRight /></div>
                </div>
              </div>
              <div className="item">
                <div className="item-toggle">
                  <div className="label">Collections</div>
                  <div className="icon"><MdChevronRight /></div>
                </div>
              </div>
              <div className="item active">
                <div className="item-toggle">
                  <div className="label">Categories</div>
                  <div className="icon"><MdChevronRight /></div>
                </div>
                <div className="item-menu">
                  <div className="item-checkbox">
                    <MdCheckBoxOutlineBlank /> Biology
                  </div>
                  <div className="item-checkbox">
                    <MdCheckBoxOutlineBlank /> Physics
                  </div>
                  <div className="item-checkbox">
                    <MdCheckBoxOutlineBlank /> Chemistry
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
};

export default GallerySideMenu;