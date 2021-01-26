import {combineReducers} from 'redux';
import {createAction} from '@reduxjs/toolkit';

import {createSlice} from '@reduxjs/toolkit';
import {
  SORT_BY_OPTIONS,
  CHART_TYPE_OPTIONS,
  DEFAULT_TIME_RANGE_FILTER,
} from '../../constants';
import {
  SORT_BY,
  SELECT_CHART_TYPE,
  SELECT_TIME_RANGE_FILTER,
  INVALIDATE_TIME_RANGE_FILTER,
  REQUEST_TRANSACTIONS,
  RECEIVE_TRANSACTIONS,
} from '../actions';

import user from './user.reducer';
import {State} from 'react-native-gesture-handler';

const feedBackSlice = createSlice({
  name: 'companyFeedback',
  initialState: {questions: {hi: 'You made it!'}, name: ''},

  reducers: {
    updateQuestions: (state, action) => {
      console.log('deal with this once it works');
    },
  },
});

const slice = createSlice({
  name: 'search',
  initialState: {nearbyBusinesses: [], favoritedBusinesses: []},
  reducers: {
    updateNearbyBusinesses: (state, action) => {
      state.nearbyBusinesses = action.payload.businesses;
    },
    updateFavoriteBusinesses: (state, action) => {
      state.favoritedBusinesses = action.payload.favoritedBusinesses;
    },
    favoriteBusinessRemoved: (state, action) => {
      const {id} = action.payload;
      let index;
      for (var i = 0; i < state.favoritedBusinesses.length; i++) {
        if (state.favoritedBusinesses[i]._id === id) {
          index = i;
          break;
        }
      }

      state.favoritedBusinesses.splice(index, 1);
    },
    favoritedBusinessAdded: (state, action) => {
      const {business} = action.payload;
      state.favoritedBusinesses.push(business);
    },
    ratingAdded: (state, action) => {
      const {companyId, userId, rating} = action.payload.payload;
      for (var i = 0; i < state.nearbyBusinesses.length; i++) {
        if (state.nearbyBusinesses[i]._id === companyId) {
          if (state.nearbyBusinesses[i].ourRating) {
            state.nearbyBusinesses[i].ourRating[userId] = {rating};
            break;
          } else {
            state.nearbyBusinesses[i].ourRating = {[userId]: {rating}};
          }
        }
      }
    },
    commentObjAdded: (state, action) => {
      const {
        rating,
        commentText,
        userId,
        companyId,
        timeStamp,
      } = action.payload.commentObj;

      for (var i = 0; i < state.nearbyBusinesses.length; i++) {
        if (state.nearbyBusinesses[i]._id === companyId) {
          if (!state.nearbyBusinesses[i].ourReviews) {
            const ourReviews = {
              [userId]: {[timeStamp]: {comment: commentText, rating}},
            };
            state.nearbyBusinesses[i].ourReviews = ourReviews;
          } else {
            state.nearbyBusinesses[i].ourReviews = {
              ...state.nearbyBusinesses[i].ourReviews,
              [userId]: {
                ...state.nearbyBusinesses[i].ourReviews[userId],
                [timeStamp]: {comment: commentText, rating},
              },
            };
          }
        }
      }
    },
  },
});
const companyFeedbackReducer = feedBackSlice.reducer;
const searchReducer = slice.reducer;
const businessUpdateBegan = createAction('search/updateNearbyBusinesses');
const favBusinessUpdateBegan = createAction('search/updateFavoriteBusinesses');
const removeFavBusinessBegan = createAction('search/favoriteBusinessRemoved');
const addFavBusinessBegan = createAction('search/favoritedBusinessAdded');
const addRatingBegan = createAction('search/ratingAdded');
const addCommentObj = createAction('search/commentObjAdded');

export const addCommentObject = (commentObj) => {
  return addCommentObj({
    commentObj,
  });
};

export const addRatingToState = (payload) => {
  return addRatingBegan({
    payload,
  });
};
export const removeFavoriteBusiness = (id) => {
  return removeFavBusinessBegan({
    id,
  });
};
export const addFavoriteBusiness = (business) => {
  return addFavBusinessBegan({
    business,
  });
};
export const updateBusinesses = (businesses) => {
  return businessUpdateBegan({
    businesses,
  });
};
export const updateFavBusinesses = (favoritedBusinesses) => {
  return favBusinessUpdateBegan({
    favoritedBusinesses,
  });
};

//import transactions from './transactions.reducer';
import {addRating} from './../../services/rating.service';

const selectedChartTypeOption = (
  state = CHART_TYPE_OPTIONS.AVERAGE_RATING,
  action,
) => {
  switch (action.type) {
    case SELECT_CHART_TYPE:
      return action.chartTypeOption;
    default:
      return state;
  }
};

const selectedSortByOption = (state = SORT_BY_OPTIONS.DATE, action) => {
  switch (action.type) {
    case SORT_BY:
      return action.sortByOption;
    default:
      return state;
  }
};

const selectedTimeRangeFilter = (state = DEFAULT_TIME_RANGE_FILTER, action) => {
  switch (action.type) {
    case SELECT_TIME_RANGE_FILTER:
      return action.filter;
    default:
      return state;
  }
};

const transactionsActions = (
  state = {
    isFetching: false,
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
        isFetching: true,
        didInvalidate: false,
      };
    case RECEIVE_TRANSACTIONS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        data: action.data,
        lastUpdated: action.receivedAt,
      };
    default:
      return state;
  }
};

const transactions = (state = {}, action) => {
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
};

const rootReducer = combineReducers({
  user,
  transactions,
  selectedTimeRangeFilter,
  selectedSortByOption,
  selectedChartTypeOption,
  searchReducer,
  companyFeedbackReducer,
});

export default rootReducer;
