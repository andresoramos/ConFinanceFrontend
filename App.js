import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchCurrUser} from './redux/actions/user.action';

import WelcomeScreen from './screens/WelcomeScreen';
import {Loading} from './components/Loading/Loading.component';
import {fetchTransactions} from './redux/actions/transactions.action';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';

import AccountsScreen from './screens/AccountsScreen';
import TransactionsScreen from './screens/TransactionsScreen';
import TrendsScreen from './screens/TrendsScreen';
import SearchScreen from './screens/SearchScreen';
import UserScreen from './screens/UserScreen';

import {Colors} from './colors';

const Tab = createBottomTabNavigator();
const Tabs = [
  {
    name: 'Accounts',
    iconName: 'bank',
    component: AccountsScreen,
  },
  {
    name: 'Trends',
    iconName: 'line-chart',
    component: TrendsScreen,
  },
  {
    name: 'User',
    iconName: 'user',
    component: UserScreen,
  },
  {
    name: 'Transactions',
    iconName: 'dollar',
    component: TransactionsScreen,
  },
  {
    name: 'Search',
    iconName: 'search',
    component: SearchScreen,
  },
];

class App extends React.Component {
  static propTypes = {
    selectedTimeRangeFilter: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    const {dispatch} = this.props;
    dispatch(fetchCurrUser());
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.currUser !== this.props.currUser ||
      prevProps.selectedTimeRangeFilter !== this.props.selectedTimeRangeFilter
    ) {
      const {dispatch, selectedTimeRangeFilter} = this.props;
      dispatch(fetchTransactions(selectedTimeRangeFilter));
    }
  }

  render() {
    if (this.props.currUser) {
      return (
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Trends"
            tabBarOptions={{
              activeTintColor: Colors.TEAL,
              inactiveTintColor: 'gray',
            }}>
            {Tabs.map((tab, id) => {
              return (
                <Tab.Screen
                  name={tab.name}
                  key={id}
                  component={tab.component}
                  options={{
                    tabBarIcon: ({focused, color, size}) => {
                      return (
                        <Icon name={tab.iconName} size={size} color={color} />
                      );
                    },
                  }}
                />
              );
            })}
          </Tab.Navigator>
        </NavigationContainer>
      );
    } else if (this.props.isLoading) {
      return <Loading />;
    } else {
      return <WelcomeScreen />;
    }
  }
}
const mapStateToProps = (state) => ({
  currUser: state.user.currUser,
  isLoading: state.user.loading,
  selectedTimeRangeFilter: state.selectedTimeRangeFilter,
});

export default connect(mapStateToProps)(App);
