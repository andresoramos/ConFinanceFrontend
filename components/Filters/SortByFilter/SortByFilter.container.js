import {connect} from 'react-redux';
import {sortBy} from '../../../redux/actions/transactions.action';
import SortByFilter from './SortByFilter.component';

const mapStateToProps = (state, ownProps) => ({
  props: ownProps,
});

const mapDispatchToProps = (dispatch) => ({
  sortBy: (sortByOption) => dispatch(sortBy(sortByOption)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SortByFilter);
