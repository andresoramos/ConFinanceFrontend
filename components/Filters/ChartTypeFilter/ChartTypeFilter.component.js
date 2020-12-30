import * as React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  Card,
  Button,
  Image,
  Rating,
  Avatar,
  Divider,
} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from '../Filter.component.style';
import {CHART_TYPE_OPTIONS} from '../../../constants';
const ChartTypeFilter = ({props, selectChartType}) => (
  <View style={styles.chartTypeButtons}>
    {Object.keys(CHART_TYPE_OPTIONS).map((option, id) => {
      let chartType = CHART_TYPE_OPTIONS[option];
      return (
        <Button
          key={id}
          type="clear"
          onPress={() => selectChartType(chartType.title)}
          buttonStyle={styles.buttonStyle}
          /* 
      /* 
      buttonStyle={styles.buttonStyle}
      onPress={this.editAccountDetails} */
          icon={
            <MaterialCommunityIcons
              name={chartType.icon}
              size={chartType.size}
              color="gray"
            />
          }
        />
      );
    })}
  </View>
);

/*  return {label: category, value: category};
    })}
    defaultValue={CHART_TYPE_OPTIONS.AVERAGE_RATING}
    containerStyle={{flex: 1}}
    style={styles.pickerStyle}
    itemStyle={styles.itemStyle}
    dropDownStyle={styles.sortDropdownStyle}
    isVisible={props.isVisible}
    onOpen={props.onOpen}
    onClose={props.onClose}
    onChangeItem={(item) => {
      selectChartType(item.value);
    }}
  /> 
  );
 */

export default ChartTypeFilter;
