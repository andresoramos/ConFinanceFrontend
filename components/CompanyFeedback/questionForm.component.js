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
import {Image, Button} from 'react-native-elements';
import {Colors} from '../../colors';
import {Input} from 'react-native-elements';
import {connect} from 'react-redux';
import {
  updateBusinesses,
  updateFavBusinesses,
  removeFavoriteBusiness,
  addFavoriteBusiness,
} from '../../redux/reducers/index';

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: Colors.LIGHT4,
      answersSoFar: '',
      name: '',
      showQuestions: false,
    };

    this.width = Math.round(Dimensions.get('window').width);
    this.height = Math.round(Dimensions.get('window').height);
    this.logoSize = this.width * 0.5;
  }

  createQuestion = (questionObj) => {
    //distinctions include:
    return (
      <View>
        <Text>{questionObj.question}</Text>
      </View>
    );
    //Answer - scale, yesOrNo, multiChoice
    //Type - ext, rep, mon, lob, pro, scale, hierarchy
    //Invert: true or false
  };

  render() {
    console.log(this.props.currentQuestion, 'this is the current question');
    return (
      <View>
        {this.createQuestion(
          this.props.questionObj ? this.props.questionObj : {},
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm);

const styles = StyleSheet.create({});
