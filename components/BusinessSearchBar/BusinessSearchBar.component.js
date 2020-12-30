import React from 'react';
import {SearchBar} from 'react-native-elements';
import styles from './BusinessSearchBar.component.style';

class BusinessSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }
  updateSearch = (search) => {
    this.setState({search});
  };

  render() {
    const {search} = this.state;

    return (
      <SearchBar
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.inputContainer}
        round
        lightTheme
        placeholder="Search for businesses..."
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
}

export default BusinessSearchBar;
