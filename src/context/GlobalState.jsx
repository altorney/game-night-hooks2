import React, { useReducer } from 'react';
import rootReducer from 'reducers/rootReducer';
import { GlobalContext } from './global-context';

export const defaultGames = {
  games: [
    { id: 1, title: 'Free pick', selected: false },
    { id: 2, title: 'Hand and foot', selected: false },
    { id: 3, title: 'Phase 10', selected: false },
    { id: 4, title: 'Sequence', selected: false },
    { id: 5, title: 'Trionimoes', selected: false },
    { id: 6, title: 'Blockus', selected: false },
    { id: 7, title: 'Skip Bo', selected: false },
  ],
  error: '',
};

const GlobalState = (props) => {
  const shuffleGames = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  function init(defaultGames) {
    let games = [];
    try {
      const gamesFromLocalStorage = localStorage.getItem('gameNight');
      if (gamesFromLocalStorage) {
        games = shuffleGames({ games, ...JSON.parse(gamesFromLocalStorage) });
      } else {
        games = shuffleGames(defaultGames);
      }
    } catch (err) {
      console.log('There was an error:', err);
    }
    return games;
  }

  const [state, dispatch] = useReducer(rootReducer, defaultGames, init);
  return (
    <GlobalContext.Provider value={{ state: state, dispatch: dispatch }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
