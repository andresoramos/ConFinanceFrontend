import TransactionsService from '../../services/transactions.service';

export const SELECT_CHART_TYPE = 'SELECT_CHART_TYPE';
export const SORT_BY = 'SORT_BY';
export const SELECT_TIME_RANGE_FILTER = 'SELECT_TIME_RANGE_FILTER';
export const INVALIDATE_TIME_RANGE_FILTER = 'INVALIDATE_TIME_RANGE_FILTER';
export const REQUEST_TRANSACTIONS = 'REQUEST_TRANSACTIONS';
export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS';

export const selectChartType = (chartTypeOption) => ({
  type: SELECT_CHART_TYPE,
  chartTypeOption,
});
export const sortBy = (sortByOption) => ({
  type: SORT_BY,
  sortByOption,
});
export const selectTimeRangeFilter = (filter) => ({
  type: SELECT_TIME_RANGE_FILTER,
  filter,
});
export const invalidateTimeRangeFilter = (filter) => ({
  type: INVALIDATE_TIME_RANGE_FILTER,
  filter,
});
export const requestTransactions = (filter) => ({
  type: REQUEST_TRANSACTIONS,
  filter,
});

export const receiveTransactions = (filter, data) => ({
  type: RECEIVE_TRANSACTIONS,
  filter,
  data: data,
  receivedAt: Date.now(),
});

const doFetchTransactions = (accessTokens, filter) => (dispatch) => {
  dispatch(requestTransactions(filter));
  return TransactionsService.getTransactionsForRange(accessTokens, filter).then(
    (response) => {
      dispatch(receiveTransactions(filter, response));
    },
  );
};

const shouldFetchTransactions = (state, filter) => {
  const transactions = state.transactions[filter];
  if (!transactions) {
    return true;
  }
  if (transactions.loading) {
    return false;
  }
  return transactions.didInvalidate;
};

export const fetchTransactions = (filter) => (dispatch, getState) => {
  if (shouldFetchTransactions(getState(), filter)) {
    return dispatch(
      doFetchTransactions(
        getState().user.currUser.accessTokens
          ? getState().user.currUser.accessTokens
          : [],
        filter,
      ),
    );
  }
};
