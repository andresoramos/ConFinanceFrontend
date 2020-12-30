import * as React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../Filter.component.style';
import {
  TIME_RANGE_FILTERS,
  DEFAULT_TIME_RANGE_FILTER,
} from '../../../constants';
const TimeRangeFilter = ({props, selectTimeRangeFilter}) => (
  <DropDownPicker
    items={Object.values(TIME_RANGE_FILTERS).map((category) => {
      return {label: category, value: category};
    })}
    defaultValue={DEFAULT_TIME_RANGE_FILTER}
    containerStyle={{flex: 1}}
    style={styles.pickerStyle}
    itemStyle={styles.itemStyle}
    dropDownStyle={styles.sortDropdownStyle}
    isVisible={props.isVisible}
    onOpen={props.onOpen}
    onClose={props.onClose}
    onChangeItem={(item) => {
      selectTimeRangeFilter(item.value);
    }}
  />
);

export default TimeRangeFilter;
