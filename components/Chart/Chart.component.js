import * as React from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';
import {Colors} from '../../colors';

import HighchartsReactNative from '@highcharts/highcharts-react-native';
import Trends from '../../services/transactions.service';

const modules = ['drilldown'];
const Chart = ({meta, series, drilldown}) =>
  meta && (
    <HighchartsReactNative
      styles={styles.highchartsContainer}
      options={{
        chart: {
          type: meta.type,
        },
        title: {
          text: meta.title,
        },
        subtitle: {
          text: meta.subtitle,
        },

        accessibility: {
          announceNewData: {
            enabled: true,
          },
          point: {
            valueSuffix: '/10', //%',
          },
        },
        xAxis: {
          type: 'datetime',
          labels: {
            formatter: function () {
              return Highcharts.dateFormat('%b %e', this.value);
            },
          },
        },
        yAxis: {
          title: {
            text: 'Rating',
          },
          min: 0,
          max: 10,
          labels: {step: 1},
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: false,
              format: '{point.name}: {point.y:.1f}%',
            },
          },
        },

        tooltip: {
          headerFormat:
            '' /*'<span style="font-size:11px">{series.name}</span><br>', */,
          pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b><br/>',
        },

        series: series,
        drilldown: drilldown,
      }}
      modules={modules}
    />
  );

export default Chart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flex: 1,
  },
  highchartsContainer: {
    flexGrow: 1,
  },
  filtersContainer: {height: 40, flexDirection: 'row'},
});
