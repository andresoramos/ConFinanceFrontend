import * as React from 'react';
import styles from './Transactions.component.style';
import TransactionCard from '../../components/TransactionCard/TransactionCard.component';
import {ScrollView, TouchableOpacity} from 'react-native';

const Transactions = ({transactions}) => (
  <ScrollView>
    {transactions &&
      transactions.map((transaction, id) => {
        return (
          <TouchableOpacity key={id} id={id}>
            <TransactionCard transaction={transaction}></TransactionCard>
          </TouchableOpacity>
        );
      })}
  </ScrollView>
);

export default Transactions;
