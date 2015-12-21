import {List} from 'immutable';

export function setEntries(state, entries) {

  // sets an entries key in the state Map, and sets value of that to passed entries
  // Returning an explicit List instead of whatever was passed to this function
  // ensures that anything iterable passed to it gets converted into an Immutable List
  // iterable objcts have a .next() method.
  // examples of native iterable objects are arrays, maps, strings, and sets.
  return state.set('entries', List(entries));
}
