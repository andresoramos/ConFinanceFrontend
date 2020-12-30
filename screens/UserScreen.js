import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Avatar, Accessory, Divider} from 'react-native-elements';

import EthicsScreen from './EthicsScreen';
import FavoriteScreen from './FavoriteScreen';

import ListMenu from '../components/ListMenu/ListMenu.component';
import Icon from 'react-native-vector-icons/Ionicons';

import RatingBar from '../components/RatingBar/RatingBar.component';
import {Colors} from '../colors';
import {connect} from 'react-redux';
import Logout from '../components/Logout/Logout.component';
const Screens = [
  {
    name: 'Lifestyle',
    iconName: 'balance-scale',
    component: EthicsScreen,
  },
  {
    name: 'Favorites',
    iconName: 'heart',
    component: FavoriteScreen,
  },

  /*   {
    name: 'Preferences',
    iconName: 'cog',
    component: PreferencesScreen,
  }, */
  {
    name: 'Logout',
    iconName: 'power-off',
    component: Logout,
  },
];

class UserScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {editMode: false};
    //this.src = '../../images/me.png';
  }

  userHeaderScreen = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerInfoContainer}>
          <Avatar
            size="xlarge"
            rounded
            avatarStyle={styles.avatar}
            containerStyle={styles.avatarContainer}
            /*  source={{
          uri: this.src,
        }}> 
        source={require('../images/elk.jpg')}
        */
          >
            <Accessory name={'mode-edit'} size={30} />
          </Avatar>

          <View style={styles.infoContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.firstName}>
                {this.props.currUser.firstName}
              </Text>

              <Text style={styles.lastName}>
                {' '}
                {this.props.currUser.lastName}
              </Text>
            </View>

            <View style={styles.contactInfo}>
              <Text style={styles.contact}>{this.props.currUser.email}</Text>
              <Text style={styles.contact}>{this.props.currUser.phone}</Text>
            </View>
          </View>
        </View>
        <Divider style={styles.headerDivider} />

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTxt}>Super Conscious</Text>
          <RatingBar
            width={200}
            numLeaves={10}
            score={Math.floor(Math.random() * 10)}
          />
        </View>
      </View>
    );
  };

  render() {
    console.log('CURR USER', this.props.currUser);
    return (
      <View style={styles.pageContainer}>
        <ListMenu
          Screens={Screens}
          initialRouteName={'Profile'}
          children={this.userHeaderScreen}></ListMenu>
      </View>
    );
  }
}
//export default UserScreen;

const mapStateToProps = (state) => ({
  currUser: state.user.currUser,
});
export default connect(mapStateToProps)(UserScreen);

const styles = StyleSheet.create({
  pageContainer: {
    width: '100%',
    height: '100%',
  },
  headerInfoContainer: {
    padding: 10,
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },

  ratingContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 30,
  },
  infoContainer: {},
  headerContainer: {
    paddingTop: 40,
    paddingBottom: 25,
    backgroundColor: Colors.TEAL,
    borderBottomWidth: 2,
    borderBottomColor: Colors.MD1,
  },
  headerDivider: {
    marginTop: 25,
    marginLeft: 15,
    backgroundColor: Colors.MD1,
  },
  avatarContainer: {
    borderWidth: 1,
    borderColor: Colors.LIGHT2,
  },
  contactInfo: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 25,
  },
  contact: {
    color: Colors.LIGHT5,
    fontSize: 15,
    marginBottom: 5,
    marginTop: 5,
  },
  avatar: {borderWidth: 5, borderColor: Colors.DARK2, borderRadius: 100},
  firstName: {
    fontSize: 30,
    color: Colors.LIGHT1,
  },
  lastName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.LIGHT4,
  },
  ratingTxt: {
    color: Colors.LIGHT2,
    marginRight: 25,
    maxWidth: 80,
    textAlign: 'right',
  },
});
