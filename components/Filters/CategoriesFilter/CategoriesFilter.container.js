import {connect} from 'react-redux';
import {selectChartType} from '../../../redux/actions/transactions.action';
import ChartTypeFilter from './CategoriesFilter.component';

const mapStateToProps = (state, ownProps) => ({
  props: ownProps,
});

const mapDispatchToProps = (dispatch) => ({
  selectChartType: (chartTypeOption) =>
    dispatch(selectChartType(chartTypeOption)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartTypeFilter);
