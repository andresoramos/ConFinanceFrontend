import {
  INVALIDATE_TIME_RANGE_FILTER,
  REQUEST_TRANSACTIONS,
  RECEIVE_TRANSACTIONS,
} from '../actions/user.action';

export default function (state = {}, action) {
  switch (action.type) {
    case INVALIDATE_TIME_RANGE_FILTER:
    case RECEIVE_TRANSACTIONS:
    case REQUEST_TRANSACTIONS:
      return {
        ...state,
        [action.filter]: transactionsActions(state[action.filter], action),
      };
    default:
      return state;
  }
}

const transactionsActions = (
  state = {
    loading: false,
    didInvalidate: false,
    data: [],
  },
  action,
) => {
  switch (action.type) {
    case INVALIDATE_TIME_RANGE_FILTER:
      return {
        ...state,
        didInvalidate: true,
      };
    case REQUEST_TRANSACTIONS:
      return {
        ...state,
        loading: true,
        didInvalidate: false,
      };
    case RECEIVE_TRANSACTIONS:
      return {
        ...state,
        loading: false,
        didInvalidate: false,
        data: action.data,
        lastUpdated: action.receivedAt,
      };
    default:
      return state;
  }
};
