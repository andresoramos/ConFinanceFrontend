import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ICON_MAP from '../../categories_icon_map';
import Icon from './icon';

class CategoryIcon extends React.Component {
  constructor(props) {
    super(props);
    this.size = 25;
  }

  render() {
    //console.log(this.props.categoryId);
    var icon_data = ICON_MAP[this.props.categoryId];
    //console.log(icon_data);
    //  if (icon_data && icon_data.name) {
    /* 
    if (!icon_data) {
      return <Icon.FontAwesome name="rocket" size={20} color="#900" />;
    } */
    //console.log(icon_data.iconSet, icon_data.iconName, icon_data.color);
    switch (icon_data.iconSet) {
      case 'SimpleLineIcons':
        return (
          <Icon.SimpleLineIcons
            name={icon_data.iconName}
            size={20}
            color={icon_data.color}
          />
        );

      case 'MaterialIcons':
        return (
          <Icon.MaterialIcons
            name={icon_data.iconName}
            size={20}
            color={icon_data.color}
          />
        );

      case 'FontAwesome5':
        return (
          <Icon.FontAwesome
            name={icon_data.iconName}
            size={20}
            color={icon_data.color}
          />
        );

      case 'Foundation':
        return (
          <Icon.Foundation
            name={icon_data.iconName}
            size={20}
            color={icon_data.color}
          />
        );

      case 'EvilIcons':
        return (
          <Icon.EvilIcons
            name={icon_data.iconName}
            size={20}
            color={icon_data.color}
          />
        );

      case 'Ionicons':
        return (
          <Icon.Ionicons
            name={icon_data.iconName}
            size={20}
            color={icon_data.color}
          />
        );

      case 'Octicons':
        return (
          <Icon.Octicons
            name={icon_data.iconName}
            size={20}
            color={icon_data.color}
          />
        );

      case 'Feather':
        return (
          <Icon.Feather
            name={icon_data.iconName}
            size={20}
            color={icon_data.color}
          />
        );

      case 'Entypo':
        return (
          <Icon.Entypo
            name={icon_data.iconName}
            size={20}
            color={icon_data.color}
          />
        );

      case 'Zocial':
        return (
          <Icon.Zocial
            name={icon_data.iconName}
            size={20}
            color={icon_data.color}
          />
        );

      default:
        return null;
    }
  }
}
export default CategoryIcon;
