import * as React from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';

import Transactions from '../components/Transactions/Transactions.component';

class PreferencesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = async () => {};

  render() {
    return <Text>Trends</Text>;
  }
}

export default PreferencesScreen;

const styles = StyleSheet.create({});
