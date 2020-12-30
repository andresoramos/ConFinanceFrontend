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
import {Colors} from '../colors';
import {survey} from '../surveys/general';

export default class EthicsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {backgroundColor: Colors.LIGHT4, answersSoFar: ''};

    this.width = Math.round(Dimensions.get('window').width);
    this.height = Math.round(Dimensions.get('window').height);
  }

  onSurveyFinished(answers) {
    /**
     *  By using the spread operator, array entries with no values, such as info questions, are removed.
     *  This is also where a final cleanup of values, making them ready to insert into your DB or pass along
     *  to the rest of your code, can be done.
     *
     *  Answers are returned in an array, of the form
     *  [
     *  {questionId: string, value: any},
     *  {questionId: string, value: any},
     *  ...
     *  ]
     *  Questions of type selection group are more flexible, the entirity of the 'options' object is returned
     *  to you.
     *
     *  As an example
     *  {
     *      questionId: "favoritePet",
     *      value: {
     *          optionText: "Dogs",
     *          value: "dog"
     *      }
     *  }
     *  This flexibility makes SelectionGroup an incredibly powerful component on its own. If needed it is a
     *  separate NPM package, react-native-selection-group, which has additional features such as multi-selection.
     */

    const infoQuestionsRemoved = [...answers];

    // Convert from an array to a proper object. This won't work if you have duplicate questionIds
    const answersAsObj = {};
    for (const elem of infoQuestionsRemoved) {
      answersAsObj[elem.questionId] = elem.value;
    }

    this.props.navigation.navigate('SurveyCompleted', {
      surveyAnswers: answersAsObj,
    });
  }

  /**
   *  After each answer is submitted this function is called. Here you can take additional steps in response to the
   *  user's answers. From updating a 'correct answers' counter to exiting out of an onboarding flow if the user is
   *  is restricted (age, geo-fencing) from your app.
   */
  onAnswerSubmitted(answer) {
    this.setState({
      answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2),
    });
    switch (answer.questionId) {
      case 'favoriteColor': {
        //      if (COLORS.includes(answer.value.toLowerCase())) {
        this.setState({backgroundColor: answer.value.toLowerCase()});
        //    }
        break;
      }
      default:
        break;
    }
  }

  renderPreviousButton(onPress, enabled) {
    console.log('button ', enabled);
    //   return enabled ? (
    return (
      <Button
        type="outline"
        icon={<Icon style={styles.nextButtonIcon} name={'return-up-back'} />}
        containerStyle={styles.nextButtonContainer}
        buttonStyle={styles.nextButton}
        onPress={onPress}
        disabled={!enabled}
      />
    );
    //   ) : null;
  }

  renderNextButton(onPress, enabled) {
    console.log('state', this.state);
    return (
      <Button
        type="outline"
        containerStyle={styles.nextButtonContainer}
        titleStyle={styles.nextButtonTitle}
        buttonStyle={styles.nextButton}
        /* title={"Let's get Started"} */
        title={''}
        icon={<Icon style={styles.nextButtonIcon} name={'checkmark'} />}
        onPress={onPress}
        disabled={!enabled}
      />
    );
  }

  renderFinishedButton(onPress, enabled) {
    return (
      <View
        style={{flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10}}>
        <Button
          title={'Finished'}
          onPress={onPress}
          disabled={!enabled}
          color={Colors.DARK1}
        />
      </View>
    );
  }

  renderButton(data, index, isSelected, onPress) {
    return (
      <View
        key={`selection_button_view_${index}`}
        style={{marginBottom: 5, justifyContent: 'flex-start'}}>
        <Button
          key={`button_${index}`}
          type="outline"
          containerStyle={styles.buttonContainer}
          titleStyle={[
            styles.buttonTitle,
            {color: isSelected ? Colors.WHITE : Colors.DARK2},
          ]}
          buttonStyle={[
            styles.button,
            {backgroundColor: isSelected ? Colors.DARK2 : Colors.WHITE},
          ]}
          style={isSelected ? {fontWeight: 'bold'} : {}}
          title={data.optionText}
          onPress={onPress}
        />
      </View>
    );
  }

  renderQuestionText(questionText) {
    return (
      <View style={{marginLeft: 10, marginRight: 10}}>
        <Text numLines={1} style={styles.questionText}>
          {questionText}
        </Text>
      </View>
    );
  }

  renderTextBox(onChange, value, placeholder, onBlur) {
    return (
      <View>
        <TextInput
          style={styles.textBox}
          onChangeText={(text) => onChange(text)}
          numberOfLines={1}
          underlineColorAndroid={'white'}
          placeholder={placeholder}
          placeholderTextColor={'rgba(184,184,184,1)'}
          value={value}
          multiline
          onBlur={onBlur}
          blurOnSubmit
          returnKeyType="done"
        />
      </View>
    );
  }

  renderNumericInput(onChange, value, placeholder, onBlur) {
    return (
      <TextInput
        style={styles.numericInput}
        onChangeText={(text) => {
          onChange(text);
        }}
        underlineColorAndroid={'white'}
        placeholderTextColor={'rgba(184,184,184,1)'}
        value={String(value)}
        placeholder={placeholder}
        keyboardType={'numeric'}
        onBlur={onBlur}
        maxLength={3}
      />
    );
  }

  renderInfoText(infoText) {
    var logoSize = this.width * 0.5;
    return (
      <View>
        <View style={styles.logoContainer}>
          <Image
            style={[{width: logoSize, height: logoSize}, styles.logoImg]}
            source={require('../images/consciousconsumerlogo3.png')}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>

        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>{infoText}</Text>
        </View>
      </View>
    );
  }

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
              maxWidth: this.width * 2,
              minHeight: this.width,
              maxHeight: this.height,
            },
          ]}>
          <SimpleSurvey
            ref={(s) => {
              this.surveyRef = s;
            }}
            survey={survey}
            renderSelector={this.renderButton.bind(this)}
            containerStyle={[
              styles.surveyContainer,
              {maxWidth: this.width, maxHeight: this.height},
            ]}
            selectionGroupContainerStyle={styles.selectionGroupContainer}
            navButtonContainerStyle={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 20,
            }}
            renderPrevious={this.renderPreviousButton.bind(this)}
            renderNext={this.renderNextButton.bind(this)}
            renderFinished={this.renderFinishedButton.bind(this)}
            renderQuestionText={this.renderQuestionText}
            onSurveyFinished={(answers) => this.onSurveyFinished(answers)}
            onAnswerSubmitted={(answer) => this.onAnswerSubmitted(answer)}
            renderTextInput={this.renderTextBox}
            renderNumericInput={this.renderNumericInput}
            renderInfo={this.renderInfoText.bind(this)}
          />
        </View>

        <ScrollView style={styles.answersContainer}>
          <Text style={{textAlign: 'center'}}>JSON output</Text>
          <Text>{this.state.answersSoFar}</Text>
        </ScrollView>
      </View>
    );
  }
}

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
