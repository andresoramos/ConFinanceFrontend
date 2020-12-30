import {UPDATE_USER_LOADING, LOG_IN, LOG_OUT} from '../actions/user.action';

export default function (
  state = {
    currUser: null,
    loading: false,
  },
  action,
) {
  switch (action.type) {
    case UPDATE_USER_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case LOG_IN:
      return {
        currUser: action.currUser,
        loading: false,
      };
    case LOG_OUT:
      return {
        currUser: null,
        loading: false,
      };
    default:
      return state;
  }
}
