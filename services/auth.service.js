import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import decode from 'jwt-decode';
import tokens from '../token';

const authUserLogin = async (token) => {
  try {
    const user = await axios.post(`${tokens.backendApi}/user/auth`, {
      userToken: token,
    });
    return user.data;
  } catch (error) {
    console.log('This is the error from auth service user login: ', error);
  }
};
const findUserName = async (userId) => {
  const userInfo = await axios.post(`${tokens.backendApi}/auth/userInfo`, {
    userId,
  });
  return {...userInfo.data, userId};
};

const addUserAccessToken = async (email, accessToken) => {
  try {
    const postToken = await axios.post(`${tokens.backendApi}/user/addToken`, {
      email: email,
      accessToken: accessToken,
    });
    //return user.data;

    const token = postToken.headers['x-auth-token'];
    await AsyncStorage.setItem('userToken', token);
    const user = decode(token);
    return user;
  } catch (error) {
    console.log('This is the error from add user access token: ', error);
  }
};
//`${tokens.backendApi}/user/register/ `,
const register = async (payload) => {
  try {
    const postToken = await axios.post(
      `${tokens.backendApi}/userRegistration`,
      payload,
    );
    const token = postToken.headers['x-auth-token'];
    await AsyncStorage.setItem('userToken', token);
    const user = decode(token);
    return user;
  } catch (error) {
    console.log('This is the error from get user token ', error);
  }
};

const logIn = async (email, password) => {
  try {
    const postToken = await axios.post(`${tokens.backendApi}/userLogin/`, {
      email,
      password,
    });
    var token = postToken.headers['x-auth-token'];
    await AsyncStorage.setItem('userToken', token);
    const user = decode(token);
    return user;
  } catch (error) {
    console.log('There was an error loggin in ', error);
  }
};

const logOut = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    return true;
  } catch (error) {
    console.log('There was an error logging out ', error);
  }
};

const getCurrUser = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (token === null || token === undefined) {
      return null;
    }
    const user = decode(token);

    return user;
  } catch (err) {
    console.error(err, 'Error geting user token');
    return null;
  }
};

module.exports = {
  findUserName,
  authUserLogin,
  addUserAccessToken,
  register,
  logIn,
  logOut,
  getCurrUser,
};
