import axios from 'axios';
import {AsyncStorage} from 'react-native';
import decode from 'jwt-decode';
import tokens from '../token';

async function findFavorites() {
  const token = await AsyncStorage.getItem('userToken');
  const userData = decode(token);
  const payload = {userInfo: userData};

  const heartExists = await axios.post(
    `${tokens.backendApi}/auth/userFavorites`,
    payload,
  );
  return heartExists;
}

export const findFavoritesById = async (userId) => {
  const userFavorites = await axios.post(
    `${tokens.backendApi}/auth/userFavorites`,
    {userId},
  );
  return userFavorites.data;
};
export const addFavorite = async (userId, companyId) => {
  try {
    const favorite = await axios.post(
      `${tokens.backendApi}/favorites/addFavorite`,
      {userId, companyId},
    );
    return favorite.data;
  } catch (error) {
    console.log(
      'You had the following error in findFavorites.js/addFavorite: ',
      error,
    );
  }
};

export const removeFavoriteById = async (userId, companyId) => {
  const removeFavorite = await axios.post(
    `${tokens.backendApi}/favorites/removeFavorite`,
    {userId, companyId},
  );
  return removeFavorite.data;
};

export default findFavorites;
