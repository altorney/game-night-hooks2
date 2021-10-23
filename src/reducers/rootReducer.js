import { defaultGames } from 'context/GlobalState';

export const UPDATE = 'UPDATE';
export const SUCCESSFUL_ADD = 'SUCCESSFUL_ADD';
export const SUCCESSFUL_DELETE = 'SUCCESSFUL_DELETE';
export const SUCCESSFUL_SELECTION = 'SUCCESSFUL_SELECTION';
export const CARD_SELECTION = 'CARD_SELECTION';
export const RESET_CARDS = 'RESET_CARDS';
export const RESET_GAMES = 'RESET_GAMES';
export const FAILURE = 'FAILURE';

const rootReducer = (state, action) => {
  switch (action.type) {
    case SUCCESSFUL_SELECTION:
      const selectedGames = getSelectedGames(state.games, action.payload);
      localStorage.setItem('gameNight', JSON.stringify(selectedGames));
      return selectedGames;

    case SUCCESSFUL_ADD:
      const addedGames = getGamesAfterAdd(state.games, action.payload);
      localStorage.setItem('gameNight', JSON.stringify(addedGames));
      return addedGames;

    case SUCCESSFUL_DELETE:
      const gamesAfterDelete = getGamesAfterDelete(state.games, action.payload);
      localStorage.setItem('gameNight', JSON.stringify(gamesAfterDelete));
      return gamesAfterDelete;

    case RESET_CARDS:
      return getResetGames(state.games);

    case RESET_GAMES:
      return defaultGames;

    case FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export function getGamesAfterAdd(games, newGame) {
  return {
    games: [...games, ...newGame],
    err: '',
  };
}

export function getGamesAfterDelete(games, id) {
  const gamesAfterDelete = games.filter((game) => game.id !== id);
  return {
    games: gamesAfterDelete,
    err: '',
  };
}

export function getSelectedGames(games, id) {
  const selectedGames = games.map((game) => {
    if (game.id === id) {
      game.selected = true;
    }
    return game;
  });

  return {
    games: selectedGames,
    err: '',
  };
}

export function getResetGames(games) {
  games.forEach((game) => (game.selected = false));
  return {
    games: games,
    err: '',
  };
}

export default rootReducer;
