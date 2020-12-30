import {connect} from 'react-redux';
import Transactions from './Transactions.component';
import {SORT_BY_OPTIONS} from '../../constants';

const getSortedTransactions = (transactions, filter) => {
  switch (filter) {
    case SORT_BY_OPTIONS.RATING:
      return transactions.sort((a, b) => b.rating - a.rating);
    case SORT_BY_OPTIONS.AMOUNT:
      return transactions.sort((a, b) => b.amount - a.amount);
    default:
      return transactions.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }
};

const mapStateToProps = (state) => ({
  transactions: getSortedTransactions(
    state.transactions[state.selectedTimeRangeFilter]
      ? state.transactions[state.selectedTimeRangeFilter].data
      : [],
    state.selectedSortByOption,
  ),
});

export default connect(mapStateToProps, null)(Transactions);
