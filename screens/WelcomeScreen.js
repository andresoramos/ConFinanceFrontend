import React from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import RegisterScreen from './registerScreen';
import Login from '../components/Login/Login.component';
import ListMenu from '../components/ListMenu/ListMenu.component';

import globalStyles from '../global.style';
import {Colors} from '../colors';

const Screens = [
  {
    name: 'Login',
    iconName: 'sign-in',
    component: Login,
  },
  {
    name: 'Register',
    iconName: 'openid',
    component: RegisterScreen,
  },
];

class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  loginScreen = () => {
    return (
      <View style={[globalStyles.halfScreenCircle]}>
        <View style={[globalStyles.innerContainer]}>
          <View style={globalStyles.logoContainer}>
            <Image
              style={globalStyles.logoImg}
              source={require('../images/consciousconsumerlogo3.png')}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <Text style={styles.title}>Welcome to Conscious Finance!</Text>
          <Text style={styles.subtitle}>
            Maybe we can't overthrow capitalism, but lets make ourselves feel
            slightly better about participating in it
          </Text>
        </View>
      </View>
    );
  };
  render() {
    return (
      <NavigationContainer>
        <ListMenu
          containerStyle={[styles.pageContainer, globalStyles.darkBackground]}
          buttonContainerStyle={{padding: 10, zIndex: 200}}
          buttonStyle={{backgroundColor: Colors.LIGHT2, margin: 8, zIndex: 200}}
          Screens={Screens}
          initialRouteName={'Back'}
          children={this.loginScreen}
        />
      </NavigationContainer>
    );
  }
}
export default WelcomeScreen;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    justifyContent: 'center',
    textAlign: 'center',
    padding: 50,
    paddingTop: 20,
    fontSize: 16,
    lineHeight: 26,
  },
});
