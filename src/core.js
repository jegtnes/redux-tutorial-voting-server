import {List} from 'immutable';

export function setEntries(state, entries) {
  // sets an entries key in the state Map, and sets value of that to passed entries

  // converts the data type of the entries argument to an Immutable List
  // instead of assuming it is an Immutable List already. This brings benefits.
  // We can pass any iterable object (arrays, maps, strings, and sets) now.
  // Any object is iterable if it implements the .next() method correctly.
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols
  return state.set('entries', List(entries));
}
