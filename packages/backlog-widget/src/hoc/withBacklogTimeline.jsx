import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';

function withBacklogTimeline(Component) {
  return (props) => {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };
}

export default withBacklogTimeline;
