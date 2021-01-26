import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import PlaidLink from 'react-native-plaid-link-sdk';
import Plaid from '../services/plaid.service';
import AuthService from '../services/auth.service';
import Accounts from '../components/Accounts/Accounts.component';
import {Loading} from '../components/Loading/Loading.component';
import {connect} from 'react-redux';
import {Logo} from '../components/Logo/logo.component';
import {logIn} from '../redux/actions/user.action';
import {Colors} from '../colors';

class AccountsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      link_token: null,
      accounts: [],
    };
  }
  componentDidMount = async () => {
    const linkToken = await Plaid.getLinkToken();
    if (
      this.props.currUser &&
      this.props.currUser.accessTokens &&
      this.props.currUser.accessTokens.length > 0
    ) {
      this.populateAccounts(this.props.currUser.accessTokens, linkToken);
    } else {
      this.setState({link_token: linkToken, loading: false});
    }
  };

  componentDidUpdate(prevProps) {}

  async populateAccounts(accessTokens, linkToken) {
    let linkedAccounts = await Promise.all(
      accessTokens.map(async (t) => {
        return await Plaid.getAccounts(t);
      }),
    ).catch((error) => {});
    var accounts = this.state.accounts;
    accounts.push(...linkedAccounts.flat(1));
    this.setState({
      link_token: linkToken ? linkToken : this.state.link_token,
      accounts: accounts,
      loading: false,
    });
  }

  async linkSuccessHandler(results) {
    const accessToken = await Plaid.getAccessToken(results);
    await this.populateAccounts([accessToken]);
    const updatedUser = this.props.currUser;
    updatedUser.accessTokens.push(accessToken);
    this.props.logIn(updatedUser);

    await AuthService.addUserAccessToken(
      this.props.currUser.email,
      accessToken,
    );
  }

  renderPlaidLink() {
    return (
      this.state.link_token && (
        <PlaidLink
          token={this.state.link_token}
          component={Button}
          componentProps={{
            title: 'Add Account',
            buttonStyle: styles.plaidLinkButton,
            titleStyle: styles.plaidLinkButtonTitle,
          }}
          onSuccess={(res) => this.linkSuccessHandler(res)}
          onError={(result) => {
            console.log('Error linking account: ', result);
          }}></PlaidLink>
      )
    );
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        {this.state.loading && <Loading />}
        {!this.state.loading && this.state.accounts.length > 0 && (
          <View style={styles.accountsContainer}>
            <Accounts accounts={this.state.accounts}></Accounts>
          </View>
        )}

        {!this.state.loading && this.state.accounts.length == 0 && (
          <View style={styles.noAccountsContainer}>
            <View style={styles.noAccountsIconsContainer}>
              <FontAwesome name="credit-card-alt" size={80} color="gray" />
              <Icon
                name="link"
                size={60}
                color="gray"
                style={{marginHorizontal: 15}}
              />
              <Logo size={100} />
            </View>
            <Text style={styles.noAccountsTxt}>
              You haven't linked any accounts yet.
            </Text>
          </View>
        )}

        <View style={styles.plaidLinkContainer}>{this.renderPlaidLink()}</View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  currUser: state.user.currUser,
});

const mapDispatchToProps = (dispatch) => ({
  logIn: (data) => dispatch(logIn(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountsScreen);

//export default AccountsScreen;

const styles = StyleSheet.create({
  pageContainer: {
    height: '100%',
    flex: 1,
  },
  accountsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },

  noAccountsContainer: {
    flex: 1,

    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  noAccountsIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 150,
  },
  noAccountsTxt: {
    width: 200,
    textAlign: 'center',
    fontSize: 20,
  },

  plaidLinkContainer: {
    width: '100%',
  },
  plaidLinkButtonTitle: {
    fontVariant: ['small-caps'],
    fontSize: 18,
    color: Colors.LIGHT1,
  },
  plaidLinkButton: {
    padding: 10,
    margin: 10,
    backgroundColor: Colors.DARK1,
  },
});
