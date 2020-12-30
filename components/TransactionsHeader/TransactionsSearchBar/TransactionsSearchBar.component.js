import * as React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {Button, SearchBar} from 'react-native-elements';

import styles from './TransactionsSearchBar.component.style';
import Icon from 'react-native-vector-icons/FontAwesome';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
class TransactionsSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.search;

    this.state = {
      search: '',
    };
  }

  updateSearch = (search) => {
    this.setState({search});
  };

  componentDidUpdate = (props) => {
    if (this.props.showSearchBar) this.search.focus();
  };

  render() {
    const {search} = this.state;

    return (
      <SearchBar
        ref={(search) => (this.search = search)}
        containerStyle={[
          styles.searchBarContainer,
          this.props.showSearchBar ? '' : styles.searchHidden,
        ]}
        inputContainerStyle={styles.inputContainer}
        inputStyle={[styles.input]}
        round
        lightTheme
        searchIcon={
          <Button
            buttonStyle={styles.searchButton}
            type="clear"
            onPress={() => {
              this.props.showHideSearchBar();
            }}
            icon={<Icon name="search" size={24} color="gray" />}
          />
        }
        placeholder="Search transactions..."
        onChangeText={this.updateSearch}
        onBlur={() => this.props.showHideSearchBar(false)}
        value={search}
      />
    );
  }
}

export default TransactionsSearchBar;
