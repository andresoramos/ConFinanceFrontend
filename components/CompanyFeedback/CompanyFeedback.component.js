import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {SimpleSurvey} from 'react-native-simple-survey';
import {Image, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {questionRetrievalService} from '../../services/questionRetrievalService';
import {getCurrUser} from '../../services/auth.service';
import {Colors} from '../../colors';
import {survey} from '../../surveys/general';
import {Input} from 'react-native-elements';
import {connect} from 'react-redux';
import {
  updateBusinesses,
  updateFavBusinesses,
  removeFavoriteBusiness,
  addFavoriteBusiness,
} from '../../redux/reducers/index';
import QuestionForm from '../CompanyFeedback/questionForm.component';
import {produceQuestions} from './questionsObj';
import {findFavoritesById} from '../../services/findFavorites';

class CompanyFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: Colors.LIGHT4,
      answersSoFar: '',
      name: '',
      error: false,
      showQuestions: false,
      questionsAnswered: [],
      currentQuestion: produceQuestions('', []),
    };

    this.width = Math.round(Dimensions.get('window').width);
    this.height = Math.round(Dimensions.get('window').height);
    this.logoSize = this.width * 0.5;
  }

  handleNameChange = (e) => {
    this.setState({...this.state, name: e.nativeEvent.text});
  };
  handleSubmit = () => {
    if (this.state.name.length === 0) {
      return this.setState({...this.state, error: true});
    }
    this.setState({...this.state, showQuestions: true});
  };

  render() {
    return (
      <View
        style={[
          styles.background,
          {backgroundColor: this.state.backgroundColor},
        ]}>
        <View
          style={[
            styles.container,
            {
              minWidth: this.width / 2,
              minHeight: this.width,
              maxHeight: this.height,
            },
          ]}>
          {!this.state.showQuestions && (
            <View>
              <View style={styles.intro}>
                <Text style={{fontSize: 25}}>
                  It's time to spill the beans.
                </Text>
                <Text>
                  Tell us what you know about a company of your choice.
                </Text>
              </View>
              <View style={styles.logoContainer}>
                <Image
                  style={[
                    {width: this.logoSize, height: this.logoSize},
                    styles.logoImg,
                  ]}
                  source={require('../../images/consciousconsumerlogo3.png')}
                  PlaceholderContent={<ActivityIndicator />}
                />
              </View>
              <View style={[styles.nameInputContainer, {width: this.width}]}>
                <View style={styles.nameText}>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    Company name
                  </Text>
                </View>
                <View style={styles.nameInput}>
                  <Input onChange={this.handleNameChange} />
                </View>
                <View>
                  <Button onPress={this.handleSubmit} title="Start quiz" />
                </View>
              </View>
              {this.state.error && (
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 12, color: 'red'}}>
                    We need to know the name of the company you're giving the
                    tea on.
                  </Text>
                  <Text style={{fontSize: 12}}> Go ahead. Write it in!</Text>
                </View>
              )}
            </View>
          )}
          {this.state.showQuestions && (
            <QuestionForm currentQuestion={this.state.currentQuestion} />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.companyFeedbackReducer.questions,
  name: state.companyFeedbackReducer.name,
});
const mapDispatchToProps = (dispatch) => {
  return {
    addFavoriteBusiness: (business) => {
      dispatch(addFavoriteBusiness(business));
    },
    updateNearbyBusinesses: (businesses) => {
      dispatch(updateBusinesses(businesses));
    },
    updateFavBusinesses: (businesses) => {
      dispatch(updateFavBusinesses(businesses));
    },
    removeFavoriteBusiness: (id) => {
      dispatch(removeFavoriteBusiness(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyFeedback);

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center',

    backgroundColor: Colors.LIGHT1,
    borderRadius: 500,
    elevation: 30,
    paddingHorizontal: 40,
    paddingVertical: 80,
    margin: -40 /* 
    backgroundColor: 'green', */,
  },
  surveyContainer: {
    alignSelf: 'center',
    alignContent: 'center',
    flexGrow: 0,
    marginVertical: 20,
    marginHorizontal: 40,
    /*     backgroundColor: 'red', */
  },
  selectionGroupContainer: {
    flexDirection: 'column',
    alignContent: 'flex-end',
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.DARK2,
    color: Colors.DARK2,
  },
  buttonTitle: {
    fontSize: 16,
  },

  nextButtonIcon: {
    color: Colors.DARK2,
    fontSize: 40,
    fontWeight: 'bold',
  },
  nameInput: {
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  nameInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  nextButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    color: Colors.DARK2,
    borderWidth: 2,
    borderColor: Colors.DARK2,
  },
  nextButtonTitle: {
    color: Colors.DARK2,
    fontSize: 20,
  },
  nextButtonContainer: {},
  startButton: {
    margin: 40,
    padding: 30,
  },
  navButtonText: {
    margin: 10,
    fontSize: 20,
    color: 'white',
    width: 'auto',
  },
  answers: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  navigationButton: {
    minHeight: 40,
    backgroundColor: Colors.DARK1,
    padding: 0,
    borderRadius: 20,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {marginTop: 15},
  intro: {
    // display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    marginBottom: 20,
    fontSize: 20,
  },
  textBox: {
    borderWidth: 1,
    borderColor: 'rgba(204,204,204,1)',
    backgroundColor: 'white',
    borderRadius: 10,

    padding: 10,
    textAlignVertical: 'top',
    marginLeft: 10,
    marginRight: 10,
  },
  numericInput: {
    borderWidth: 1,
    borderColor: 'rgba(204,204,204,1)',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginLeft: 10,
    marginRight: 10,
  },
  infoText: {
    fontSize: 20,
    lineHeight: 30,
  },
  infoTextContainer: {
    marginVertical: 30,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImg: {
    borderRadius: 100,
    resizeMode: 'contain',
  },

  answersContainer: {
    display: 'none',
    width: '90%',
    maxHeight: '20%',
    marginTop: 50,
    paddingHorizontal: 40,
    paddingVertical: 30,
    marginBottom: 40,
    backgroundColor: 'white',
    elevation: 20,
    borderRadius: 10,
  },
});
