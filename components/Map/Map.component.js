import * as React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Loading} from '../Loading/Loading.component';
import styles from './Map.component.style';
import {Text, View} from 'react-native';
import {Button} from 'react-native-elements';

class Map extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.currentCoordinates) {
      return false;
    } else {
      /* this.mapView.animateToRegion({
        latitude: this.props.currentCoordinates.latitude,
        longitude: this.props.currentCoordinates.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }); */
      return true;
    }
  }
  render() {
    if (!this.props.currentCoordinates) {
      return <Loading />;
    } else {
      return (
        <View style={styles.container}>
          <MapView
            zoomControlEnabled
            showsUserLocation
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: this.props.currentCoordinates.latitude,
              longitude: this.props.currentCoordinates.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            ref={(ref) => (this.mapView = ref)}>
            {this.props.businesses &&
              this.props.businesses.map((business, id) => {
                if (business.geometry !== undefined) {
                }
                if (business.geometry) {
                  console.log('marker', business.name);
                  return (
                    <Marker
                      key={id}
                      onPress={() => {
                        console.log(
                          'The click worked with no exceptions thrown!',
                        );
                        this.props.setOverlay(business);
                      }}
                      coordinate={{
                        latitude: business.geometry.location.lat,
                        longitude: business.geometry.location.lng,
                      }}
                      title={business.name}
                      description={business.formatted_address}
                    />
                  );
                }
              })}
            <Marker
              coordinate={{
                latitude: this.props.currentCoordinates.latitude,
                longitude: this.props.currentCoordinates.longitude,
              }}
              pinColor={'blue'}
              title={'current location'}
            />
          </MapView>
        </View>
      );
    }
  }
}

export default Map;
