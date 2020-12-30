import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import TransactionsHeader from '../components/TransactionsHeader/TransactionsHeader.component';
import TransactionsContainer from '../components/Transactions/Transactions.container';

class TransactionsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <TransactionsHeader />
        <TransactionsContainer />
      </View>
    );
  }
}

export default TransactionsScreen;

const styles = StyleSheet.create({});
