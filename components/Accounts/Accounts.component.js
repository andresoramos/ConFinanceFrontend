import * as React from 'react';

import {View, ScrollView, TouchableOpacity, Button, Text} from 'react-native';

import AccountCard from '../AccountCard/AccountCard.component';
import styles from './Accounts.component.style';
import Icon from 'react-native-vector-icons/FontAwesome';

class Accounts extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = async () => {};

  render() {
    return (
      <ScrollView>
        {this.props.accounts.map((account, id) => {
          return (
            <TouchableOpacity key={id} id={id}>
              <AccountCard account={account}></AccountCard>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}

export default Accounts;
