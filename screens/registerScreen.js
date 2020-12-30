import React from 'react';
import {Input, Button} from 'react-native-elements';
import {View, StyleSheet, Dimensions} from 'react-native';
import AuthService from '../services/auth.service';
import {Colors} from '../colors';
import {connect} from 'react-redux';
import {logIn} from '../redux/actions/user.action';

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.screenWidth = Math.round(Dimensions.get('window').width);

    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      email: '',
    };
  }

  returnMappedInputs = () => {
    const inputsArray = [
      {
        label: 'First Name',
        value: this.state.firstName,
        onChange: this.handleFirstName,
      },
      {
        label: 'Last Name',
        value: this.state.lastName,
        onChange: this.handleLastName,
      },
      {
        label: 'Email',
        value: this.state.email,
        onChange: this.handleEmail,
      },
      {
        label: 'Password',
        value: this.state.password,
        onChange: this.handlePassword,
      },
    ];
    const mappedInputs = inputsArray.map((item, i) => {
      return (
        <Input
          key={i}
          placeholder={item.label}
          onChangeText={(value) => item.onChange(value)}
        />
      );
    });
    return mappedInputs;
  };

  handleFirstName = (text) => {
    this.setState({firstName: text});
  };
  handleLastName = (text) => {
    this.setState({lastName: text});
  };
  handleEmail = (text) => {
    this.setState({email: text});
  };
  handlePassword = (text) => {
    this.setState({password: text});
  };
  handleSubmit = async () => {
    try {
      const data = await AuthService.register({...this.state});
      this.props.logIn(data);
    } catch (err) {
      console.log(err, 'Error registering');
    }
  };

  /*
  We'll collect all of the data in state and create an object as our payload to send 
  via a service to a post route for registration that we'll create in the backend.

  Upon creation of registration, user will be given a token that authenticates them 
  as a user for the next thirty days from their last log in (so after thirty days of 
    inactivity, they'll need to sign in again).

    We'll set this token to innerStorage (but the async type)

    Provide feedback on whether or not password and username fields are being correctly 
    created

  */
  render() {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.formContainer}>{this.returnMappedInputs()}</View>
        <Button
          title="Sign Up"
          buttonStyle={styles.submitButton}
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}
//export default RegisterScreen;

const mapDispatchToProps = (dispatch) => ({
  logIn: (data) => dispatch(logIn(data)),
});

export default connect(null, mapDispatchToProps)(RegisterScreen);

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
