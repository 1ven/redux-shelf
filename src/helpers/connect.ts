import * as React from 'react';
import assign = require('lodash/assign');
import { connect as reactReduxConnect } from 'react-redux';

/* // two shelf features implementations tasks should be assigned. this class is used to handle maps of pages */
/* export class Page extends React.Component<{}, {}> { */
/*   componentWillMount() { */
/*     this.componentWillMount && this.componentWillMount(); */

/*     !this.props.isCached && this.loadPage && this.loadPage(); */
/*   } */

/*   componentWillReceiveProps(nextProps) { */
/*     this.componentWillReceiveProps && this.componentWillReceiveProps(nextProps); */

/*     if (this.props.id !== nextProps.id && !nextProps.isCached) { */
/*       this.updatePage && this.updatePage(nextProps); */
/*     } */
/*   } */
/* } */

// mb we don't need it by now
export function connect(Component, customMapStateToProps, customMapDispatchToProps, {
  pageSelector,
  pageDataSelector,
}) {
  function mapStateToProps(state, ownProps?) {
    const page = pageSelector(state, ownProps);

    const props = page && {
      data: page.lastUpdated && pageDataSelector(state, ownProps),
      isFetching: page.isFetching,
      isCached: !! page.lastUpdated,
    };

    return assign(
      {},
      {
        isFetching: true,
        isCached: false,
      },
      props
    );
  }

  function mapDispatchToProps(state, ownProps?) {}

  return connect(
    state => ({ state }),
    dispatch => ({ dispatch }),
    function({ state }, { dispatch }, ownProps) {
      return assign(
        {},
        ownProps,
        mapStateToProps(state, ownProps),
        mapDispatchToProps(dispatch, ownProps),
        customMapStateToProps(state, ownProps),
        customMapDispatchToProps(dispatch, ownProps)
      );
    }
  )(Component);
}
