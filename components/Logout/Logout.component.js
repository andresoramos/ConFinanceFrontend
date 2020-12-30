import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {connect} from 'react-redux';
import {Loading} from '../Loading/Loading.component';
import {logOut} from '../../redux/actions/user.action';

class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    const {dispatch} = this.props;
    dispatch(logOut());
  };

  render() {
    return (
      <View style={styles.pageContainer}>
        {this.props.currUser && <Loading />}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  currUser: state.user.currUser,
});

export default connect(mapStateToProps)(Logout);

const styles = StyleSheet.create({
  pageContainer: {
    flexDirection: 'column',
    flex: 1,
  },
});
