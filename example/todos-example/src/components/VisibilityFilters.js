import React from "react";
import cx from "classnames";
import { connect } from "react-redux";
import { VISIBILITY_FILTERS } from "../constants";
import visibilityActionsAndReducer from '../redux/visibilityActionsAndReducer'

const VisibilityFilters = ({ activeFilter, setFilter }) => {
  return (
    <div className="visibility-filters">
      {Object.keys(VISIBILITY_FILTERS).map(filterKey => {
        const currentFilter = VISIBILITY_FILTERS[filterKey];
        return (
          <span
            key={`visibility-filter-${currentFilter}`}
            className={cx(
              "filter",
              currentFilter === activeFilter && "filter--active"
            )}
            onClick={() => {
              setFilter(currentFilter);
            }}
          >
            {currentFilter}
          </span>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return { activeFilter: state.visibilityFilter };
};
// export default VisibilityFilters;
export default connect(
  mapStateToProps, (dispatch) => ({
      setFilter:(filter) => dispatch(visibilityActionsAndReducer.SET_FILTER.call(filter))
  }))(VisibilityFilters);
