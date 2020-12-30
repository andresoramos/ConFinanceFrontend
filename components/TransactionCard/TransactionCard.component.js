import * as React from 'react';
import {View, Text} from 'react-native';
import {Card, Button, Divider} from 'react-native-elements';
import styles from './TransactionCard.component.style';
import CategoryIcon from '../CategoryIcon/CategoryIcon.component';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RatingBar from '../RatingBar/RatingBar.component';
import FormattedDate from './FormattedDate/FormattedDate.component';

class TransactionCard extends React.Component {
  constructor(props) {
    super(props);
  }

  goToLocation = () => {
    console.log(this.props.transaction.location);
  };

  currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  render() {
    return (
      <Card
        containerStyle={styles.cardContainer}
        wrapperStyle={styles.cardWrapper}>
        <View style={styles.infoContainer}>
          <FormattedDate
            date={this.props.transaction.date}
            style={[styles.date, styles.info]}
          />

          <Text numberOfLines={2} style={[styles.name, styles.info]}>
            {this.props.transaction.name}
          </Text>

          <CategoryIcon
            categoryId={this.props.transaction.category_id}></CategoryIcon>
        </View>

        <Divider />

        <View style={[styles.infoContainer, styles.ratingContainer]}>
          <Button
            buttonStyle={[styles.ratingInfo]}
            type="clear"
            onPress={this.getRating}
            icon={<Icon name="info-outline" size={24} color="gray" />}
          />
          <RatingBar
            width={185}
            numLeaves={10}
            score={this.props.transaction.rating}
            style={[styles.info, styles.rating]}
          />
          <Text style={[styles.amount, styles.info]}>
            {this.currencyFormat(this.props.transaction.amount)}
          </Text>
        </View>
      </Card>
    );
  }
}

export default TransactionCard;
