import React, {useState} from 'react';
import {Button, Overlay, Card, colors} from 'react-native-elements';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import styles from '../components/BusinessCard/BusinessCard.component.style';
import BusinessCard from '../components/BusinessCard/BusinessCard.component';
const OverlayTest = (props) => {
  return (
    <View>
      <Overlay
        overlayStyle={{width: '100%'}}
        isVisible={props.visible}
        onBackdropPress={props.removeOverlay}>
        <BusinessCard
          addFavoriteBusiness={props.addFavoriteBusiness}
          favoriteBusinesses={props.favoriteBusinesses}
          business={props.business}
          heartFix={props.heartFix}
          removeFavoriteBusiness={props.removeFavoriteBusiness}
        />
      </Overlay>
    </View>
  );
};
export default OverlayTest;
