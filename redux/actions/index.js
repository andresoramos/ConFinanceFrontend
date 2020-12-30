import TransactionsService from '../../services/transactions.service';
import AuthService from '../../services/auth.service';

export const SELECT_CHART_TYPE = 'SELECT_CHART_TYPE';
export const SORT_BY = 'SORT_BY';
export const SELECT_TIME_RANGE_FILTER = 'SELECT_TIME_RANGE_FILTER';
export const INVALIDATE_TIME_RANGE_FILTER = 'INVALIDATE_TIME_RANGE_FILTER';
export const REQUEST_TRANSACTIONS = 'REQUEST_TRANSACTIONS';
export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const UPDATE_USER_LOADING = 'UPDATE_USER_LOADING';

export const selectChartType = (chartTypeOption) => {
  return {
    type: SELECT_CHART_TYPE,
    chartTypeOption,
  };
};
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
  transactions: data,
  receivedAt: Date.now(),
});

const fetchTransactions = (filter) => (dispatch) => {
  dispatch(requestTransactions(filter));
  return TransactionsService.getTransactionsForRange(filter).then((response) =>
    dispatch(receiveTransactions(filter, response)),
  );
};

const shouldFetchTransactions = (state, filter) => {
  const transactions = state.transactions[filter];
  if (!transactions) {
    return true;
  }
  if (transactions.isFetching) {
    return false;
  }
  return transactions.didInvalidate;
};

export const fetchTransactionsIfNeeded = (filter) => (dispatch, getState) => {
  if (shouldFetchTransactions(getState(), filter)) {
    return dispatch(fetchTransactions(filter));
  }
};

export const updateUserLoading = (loading) => ({
  type: UPDATE_USER_LOADING,
  isLoading: loading,
});

export const logOut = () => (dispatch) => {
  dispatch(updateUserLoading(true));
  return AuthService.logOut().then(() => {
    dispatch(doLogOut());
  });
};

const doLogOut = () => ({
  type: LOG_OUT,
});

export const logIn = (data) => ({
  type: LOG_IN,
  currUser: data,
  receivedAt: Date.now(),
});

const fetchCurrUser = () => (dispatch) => {
  dispatch(updateUserLoading(true));
  return AuthService.getCurrUser().then((response) => {
    if (response) {
      dispatch(logIn(response));
    } else {
      dispatch(updateUserLoading(false));
    }
  });
};

const shouldFetchCurrUser = (state) => {
  if (!state.user.currUser) {
    return true;
  }
  if (state.user.isLoading) {
    return false;
  }
};

export const fetchCurrUserIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchCurrUser(getState())) {
    return dispatch(fetchCurrUser());
  }
};
