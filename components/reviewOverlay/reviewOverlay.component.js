import React, {Component} from 'react';
import Snackbar from 'react-native-snackbar';
import moment from 'moment';
import {
  Button,
  Overlay,
  Rating,
  Input,
  Card,
  colors,
} from 'react-native-elements';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Linking,
  TextInput,
} from 'react-native';
import {getCurrUser, findUserName} from '../../services/auth.service';
import {
  findTotalRatings,
  findInitialRating,
  addRating,
  submitComment,
} from '../../services/rating.service';
import styles from './reviewOverlay.component.style';
import {orderArr} from '../../services/sort.service';
// import AddIcon from '@material-ui/icons/Add';
import {connect} from 'react-redux';
import {addRatingToState, addCommentObject} from './../../redux/reducers/index';
import {ScrollView} from 'react-native-gesture-handler';

class ReviewOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      comment: false,
      name: '',
      commentText: '',
      commentArr: [],
      noRating: false,
    };
  }

  componentDidMount = async () => {
    const currUser = await getCurrUser();
    this.setState({...this.state, currentId: currUser._id});
    await this.createCommentsList();
  };
  handleRatingChange = (num) => {
    let newState = {...this.state, rating: num};
    this.setState(newState);
  };
  handleSubmit = async () => {
    if (this.state.rating === null) {
      return this.setState({...this.state, noRating: true});
    }
    const currentUser = await getCurrUser();
    const payloadOne = {
      ...this.state,
      companyId: this.props.business._id,
      userId: currentUser._id,
    };

    await addRating(payloadOne);

    const commentSubmitted = await submitComment(
      currentUser._id,
      this.props.business._id,
      this.state.commentText,
      this.state.rating,
    );
    const payload = {
      companyId: this.props.business._id,
      rating: commentSubmitted.final,
      userId: currentUser._id,
    };
    this.props.addRatingToState(payload);
    this.props.addCommentObject({
      ...this.state,
      companyId: this.props.business._id,
      userId: currentUser._id,
      timeStamp: commentSubmitted.ts,
    });
    const commentArr = await this.createCommentsList(true);
    this.setState({...this.state, comment: false, rating: null, commentArr});
  };

  handleChangeComment = async () => {
    try {
      const user = await getCurrUser();
      console.log(
        user,
        'This is the current user, which for some reason has no last name',
      );
      const name = this.correctName(user.firstName, user.lastName);
      this.setState({...this.state, comment: true, name});
    } catch (error) {
      console.log(
        console.log(`The error from handle comment change is: ${error}`),
      );
    }
  };
  correctName = (firstName, lastName) => {
    let name = '';
    let secondName = '';
    for (var i = 0; i < firstName.length; i++) {
      if (i === 0) {
        name += firstName[i].toUpperCase();
      } else {
        name += firstName[i].toLowerCase();
      }
    }
    for (i = 0; i < lastName.length; i++) {
      if (i === 0) {
        secondName += lastName[i].toUpperCase();
      } else {
        secondName += lastName[i].toLowerCase();
      }
    }
    return `${name} ${secondName}`;
  };
  ratingWarning = () => {
    return Snackbar.show({
      text: 'Please include a rating along with your review',
      duration: Snackbar.LENGTH_INDEFINITE,
      action: {
        text: 'OK',
        textColor: 'green',
        onPress: () => {
          this.setState({...this.state, noRating: false});
        },
      },
    });
  };

  createCommentsList = async (fromSubmit) => {
    if (this.props.business) {
      let finalArr = [];
      if (this.props.business.ourReviews) {
        const reviews = this.props.business.ourReviews;
        for (var key in reviews) {
          const userInfo = await findUserName(key);
          const {firstName, lastName} = userInfo;
          const commentName = this.correctName(firstName, lastName);

          for (var name in reviews[key]) {
            const finalObj = {
              ...reviews[key][name],
              name: commentName,
              dateCreated: moment.unix(Number(name)).format('MM/DD/YYYY'),
              ts: name,
            };

            finalArr.push(finalObj);
          }
        }
      }
      if (fromSubmit) {
        return finalArr;
      }
      this.setState({...this.state, commentArr: finalArr});
    }
  };

  renderComments = (commentArr) => {
    if (!commentArr || commentArr.length === 0) {
      return null;
    }
    const newCommentArr = orderArr(commentArr, [], 0);

    return newCommentArr.map((comment, i) => {
      const name = comment.name;
      const timeElapsed = moment.unix(Number(comment.ts)).fromNow();
      const commentText = comment.comment;
      return (
        <View
          key={i}
          style={
            commentText.length === 0
              ? styles.reviewCardEmpty
              : styles.reviewCard
          }>
          <View style={styles.cardRating}>
            <Text style={styles.cardName}>{name}</Text>
            <Rating
              startingValue={comment.rating}
              readonly
              style={{paddingTop: 3.5, marginLeft: 10}}
              imageSize={12}
            />
            <Text style={styles.timeElapsed}>{timeElapsed}</Text>
          </View>
          <Text>{commentText}</Text>
        </View>
      );
    });
  };

  render() {
    return (
      <Overlay
        isVisible={this.props.isVisible}
        onBackdropPress={this.props.closeOverlay}>
        {!this.state.comment ? (
          <View style={styles.container}>
            <View style={styles.firstRow}>
              <View style={styles.firstRowLeft}>
                <Text style={styles.header}>{this.props.business.name}</Text>
                <Text>{this.props.business.formatted_address}</Text>
              </View>
              <View style={styles.firstRowRight}>
                <Button
                  onPress={this.handleChangeComment}
                  title={'Add a review'}
                  icon={{name: 'add', color: 'white', size: 15}}
                />
              </View>
            </View>
            <View style={styles.commentScroll}>
              <ScrollView>
                {this.renderComments(this.state.commentArr)}
              </ScrollView>
            </View>
          </View>
        ) : (
          <View style={styles.secondContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.header}>{this.props.business.name}</Text>
            </View>
            <View style={styles.space}></View>
            <View>
              <Text style={styles.subHeader}>{this.state.name}</Text>
            </View>
            <View style={styles.ratingRow}>
              <Rating
                imageSize={20}
                //   ratingCount={5}
                startingValue={
                  this.state.rating === null ? 0 : this.state.rating
                }
                fractions={1}
                onFinishRating={(number) => {
                  console.log(
                    number,
                    'if you make this zero, it should not be null',
                  );
                  this.handleRatingChange(number);
                }}
              />
              <Text style={{color: 'grey', paddingTop: 2, paddingLeft: 15}}>
                {findTotalRatings(this.props.business) === 1
                  ? '1 Rating'
                  : `${findTotalRatings(this.props.business)} ratings`}
              </Text>
            </View>
            <Text style={styles.rateText}>Rate this business</Text>
            <View style={styles.largeSpace} />
            <View style={styles.input}>
              <Input
                onChange={(e) => {
                  this.setState({
                    ...this.state,
                    commentText: e.nativeEvent.text,
                  });
                }}
                multiline={true}
              />
            </View>
            {this.state.noRating && this.ratingWarning()}
            <View style={styles.smallSpace} />
            <Button onPress={this.handleSubmit} title="Submit" />
          </View>
        )}
      </Overlay>
    );
  }
}
const mapStateToProps = (state) => ({
  businesses: state.searchReducer.nearbyBusinesses,
});
const mapDispatchToProps = (dispatch) => {
  return {
    addRatingToState: (payload) => {
      dispatch(addRatingToState(payload));
    },
    addCommentObject: (commentObj) => {
      dispatch(addCommentObject(commentObj));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewOverlay);
