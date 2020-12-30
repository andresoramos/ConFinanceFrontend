import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import ChartContainer from '../components/Chart/Chart.container';
import ChartTypeFilterContainer from '../components/Filters/ChartTypeFilter/ChartTypeFilter.container';
import TimeRangeFilterContainer from '../components/Filters/TimeRangeFilter/TimeRangeFilter.container';

const modules = ['drilldown'];
class TrendsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isChartTypeFilterDropdownOpen: false,
      isTimeRangeFilterDropdownOpen: false,
      isVisibleB: false,
    };
  }

  changeVisibility(state) {
    this.setState({
      isChartTypeFilterDropdownOpen: false,
      isTimeRangeFilterDropdownOpen: false,
      ...state,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.filtersContainer}>
          <ChartTypeFilterContainer
            isVisible={this.state.isChartTypeFilterDropdownOpen}
            onOpen={() =>
              this.changeVisibility({
                isChartTypeFilterDropdownOpen: true,
              })
            }
            onClose={() =>
              this.setState({
                isChartTypeFilterDropdownOpen: false,
              })
            }
          />
          <TimeRangeFilterContainer
            isVisible={this.state.isTimeRangeFilterDropdownOpen}
            onOpen={() =>
              this.changeVisibility({
                isTimeRangeFilterDropdownOpen: true,
              })
            }
            onClose={() =>
              this.setState({
                isTimeRangeFilterDropdownOpen: false,
              })
            }
          />
        </View>
        <ChartContainer />
      </View>
    );
  }
}

export default TrendsScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flex: 1,
  },
  highchartsContainer: {
    flexGrow: 1,
  },
  filtersContainer: {flexDirection: 'row'},
});
