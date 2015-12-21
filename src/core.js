export function setEntries(state, entries) {

  // sets an entries key in the state Map, and sets value of that to passed entries
  return state.set('entries', entries);
}
