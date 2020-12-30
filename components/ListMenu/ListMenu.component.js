import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {Header, Button} from 'react-native-elements';

import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './ListMenu.component.style';
import {Colors} from '../../colors';
import globalStyle from '../../global.style';

const iconSize = 30;
const SettingsStack = createStackNavigator();

function NavButton(screen, id, buttonStyle) {
  const navigation = useNavigation();

  return (
    <Button
      key={id}
      type="outline"
      icon={
        <Icon
          style={styles.navButtonIcon}
          name={screen.iconName}
          size={iconSize}
        />
      }
      titleStyle={styles.menuTitleStyle}
      buttonStyle={[styles.navButton, buttonStyle]}
      title={screen.name}
      onPress={() =>
        navigation.navigate({
          name: screen.name,
          params: {},
        })
      }
    />
  );
}
class ListMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  MenuScreen = () => {
    return (
      <View style={this.props.containerStyle}>
        <View style={this.props.childContainerStyle}>
          {this.props.children()}
        </View>
        <View style={this.props.buttonContainerStyle}>
          {this.props.Screens.map((screen, id) => {
            return NavButton(screen, id, this.props.buttonStyle);
          })}
        </View>
      </View>
    );
  };

  render() {
    return (
      <SettingsStack.Navigator
        initialRouteName={this.props.initialRouteName}
        headerMode={'float'}
        screenOptions={{
          header: ({scene, previous, navigation}) => {
            const {options} = scene.descriptor;
            const title =
              options.headerTitle !== undefined
                ? options.headerTitle
                : options.title !== undefined
                ? options.title
                : scene.route.name;
            return (
              <Header
                statusBarProps={{barStyle: 'dark-content'}}
                barStyle={'default'}
                backgroundColor={Colors.DARK1}
                leftComponent={
                  previous ? (
                    <Button
                      type="clear"
                      icon={
                        <IonIcon
                          name="md-return-down-back"
                          size={iconSize}
                          color={Colors.LIGHT4}
                        />
                      }
                      titleStyle={styles.backButtonTitleStyle}
                      title={this.props.initialRouteName}
                      onPress={navigation.goBack}
                    />
                  ) : undefined
                }
                centerComponent={
                  <Text style={styles.headerTitleStyle}>{title}</Text>
                }
                containerStyle={this.props.containerStyles}
              />
            );
          },
        }}>
        <SettingsStack.Screen
          name={this.props.initialRouteName}
          component={this.MenuScreen}
          options={{headerShown: false}}
        />

        <SettingsStack.Screen
          name={'Test'}
          component={this.props.children}
          options={{headerShown: false}}
        />
        {this.props.Screens.map((screen, id) => {
          return (
            <SettingsStack.Screen
              name={screen.name}
              key={id}
              component={screen.component}
              options={{topBarLabel: screen.name}}
            />
          );
        })}
      </SettingsStack.Navigator>
    );
  }
}

export default ListMenu;
