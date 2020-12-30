import * as React from 'react';
import {View} from 'react-native';
import TransactionsSearchBar from './TransactionsSearchBar/TransactionsSearchBar.component';
import styles from './TransactionsHeader.component.style';
import TransactionsService from '../../services/transactions.service';
import SortByFilterContainer from '../Filters/SortByFilter/SortByFilter.container';
import CategoriesFilterContainer from '../Filters/CategoriesFilter/CategoriesFilter.container';

class TransactionsHeader extends React.Component {
  constructor(props) {
    super(props);
    this.transactionCategories = TransactionsService.getTransactionCategories();

    this.state = {
      showSearchBar: false,
      isSortByDropdownOpen: false,
      isTimeRangeFilterDropdownOpen: false,
      isCategoriesDropdownOpen: false,
    };
  }
  changeVisibility(state) {
    this.setState({
      isSortByDropdownOpen: false,
      isTimeRangeFilterDropdownOpen: false,
      isCategoriesDropdownOpen: false,
      ...state,
    });
  }
  showHideSearchBar = (show) => {
    if (typeof show == 'undefined') {
      show = !this.state.showSearchBar;
    }
    this.setState({showSearchBar: show});
  };

  render() {
    return (
      <View style={styles.headerContainer}>
        <TransactionsSearchBar
          showSearchBar={this.state.showSearchBar}
          showHideSearchBar={this.showHideSearchBar}
        />

        {!this.state.showSearchBar && (
          <SortByFilterContainer
            isVisible={this.state.isSortByDropdownOpen}
            onOpen={() =>
              this.changeVisibility({
                isSortByDropdownOpen: true,
              })
            }
            onClose={() =>
              this.setState({
                isSortByDropdownOpen: false,
              })
            }
          />
        )}

        {!this.state.showSearchBar && (
          <CategoriesFilterContainer
            isVisible={this.state.isCategoriesDropdownOpen}
            onOpen={() =>
              this.changeVisibility({
                isCategoriesDropdownOpen: true,
              })
            }
            onClose={() =>
              this.setState({
                isCategoriesDropdownOpen: false,
              })
            }
          />
        )}
      </View>
    );
  }
}

export default TransactionsHeader;
