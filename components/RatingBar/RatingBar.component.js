import React from 'react';

import {
  Card,
  Button,
  Image,
  Rating,
  Avatar,
  Divider,
} from 'react-native-elements';
import {StyleSheet, View, Text} from 'react-native';
import {Colors} from '../../colors';

import IonIcon from 'react-native-vector-icons/Ionicons';

class RatingBar extends React.Component {
  constructor(props) {
    super(props);
    this.color = this.getColor();
    this.size = this.getSize();
  }

  getColor = () => {
    if (this.props.score < 3) {
      return Colors.YELLOW;
    } else if (this.props.score >= 3 && this.props.score < 7) {
      return Colors.RED;
    } else {
      return Colors.GREEN;
    }
  };

  getSize = () => {
    return this.props.width / this.props.numLeaves;
  };

  componentDidUpdate = () => {
    this.color = this.getColor();
    return true;
  };
  render() {
    const arr = Array.from(Array(10).keys());
    return (
      <View
        style={[
          styles.leafContainer,
          {width: this.props.width},
          this.props.style,
        ]}>
        {arr.map((screen, id) => {
          return (
            <IonIcon
              key={id}
              style={styles.leaf}
              name={id < this.props.score ? 'leaf' : 'leaf-outline'}
              size={this.size + 4}
              color={id < this.props.score ? this.color : Colors.LIGHT2}
            />
          );
        })}
      </View>
    );
  }
}

export default RatingBar;

const styles = StyleSheet.create({
  leafContainer: {
    borderColor: 'gray',
    width: '100%',
    flexDirection: 'row',
  },
  leaf: {
    margin: -2,
  },
});
