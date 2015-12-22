import {List, Map} from 'immutable';

// sets an entries key in the state Map, and sets value of that to passed entries
export function setEntries(state, entries) {

  // converts the data type of the entries argument to an Immutable List
  // instead of assuming it is an Immutable List already. This brings benefits.
  // We can pass any iterable object (arrays, maps, strings, and sets) now.
  // Any object is iterable if it implements the .next() method correctly.
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols
  return state.set('entries', List(entries));
}

// a function to move two map entries to a separate current vote key
// The take function returns the first X amount of entries from a map:
// https://facebook.github.io/immutable-js/docs/#/Map/take
// and the skip function returns the map, sans the first X amount of entries
// https://facebook.github.io/immutable-js/docs/#/Map/skip
// Merge ensures that the entries map that is returned is efficiently updated
// with the changes that are happening here. This is quite cool. I like it.
export function next(state) {
  const entries = state.get('entries');
  return state.merge({
    vote: Map({pair: entries.take(2)}),
    entries: entries.skip(2)
  });
}

export function vote(state, entry) {
  return state.updateIn(
    ['vote', 'tally', entry],
    0,
    tally => tally + 1
  );
}
