import {List, Map} from 'immutable';

// Redux reducers need to have a meaningful initial application state.
// As this is where the application's core logic is, we set it here.
export const INITIAL_STATE = Map();

function getWinners(vote) {
  // chuck the no-voting plebs out by returning an empty array to concatenate
  if (!vote) {
    return [];
  }
  // this syntax confused me at first but sets two individual variables, a & b
  // to the 0 and 1 indices of vote.get('pair'). This is not one variable
  // despite it looking like it. This is ES6 destructuring, which assigns
  // the first variable to the 0th index, the second variable to the 1st index
  // etc. Really quite cool, albeit unreadable at first.
  // This is called ES6 destructuring and has some more features & quirks:
  // https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/
  const [firstFilm, secondFilm] = vote.get('pair');

  // getIn has a really encouraging name. get in!
  // what this little baby does is follow the path of keys or indices from its
  // roots and grabs the value from that. The second parameter is what you
  // get if nothing exists there. you retrieve something for nothing.
  // which is kinda cool. also capitalists' worst nightmare.
  const firstFilmVotes = vote.getIn(['tally', firstFilm], 0);
  const secondFilmVotes = vote.getIn(['tally', secondFilm], 0);

  // here we simply return an array with the title of the film with most votes
  // and if they're tied, return an array of both
  // this lets us concatenate them easily to a list later
  // delightfully simple and straight-forward. ES3 ✨

  if (firstFilmVotes > secondFilmVotes) {
    return [firstFilm];
  }
  else if (secondFilmVotes > firstFilmVotes) {
    return [secondFilm];
  }
  else return [firstFilm, secondFilm];
}

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
export function next(state) {
  const entries =
    state.get('entries')
         .concat(getWinners(state.get('vote')));

  // If there is only one entry left in entries, we have a winner.
  // We return the original state and not just a new map for reasons.
  // I'm not clever enough to know exactly why all by myself, but the
  // tutorial states future-proofing. We may have more data passing through
  // the function in the future, and you may want that to stay intact.
  // so this is a more grown-up way of doing things, which is cool.
  // I can get down with that.
  if (entries.size === 1) {
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first())
  }

  else {
    // Merge ensures that the entries map that is returned is efficiently
    // updated with the changes that are happening here. This is quite cool.
   return state.merge({

     // The take function returns the first X amount of entries from a map:
     // https://facebook.github.io/immutable-js/docs/#/Map/take
     vote: Map({pair: entries.take(2)}),

     // the skip function returns the map, sans the first X amount of entries
     // https://facebook.github.io/immutable-js/docs/#/Map/skip
     entries: entries.skip(2)
   });
  }
}

// a function to update a single entry in a vote with a vote tally
// updateIn is a funny little Immutable concept.
// The first parameter is the nested structure path we are updating
// in this instance: e.g. vote -> tally -> Trainspotting
// the second parameter is what we're setting this to if the value is missing
// e.g. if Trainspotting hasn't received a vote until now.
// the third parameter is what we're updating the value to
// pretty fucking metal, though.
// https://facebook.github.io/immutable-js/docs/#/Map/updateIn
export function vote(state, entry) {
  return state.updateIn(
    ['vote', 'tally', entry],
    0,
    tally => tally + 1
  );
}
