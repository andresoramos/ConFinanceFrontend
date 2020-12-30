import * as React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {SORT_BY_OPTIONS} from '../../../constants';
import styles from '../../TransactionsHeader/TransactionsHeader.component.style';

const SortByFilter = ({props, sortBy}) => (
  <DropDownPicker
    items={Object.values(SORT_BY_OPTIONS).map((category) => {
      return {label: category, value: category};
    })}
    defaultValue={SORT_BY_OPTIONS.DATE}
    placeholder="Sort By"
    containerStyle={{flex: 1}}
    style={styles.pickerStyle}
    itemStyle={styles.itemStyle}
    dropDownStyle={styles.sortDropdownStyle}
    isVisible={props.isVisible}
    onOpen={props.onOpen}
    onClose={props.onClose}
    onChangeItem={(item) => {
      sortBy(item.value);
    }}
  />
);

export default SortByFilter;
