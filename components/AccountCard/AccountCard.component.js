import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  Card,
  Button,
  Image,
  Rating,
  Avatar,
  Divider,
} from 'react-native-elements';
import styles from './AccountCard.component.style';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import Icon from 'react-native-vector-icons/FontAwesome';

const DEFAULT_VISIBLE_ACOUNTS = 3;
class AccountCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showAll: false};
  }
  componentDidMount = async () => {};

  editAccountDetails() {
    //open dropdown to delete or rename? accounts
  }
  expand = () => {
    this.setState({showAll: !this.state.showAll});
  };

  currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  render() {
    //  console.log('account', this.props.account);
    return (
      <Card
        containerStyle={styles.cardContainer}
        wrapperStyle={styles.cardWrapper}>
        <Image
          source={{
            uri: `data:image/gif;base64,${this.props.account.logo}`,
          }}
          style={styles.logoImageStyle}
          PlaceholderContent={
            <Text numberOfLines={1} style={styles.title}>
              {this.props.account.name}
            </Text>
          }
        />

        <View style={styles.accountsContainer}>
          <Button
            type="clear"
            buttonStyle={styles.buttonStyle}
            onPress={this.editAccountDetails}
            icon={<Icon name="more-horiz" size={25} color="gray" />}
          />
          {this.props.account.accounts.map((account, id) => {
            if (this.state.showAll || id < DEFAULT_VISIBLE_ACOUNTS)
              return (
                <View style={styles.account} key={id} id={id}>
                  <Text numberOfLines={1} style={styles.accountTitle}>
                    {account.name}
                  </Text>

                  <Text numberOfLines={1} style={styles.title}>
                    {this.currencyFormat(account.balances.current)}
                  </Text>
                </View>
              );
          })}
          {this.props.account.accounts.length > DEFAULT_VISIBLE_ACOUNTS && (
            <Button
              buttonStyle={styles.moreStyle}
              type="clear"
              onPress={this.expand}
              icon={
                <Icon
                  name={this.state.showAll ? 'expand-less' : 'expand-more'}
                  size={30}
                  color="gray"
                  style={styles.moreStyle}
                />
              }></Button>
          )}
        </View>
      </Card>
    );
  }
}

export default AccountCard;
