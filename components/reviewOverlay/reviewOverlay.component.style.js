import {StyleSheet, Dimensions} from 'react-native';

const deviceHeight =
  Dimensions.get('window').height - Dimensions.get('window').height * 0.15;
const deviceWidth =
  Dimensions.get('window').width - Dimensions.get('window').width * 0.15;

export default StyleSheet.create({
  cardRating: {display: 'flex', flexDirection: 'row'},
  container: {height: deviceHeight, width: deviceWidth},
  secondContainer: {height: deviceHeight, width: deviceWidth},
  header: {fontSize: 25, fontWeight: 'bold'},
  subHeader: {fontSize: 20, fontWeight: 'bold'},
  cardName: {fontSize: 12, fontWeight: 'bold'},
  titleRow: {display: 'flex', justifyContent: 'center', alignItems: 'center'},
  input: {
    height: 200,
  },
  firstRow: {
    display: 'flex',
    width: deviceWidth,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  firstRowLeft: {width: '50%'},
  firstRowRight: {width: '50%', paddingLeft: '20%'},
  ratingRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  rateText: {fontSize: 12},
  space: {height: 30},
  smallSpace: {height: 15},
  largeSpace: {height: 80},
  reviewCard: {
    display: 'flex',
    marginBottom: 20,
  },
  reviewCardEmpty: {
    display: 'flex',
  },
  timeElapsed: {fontStyle: 'italic', marginLeft: 5},
  commentScroll: {
    height: 400,
  },
});
