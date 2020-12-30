import {connect} from 'react-redux';
import {
  CHART_TYPE_OPTIONS,
  RATINGS,
  TRANSACTION_CATEGORIES,
} from '../../constants';
import Chart from './Chart.component';
import {Colors} from '../../colors';

import {randomColor} from 'randomcolor';

const getAverageRatings = (transactions) => {
  transactions = transactions.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  var cum = [0];

  var data = [];
  var lastPoint = null;

  transactions.forEach(function (t, index) {
    var cumrating = cum[index] + t.rating;
    var average = cumrating / cum.length;
    cum.push(cumrating);

    //check to see if the last point has the same sate
    if (lastPoint && lastPoint.x !== new Date(t.date).getTime()) {
      data.push(lastPoint);
    }

    lastPoint = {
      x: new Date(t.date).getTime(),
      y: average,
    };
  });

  data.push(lastPoint);
  cum.shift();

  var series = [
    {
      name: 'Average transaction rating',
      data: data,
    },
  ];
  return series;
};

const getCategoriesBreakdown = (transactions) => {
  var categoriesCount = TRANSACTION_CATEGORIES.reduce(function (map, cat) {
    map[cat] = 0;

    return map;
  }, {});

  var total = 0;
  transactions.forEach((t) => {
    t.category.forEach((c) => {
      if (typeof categoriesCount[c] != 'undefined') {
        categoriesCount[c]++;
        total++;
      }
    });
  });

  var data = [];

  Object.keys(categoriesCount).forEach((c) => {
    data.push({
      name: c,
      y: (100 * categoriesCount[c]) / total,
      label: c,
      color: randomColor(),
      drilldown: 'Outstanding',
    });
  });
  var series = [{data: data}];
  return series;
};

const getRatingsBreakdown = (transactions) => {
  let numOutstanding = transactions.filter(
    (t) => t.rating > RATINGS.OUTSTANDING,
  ).length;
  let numOk = transactions.filter(
    (t) => t.rating > RATINGS.POOR && t.rating <= RATINGS.OUTSTANDING,
  ).length;
  let numPoor = transactions.filter((t) => t.rating <= RATINGS.POOR).length;
  var series = [
    {
      name: 'Ratings',
      colorByPoint: true,
      data: [
        {
          name: 'Outstanding',
          y: (100 * numOutstanding) / transactions.length,
          color: Colors.GREEN,
          drilldown: 'Outstanding',
        },
        {
          name: 'Ok',
          y: (100 * numOk) / transactions.length,
          color: Colors.YELLOW,
          drilldown: 'Ok',
        },
        {
          name: 'Poor',
          y: (100 * numPoor) / transactions.length,
          color: Colors.RED,
          drilldown: 'Poor',
        },
      ],
    },
  ];
  console.log('get ratings breakdown');
  return series;
};

const getProps = (chartType, timeRangeFilter, transactionsMap) => {
  var transactions = transactionsMap[timeRangeFilter]
    ? transactionsMap[timeRangeFilter].data
    : [];

  console.log('get props');
  if (typeof transactions == 'undefined')
    return {
      meta: null, //{type: 'line', title: chartType, subtitle: timeRangeFilter},
      series: null,
      drilldown: null,
    };
  console.log('chart type', chartType);
  switch (chartType) {
    case CHART_TYPE_OPTIONS.RATING_BREAKDOWN.title:
      return {
        meta: {type: 'pie', title: chartType, subtitle: ''},
        series: getRatingsBreakdown(transactions),
        drilldown: [],
      };
    case CHART_TYPE_OPTIONS.CATEGORIES_BREAKDOWN.title:
      return {
        meta: {type: 'pie', title: chartType, subtitle: ''},
        series: getCategoriesBreakdown(transactions),
        drilldown: [],
      };
    case CHART_TYPE_OPTIONS.AVERAGE_RATING.title:
    default:
      return {
        meta: {type: 'line', title: chartType, subtitle: ''},
        series: getAverageRatings(transactions),
        drilldown: [],
      };
  }
};

const mapStateToProps = (state) =>
  getProps(
    state.selectedChartTypeOption,
    state.selectedTimeRangeFilter,
    state.transactions,
  );

export default connect(mapStateToProps, null)(Chart);
