import {setEntries, next, vote} from './core';

// So there are two things going on here that are pretty new to me:
// Actions, and reducers.
// Actions are a Redux concept. They're basically an object
// that represents a change in the application state.
// Every action has a type, but may have additional attributes.
// Redux also needs a way to turn an action into a function call,
// but for that to work, you need a middle-man. This middle-man
// is a reducer.
// If the action is unknown, we return the current state.
// No harm done.

export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
      break;
    case 'NEXT':
      return next(state);
    case 'VOTE':
      return vote(state, action.entry);
    default:
      return state;
  }
}
