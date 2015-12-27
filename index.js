import makeStore from './src/store';
import startServer from './src/socketServer';

export const store = makeStore();

// Subscribing to a Redux store:
startServer(store);

// On starting the application, dispatch a set entries action to Redux
// and activates the next state (voting).
store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json')
});
store.dispatch({type: 'NEXT'});
