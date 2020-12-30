import {StyleSheet} from 'react-native';
import {Colors} from '../../colors';

export default StyleSheet.create({
  menuContainer: {
    height: '100%',
    padding: 10,
    backgroundColor: Colors.DARK1,
  },
  navButton: {
    margin: 5,
    padding: 15,
    paddingLeft: 25,
    justifyContent: 'flex-start',
  },
  navButtonIcon: {
    marginRight: 10,
    width: 40,
    textAlign: 'center',
    color: Colors.Md2,
  },
  backButtonTitleStyle: {
    paddingLeft: 10,
    color: Colors.LIGHT2,
  },
  menuTitleStyle: {
    color: Colors.DARK2,
  },
  headerTitleStyle: {
    color: Colors.LIGHT2,
    fontSize: 24,
  },
});
