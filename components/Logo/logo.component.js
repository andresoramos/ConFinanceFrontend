import * as React from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import {Colors} from '../../colors';

const width = Math.round(Dimensions.get('window').width);

export function Logo(props) {
  let size = props.size ? props.size : width;

  return (
    <View style={styles.logoContainer}>
      <Image
        style={[{width: size}, styles.logoImg]}
        source={require('../../images/consciousconsumerlogo3.png')}
        PlaceholderContent={<ActivityIndicator />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
  },
  logoImg: {
    borderRadius: 100,
    resizeMode: 'contain',
  },
});
