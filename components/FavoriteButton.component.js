import React from 'react';
import {connect} from 'react-redux';
import {toggleFavorite} from '../redux/actions';
import {Button, Text} from 'react-native';

const FavoriteButton = ({favorite, toggleFavorite}) => (
  <Button
    onPress={() => toggleFavorite(favorite.id)}
    title={favorite && favorite.favorited ? '👌' : '👋'}>
    <Text>{favorite.content}</Text>
  </Button>
);

// export default Todo;
export default connect(null, {toggleFavorite})(FavoriteButton);
