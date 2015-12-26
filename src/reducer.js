import {setEntries, next, vote, INITIAL_STATE} from './core';

// So there are two things going on here that are pretty new to me:
// Actions, and reducers.
// Actions are a Redux concept. They're basically an object
// that represents a change in the application state.
// Every action has a type, but may have additional attributes.
// Redux also needs a way to turn an action into a function call,
// but for that to work, you need a middle-man. This middle-man
// is a reducer. It's called a reducer because it's compatible
// with native JS array reduction:
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
// Array reduction is taking a collection of variables aiming to
// do stuff with them and ending up with a single value. Hence, reduction.
// In a Redux sense, I think this means that we can have a bunch
// of actions, and and we eventually end up at a final state.

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      return state.update('vote',
                          voteState => vote(voteState, action.entry))
    default:
      return state;
  }
}
