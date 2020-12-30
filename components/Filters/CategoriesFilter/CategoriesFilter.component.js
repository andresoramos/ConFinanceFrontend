import * as React from 'react';
import {View, Dimensions} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../Filter.component.style';
import {TRANSACTION_CATEGORIES} from '../../../constants';

const deviceHeight = Dimensions.get('window').height;
const CategoriesFilter = ({props, selectChartType}) => (
  <DropDownPicker
    items={Object.values(TRANSACTION_CATEGORIES).map((category) => {
      return {label: category, value: category};
    })}
    defaultValue={[]}
    multiple={true}
    placeholder="Filter Categories"
    selectedtLabelStyle={{
      color: '#39739d',
    }}
    min={0}
    max={50}
    dropDownMaxHeight={(2 * deviceHeight) / 3}
    containerStyle={{flex: 2}}
    style={styles.pickerStyle}
    itemStyle={styles.itemStyle}
    dropDownStyle={styles.categoriesDropdownStyle}
    isVisible={props.isVisible}
    onOpen={props.onOpen}
    onClose={props.onClose}
    onChangeList={(data, callback) => {
      console.log('on list');
      /* this.setState({
        selectedTransactionCategories: data,
      }); */
    }}
  />
);

export default CategoriesFilter;
