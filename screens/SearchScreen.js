import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  BackHandler,
  Dimensions,
  ScrollView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {getCurrUser} from '../services/auth.service';
import {Header, Button, SearchBar} from 'react-native-elements';

import axios from 'axios';

import * as BusinessesApi from '../services/businesses.service';

import Map from '../components/Map/Map.component';
import BusinessesList from '../components/BusinessesList/BusinessesList.component';
import OverlayTest from '../components/Overlay';
import Geolocation from 'react-native-geolocation-service';
import {Colors} from '../colors';
import {connect} from 'react-redux';
import {
  updateBusinesses,
  updateFavBusinesses,
  removeFavoriteBusiness,
  addFavoriteBusiness,
} from './../redux/reducers/index';
import {findFavoritesById} from './../services/findFavorites';

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      mapView: true,
      favoritedBusinesses: [] /* [
        {
          name: `Nick's sushi 4`,
          liked: true,
          category: 'Restaurant',
          rating: 4.7,
        },
        {
          name: 'Andres69',
          liked: true,
          category: 'Resturant - Strip Club',
          rating: 0.2,
        },
        {
          name: "Nick's Stripclub",
          liked: true,
          category: 'Adult Cabaret',
          rating: 4.1,
        },
      ], */,
      numberChange: 0,
      selectedBusiness: null,
      nearbyBusinesses: null,
      currentCoordinates: null,
      setOverlay: false,
      actionVisible: false,
      locationName: '',
      address: '',
      imgUri: '',
      phoneNumber: '',
      openNow: '',
    };
    this.width = Math.round(Dimensions.get('window').width);
    this.height = Math.round(Dimensions.get('window').height);
  }
  requestPermissions = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
    }

    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  };

  centerMapForUserLocation = async () => {
    // if (hasLocationPermission) {
    Geolocation.getCurrentPosition(
      async (position) => {
        try {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;

          const nearbyBusinesses = await this.getBusinessesForArea(lat, lng);

          this.setState({
            currentCoordinates: {latitude: lat, longitude: lng},
            // nearbyBusinesses: nearbyBusinesses,
          });
          this.props.updateNearbyBusinesses(nearbyBusinesses);
        } catch (err) {
          console.log(err, 'error finding nearby businesses');
        }
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  findUserFavorites = async () => {
    const currentUser = await getCurrUser();
    const favArray = await findFavoritesById(currentUser._id);
    return favArray;
  };

  componentDidMount = async () => {
    await this.requestPermissions();
    await this.centerMapForUserLocation();
    const favArray = await this.findUserFavorites();
    this.props.updateFavBusinesses(favArray);
  };

  getBusinessesForArea = async (lat, lng) => {
    try {
      const currentZipcode = await BusinessesApi.getZipFromLatLng(lat, lng);
      const zipCodes = await BusinessesApi.getZipArray(currentZipcode, 2);
      const businesses = await BusinessesApi.findLocalBusinesses(zipCodes);
      return businesses;
    } catch (error) {
      console.log(error, 'componentDidMount error on SearchScreen.js');
    }
  };

  usefulInfo = (arr) => {
    // console.log("input", arr);
    const mapInfo = arr.map((element) => {
      let infoObj = {
        name: element.legalBusinessName,
        addressLn1: element.samAddress.line1,
        addressLn2: element.samAddress.line2,
        city: element.samAddress.city,
        state: element.samAddress.stateOrProvince,
        zipcode: element.samAddress.zip,
      };

      return infoObj;
    });
    return mapInfo;
  };

  handleActionButton = () => {
    this.setState({actionVisible: true, setOverlay: false});
  };
  handleSetOverlay = async (business) => {
    // console.log("HERE IS SET OVERLAY'S BUSINESS", business);
    this.setState({
      selectedBusiness: business,
      setOverlay: true,
      locationName: business.name,
      address: business.formatted_address,
      imgUri: business.photos ? business.photos[0].photo_reference : null,
      phoneNumber: business.formatted_phone_number,
      // openNow:
      //   placeDetails.data.result.opening_hours !== undefined
      //     ? placeDetails.data.result.opening_hours
      //     : '',
    });
  };
  handleNotVisible = () => {
    this.setState({actionVisible: false});
  };
  removeOverlay = () => {
    this.setState({setOverlay: false});
  };

  updateSearch = (search) => {
    this.setState({search});
  };
  handleRemove = (id) => {
    this.props.removeFavoriteBusiness(id);
  };
  handleAdd = (business) => {
    this.props.addFavoriteBusiness(business);
  };

  render() {
    // console.log(
    //   this.props.favoriteBusinesses,
    //   "WHAT YOU'RE PASSING IN IN THE SEARCH SCREEN WORKS!",
    // );
    const {search} = this.state;
    return (
      <View style={styles.pageContainer}>
        <View style={[styles.searchContainer, {backgroundColor: Colors.DARK1}]}>
          <SearchBar
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.inputContainer}
            round
            lightTheme
            placeholder="Search for businesses..."
            onChangeText={this.updateSearch}
            value={search}
          />
          <Button
            type="clear"
            icon={{
              name: this.state.mapView ? 'list' : 'map',
              size: 30,
              color: 'white',
            }}
            buttonStyle={styles.toggleViewButton}
            onPress={() => {
              this.setState({mapView: !this.state.mapView});
            }}
          />
        </View>

        {/* 
            onPress={() => {
              this.centerMapForUserLocation();
              this.setState({selectedTab: 'map'});
            }}>
            <Icon name="map" size={px2dp(22)} color="#3496f0" />
          
 */}
        {/* <Icon name="th-list" size={px2dp(22)} color="#3496f0" />

         */}
        {this.state.mapView && (
          <View style={styles.mapContainer}>
            <Map
              setOverlay={this.handleSetOverlay}
              businesses={this.props.businesses}
              currentCoordinates={this.state.currentCoordinates}
            />
          </View>
        )}
        {this.state.mapView && (
          <Button
            // icon={{ name: "code" }}
            buttonStyle={[
              styles.refreshButton,
              {
                backgroundColor: Colors.DARK1,
              },
            ]}
            onPress={() => {}}
            title="Search in this area"
          />
        )}

        {!this.state.mapView && (
          <BusinessesList
            addFavoriteBusiness={this.handleAdd}
            style={styles.businessListContainer}
            numberChange={this.numberChange}
            favoriteBusinesses={this.props.favoriteBusinesses}
            changeRerenderNum={this.changeRerenderNum}
            selectedTab={this.state.selectedTab}
            businesses={this.props.businesses}
            loginAlert={this.props.loginAlert}
            removeFavoriteBusiness={this.handleRemove}
          />
        )}
        <OverlayTest
          addFavoriteBusiness={this.handleAdd}
          heartFix={this.heartFix}
          favoriteBusinesses={this.props.favoriteBusinesses}
          selectedTab={this.state.selectedTab}
          business={this.state.selectedBusiness}
          address={this.state.address}
          locationName={this.state.locationName}
          removeOverlay={this.removeOverlay}
          visible={this.state.setOverlay}
          style={{marginTop: 200}}
          imgUri={this.state.imgUri}
          phoneNumber={this.state.phoneNumber}
          openNow={this.state.openNow}
          handleActionButton={this.handleActionButton}
          removeFavoriteBusiness={this.handleRemove}
          {...this.props}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  businesses: state.searchReducer.nearbyBusinesses,
  favoriteBusinesses: state.searchReducer.favoritedBusinesses,
});
const mapDispatchToProps = (dispatch) => {
  return {
    addFavoriteBusiness: (business) => {
      dispatch(addFavoriteBusiness(business));
    },
    updateNearbyBusinesses: (businesses) => {
      dispatch(updateBusinesses(businesses));
    },
    updateFavBusinesses: (businesses) => {
      dispatch(updateFavBusinesses(businesses));
    },
    removeFavoriteBusiness: (id) => {
      dispatch(removeFavoriteBusiness(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

const styles = StyleSheet.create({
  pageContainer: {
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  toggleViewButton: {
    color: 'white',
    fontSize: 30,
    flexGrow: 0,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  searchBarContainer: {
    flexGrow: 1,
    padding: 0,
    margin: 10,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    backgroundColor: 'transparent',
  },
  inputContainer: {
    backgroundColor: 'white',
  },
  mapContainer: {height: '50%', flexGrow: 1},
  refreshButton: {
    flexGrow: 0,
  },
  businessListContainer: {},
});
