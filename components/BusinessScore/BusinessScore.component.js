import React from 'react';

import {View, Text, TouchableOpacity} from 'react-native';
import {
  Card,
  Button,
  Image,
  Rating,
  Avatar,
  Divider,
} from 'react-native-elements';

import styles from './BusinessScore.component.style';

class BusinessScore extends React.Component {
  constructor(props) {
    super(props);
    this.color = this.getColor();
  }
  getColor = () => {
    if (this.props.score < 3) {
      return 'red';
    } else if (this.props.score >= 3 && this.props.score < 7) {
      return 'yellow';
    } else {
      return 'green';
    }
  };

  render() {
    return (
      <View style={[{borderColor: this.color}, styles.container]}>
        <View
          style={[
            {width: this.props.score * 10 + '%', backgroundColor: this.color},
            styles.scoreBar,
          ]}>
          <Text>{this.props.score}</Text>
        </View>
      </View>
    );
  }
}

export default BusinessScore;
