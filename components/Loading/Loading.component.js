import * as React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Colors} from '../../colors';

export function Loading(props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <ActivityIndicator size="large" color={Colors.DARK1} />
    </View>
  );
}
