import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  cardWrapper: {},
  cardContainer: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    paddingVertical: 5,
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    paddingTop: 10,
    alignItems: 'flex-end',
  },
  info: {margin: 5, fontFamily: 'Roboto'},
  name: {
    marginRight: 'auto',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  date: {
    color: 'gray',
    fontSize: 12,
    flexGrow: 0,
  },
  amount: {flexGrow: 0, fontWeight: 'bold'},
  category: {flexGrow: 1},
  locationMarker: {flexGrow: 0, margin: 0, padding: 5},
  ratingInfo: {margin: 0, padding: 3},
  rating: {marginRight: 'auto'},
});
