import * as React from 'react';
import {View, Text} from 'react-native';
import RNDateFormat from 'react-native-date-format';

class FormattedDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: null};
    this.formatDate();
  }
  componentDidUpdate = async () => {
    this.formatDate();
    return true;
  };

  formatDate = () => {
    RNDateFormat.formatDate(
      this.props.date,
      'yyyy-MM-dd',
      'MMM dd',
      (formatedDate) => {
        this.setState({date: formatedDate});
      },
    );
  };

  render() {
    return <Text style={this.props.style}>{this.state.date}</Text>;
  }
}

export default FormattedDate;
