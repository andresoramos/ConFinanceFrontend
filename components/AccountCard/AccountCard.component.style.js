import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    padding: 8,
  },
  cardWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accountsContainer: {
    flexGrow: 1,
    flexDirection: 'column',
    paddingHorizontal: 5,
  },

  account: {
    margin: 3,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  accountTitle: {flex: 1},
  logoImageStyle: {margin: 15, width: 100, height: 100},
  buttonStyle: {
    alignSelf: 'flex-end',
    margin: 0,
    padding: 0,
  },
  moreStyle: {padding: 0},
});
