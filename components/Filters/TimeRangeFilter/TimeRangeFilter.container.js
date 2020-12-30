import {connect} from 'react-redux';
import {selectTimeRangeFilter} from '../../../redux/actions/transactions.action';
import TimeRangeFilter from './TimeRangeFilter.component';

const mapStateToProps = (state, ownProps) => ({
  props: ownProps,
});

const mapDispatchToProps = (dispatch) => ({
  selectTimeRangeFilter: (filter) => dispatch(selectTimeRangeFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeRangeFilter);
