import {Colors} from './colors';

import {StyleSheet, Dimensions} from 'react-native';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

export default StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkBackground: {
    backgroundColor: Colors.DARK1,
  },
  oversizedCircle: {
    alignItems: 'stretch',
    justifyContent: 'center',

    backgroundColor: Colors.LIGHT1,
    borderRadius: 500,
    elevation: 30,
    paddingHorizontal: 40,
    paddingVertical: 80,
    margin: -40,
    maxWidth: width * 2,
    minHeight: width,
    maxHeight: height,
  },

  halfScreenCircle: {
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: Colors.LIGHT2,
    borderRadius: 500,
    elevation: 10,
    paddingHorizontal: 0,
    paddingVertical: 0,
    margin: -80,
    maxWidth: width * 2,
    maxHeight: height,
  },

  innerContainer: {
    alignSelf: 'center',
    alignContent: 'center',
    flexGrow: 0,

    marginVertical: 0,
    marginHorizontal: 40,
    maxWidth: width,
    maxHeight: height,
    /*     backgroundColor: 'red', */
  },
  outerContainer: {margin: 20},

  logoContainer: {
    alignItems: 'center',
  },
  logoImg: {
    borderRadius: 100,
    resizeMode: 'contain',
    width: width,
    height: width,
  },

  navigationButton: {
    minHeight: 40,
    backgroundColor: Colors.GREEN,
    padding: 0,
    borderRadius: 20,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textBox: {
    borderWidth: 1,
    borderColor: 'rgba(204,204,204,1)',
    backgroundColor: 'white',
    borderRadius: 10,

    padding: 10,
    textAlignVertical: 'top',
    marginLeft: 10,
    marginRight: 10,
  },
  numericInput: {
    borderWidth: 1,
    borderColor: 'rgba(204,204,204,1)',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginLeft: 10,
    marginRight: 10,
  },
});
