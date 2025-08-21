import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';

function withBacklogStore(Component) {
  return function WithBacklogStore(props) {
    console.log('withBacklogStore', props);
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };
}

export default withBacklogStore;
