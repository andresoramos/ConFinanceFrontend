import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Input, Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {EventRegister} from 'react-native-event-listeners';
import AuthService from '../../services/auth.service';
import {Colors} from '../../colors';
import {connect} from 'react-redux';
import {logIn} from '../../redux/actions/user.action';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
  }

  handleSubmit = async () => {
    try {
      const data = await AuthService.logIn(
        this.state.email,
        this.state.password,
      );
      console.log(data, 'THIS IS THE DATA FROM LOGIN');
      this.props.logIn(data);
    } catch (err) {
      console.log('Unable to log in in login component', err);
    }
  };

  render() {
    return (
      <Card>
        <Input
          onChangeText={(value) => this.setState({email: value})}
          placeholder="Email"
          leftIcon={{type: 'Entypo', name: 'email'}}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          leftIcon={{type: 'font-awesome', name: 'lock'}}
          onChangeText={(value) => this.setState({password: value})}
        />

        <Button
          buttonStyle={styles.submitButton}
          onPress={this.handleSubmit}
          title="Log In"
        />
      </Card>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  logIn: (data) => dispatch(logIn(data)),
});

export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  pageContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 20,
  },
  formContainer: {
    paddingVertical: 20,
  },
  submitButton: {
    padding: 20,
    fontSize: 40,
    backgroundColor: Colors.DARK1,
  },
});
