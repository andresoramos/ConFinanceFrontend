import AuthService from '../../services/auth.service';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const UPDATE_USER_LOADING = 'UPDATE_USER_LOADING';

export const updateUserLoading = (loading) => ({
  type: UPDATE_USER_LOADING,
  loading: loading,
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

const doFetchCurrUser = () => (dispatch) => {
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
  if (state.user.loading) {
    return false;
  }
};

export const fetchCurrUser = () => (dispatch, getState) => {
  if (shouldFetchCurrUser(getState())) {
    return dispatch(doFetchCurrUser());
  }
};
