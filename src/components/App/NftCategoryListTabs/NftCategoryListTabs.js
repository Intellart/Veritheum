import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { actions, Category } from '../../../store/categoriesStore';
import './NftCategoryListTabs.scss';

type Props = {
  selectedTab: Number,
  handleTabSelect: Function,
  dispatch: Function,
  categories: Array<Category>
}

class NftCategoryListTabs extends React.Component<Props> {
  componentDidMount() {
    this.props.dispatch(actions.getCategories());
  }

  render () {
    const { selectedTab, handleTabSelect, categories } = this.props;

    return (
      <div className="nft-list-tabs">
        <div className={`tab all ${selectedTab === null ? 'active' : ''}`} onClick={() => handleTabSelect(null)}>
          All
        </div>
        {map(categories, category => (
          <div
            key={category.id}
            className={`tab ${category.category_name} ${selectedTab === category.category_name ? 'active' : ''}`}
            onClick={() => handleTabSelect(category.category_name)}
          >
            {category.category_name}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  categories: state.categories,
});

export default (connect(mapStateToProps)(NftCategoryListTabs): React$ComponentType<{}>);
