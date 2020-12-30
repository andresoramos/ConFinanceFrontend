import axios from 'axios';
import tokens from '../token';
/* /
const getZipArray = (array) => {
  let returnArray = [];
  for (var i = 0; i < array.length; i++) {
    returnArray.push(array[i].zip_code);
  }
  return returnArray;
}; */

const getZipFromLatLng = async (lat, lng) => {
  try {
    var zip = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${tokens.googleApi}`,
    );
    return '02139'; //zip.data;
  } catch (err) {
    console.log(err, 'err getting zips on services/getZipcodes.js');
  }
};
const getZipArray = async (zip, radius) => {
  try {
    /*     var zips = await axios.get(
      `https://www.zipcodeapi.com/rest/${tokens.zipCodeApi}/radius.json/${zip}/${radius}/km`,
    );
    console.log('zi', zips);
    let returnArray = [];
    for (var i = 0; i < zips.data.zip_codes.length; i++) {
      returnArray.push(zips.data.zip_codes[i].zip_code);
    } */
    //return returnArray;
    return [
      '02301',
      '02210',
      '02215',
      '02239',
      '02142',
      '02139',
      '02163',
      '02238',
      '02141',
      '11225',
    ];
    //return ['07832', '91301', '29061', '20904'];
  } catch (err) {
    console.log(err, 'err getting zips on services/getZipcodes.js');
  }
};

const findLocalBusinesses = async (array) => {
  try {
    const nearbyBusinesses = await axios.post(
      `${tokens.backendApi}/businesses/find`,
      {array},
    );
    return nearbyBusinesses.data;
  } catch (err) {
    console.log(err, 'err finding local businesses');
  }
};

const cleanAddress = (string) => {
  let returnString = '';
  for (var i = 0; i < string.length; i++) {
    if (JSON.stringify(Number(string[i])) !== 'null' && string[i] !== ' ') {
      returnString += string[i];
    } else {
      if (i === 0) {
        returnString += string[i].toUpperCase();
      } else {
        if (string[i - 1] === ' ' && string[i] !== ' ') {
          returnString += string[i].toUpperCase();
        } else {
          returnString += string[i].toLowerCase();
        }
      }
    }
  }

  return returnString;
};

module.exports = {
  getZipFromLatLng,
  getZipArray,
  findLocalBusinesses,
  cleanAddress,
};
