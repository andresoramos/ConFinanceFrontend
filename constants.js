import ICON_MAP from './categories_icon_map';

export const RATINGS = {
  POOR: 3,
  OUTSTANDING: 8,
};
export const VISIBILITY_FILTERS = {
  ALL: 'all',
  COMPLETED: 'completed',
  INCOMPLETE: 'incomplete',
};

export const TIME_RANGE_FILTERS = {
  THIS_WEEK: 'This week',
  LAST_14_DAYS: 'Last 14 days',
  THIS_MONTH: 'This Month',
  LAST_MONTH: 'Last Month',
  LAST_3_MONTHS: 'Last 3 months',
  LAST_6_MONTHS: 'Last 6 months',
  THIS_YEAR: 'This Year',
  LAST_YEAR: 'Last Year',
  ALL_TIME: 'All Time',
};

export const DEFAULT_TIME_RANGE_FILTER = TIME_RANGE_FILTERS.LAST_3_MONTHS;

export const SORT_BY_OPTIONS = {
  DATE: 'Date',
  RATING: 'Rating',
  AMOUNT: 'Amount',
};

export const CHART_TYPE_OPTIONS = {
  RATING_BREAKDOWN: {title: 'Transaction Ratings', icon: 'chart-pie', size: 40},
  AVERAGE_RATING: {
    title: 'Rating over Time',
    icon: 'chart-timeline-variant',
    size: 50,
  },
  CATEGORIES_BREAKDOWN: {
    title: 'Transactions by Category',
    icon: 'chart-arc',
    size: 50,
  },
};

let newArr = [];
var categoryCount = {};

Object.keys(ICON_MAP).map((key) => {
  newArr = newArr.concat(ICON_MAP[key].hierarchy);
});

newArr.forEach((e) => {
  if (categoryCount[e]) {
    categoryCount[e]++;
  } else {
    categoryCount[e] = 1;
  }
});

export const TRANSACTION_CATEGORIES = Object.keys(categoryCount).filter(
  (k) => categoryCount[k] > 2,
);
