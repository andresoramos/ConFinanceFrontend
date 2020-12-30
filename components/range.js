import {TIME_RANGE_FILTERS} from '../constants';

const END_DATE = new Date();
const START_DATE = new Date(
  END_DATE.getFullYear(),
  END_DATE.getMonth(),
  END_DATE.getDate(),
);
export default function (filter) {
  switch (filter) {
    case TIME_RANGE_FILTERS.THIS_WEEK: {
      return {start: START_DATE.addDays(-7), end: END_DATE};
    }
    case TIME_RANGE_FILTERS.LAST_14_DAYS: {
      return {start: START_DATE.addDays(-14), end: END_DATE};
    }
    case TIME_RANGE_FILTERS.THIS_MONTH: {
      return {start: START_DATE.addDays(-30), end: END_DATE};
    }
    case TIME_RANGE_FILTERS.LAST_MONTH: {
      return {start: START_DATE.addMonths(-1), end: END_DATE};
    }
    case TIME_RANGE_FILTERS.LAST_3_MONTHS: {
      return {start: START_DATE.addMonths(-3), end: END_DATE};
    }
    case TIME_RANGE_FILTERS.LAST_6_MONTHS: {
      return {start: START_DATE.addMonths(-6), end: END_DATE};
    }
    case TIME_RANGE_FILTERS.THIS_YEAR: {
      return {start: START_DATE.addYears(-1), end: END_DATE};
    }
    case TIME_RANGE_FILTERS.LAST_YEAR: {
      return {start: START_DATE.addYears(-1), end: END_DATE};
    }
    default: {
      return {start: START_DATE.addYears(-5), end: END_DATE};
    }
  }
}

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
Date.prototype.addMonths = function (months) {
  var date = new Date(this.valueOf());
  date.setMonth(date.getMonth() + months);
  return date;
};
Date.prototype.addYears = function (years) {
  var date = new Date(this.valueOf());
  date.setFullYear(date.getFullYear() + years);
  return date;
};
