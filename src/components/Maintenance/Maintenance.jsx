import { GlobalContext } from 'context/global-context';
import { defaultGames } from 'context/GlobalState';
import React, { useContext } from 'react';

import './maintenance.css';

function getGamesAfterAdd(games, newGame) {
  return {
    games: [...games, ...newGame],
    err: '',
  };
}

function getGamesAfterDelete(games, id) {
  const gamesAfterDelete = games.filter((game) => game.id !== id);
  return {
    games: gamesAfterDelete,
    err: '',
  };
}

function getResetGames(games) {
  games.forEach((game) => (game.selected = false));
  return {
    games: games,
    err: '',
  };
}

function Maintenance() {
  const globalContext = useContext(GlobalContext);

  function handleAddClick() {
    let newId = Math.random();
    try {
      const gamesAfterAdd = getGamesAfterAdd(globalContext.state.games, [
        { id: newId, title: newGame.value },
      ]);
      storeGameChanges(gamesAfterAdd);
    } catch (err) {
      setError(err);
    }

    newGame.value = '';
  }

  function handleDeleteClick(id) {
    try {
      const gamesAfterDelete = getGamesAfterDelete(
        globalContext.state.games,
        id
      );
      storeGameChanges(gamesAfterDelete);
    } catch (err) {
      setError(err);
    }
  }

  function handleResetClick() {
    try {
      const gamesAfterReset = getResetGames(globalContext.state.games);
      storeGameChanges(gamesAfterReset);
    } catch (err) {
      setError(err);
    }
  }

  function handleResetGamesClick() {
    try {
      storeGameChanges(defaultGames);
    } catch (err) {
      setError(err);
    }
  }

  function setError(err) {
    globalContext.setState({
      ...globalContext.state,
      error: `There was an error- ${err}`,
    });
  }

  function storeGameChanges(games) {
    localStorage.setItem('gameNight', JSON.stringify(games));
    globalContext.setState(games);
  }

  let newGame = null;
  return (
    <div>
      <div className='maintenance-games-wrapper'>
        {globalContext?.state.error && <div>Sorry there was an error</div>}
        Games
        {globalContext.state.games?.map((game) => {
          return (
            <div className='game-row' key={game.id}>
              <div className='game-title'>{game.title}</div>
              <div>
                <button
                  className='delete'
                  onClick={() => handleDeleteClick(game.id)}
                ></button>
              </div>
            </div>
          );
        })}
      </div>
      <div className='maintenance-add-wrapper'>
        Add a new game
        <div className='add-game-row'>
          <div className='add-input'>
            <input type='text' id='new-game' ref={(el) => (newGame = el)} />
          </div>
          <div>
            <button className='add' onClick={handleAddClick} />
          </div>
        </div>
        <div>
          <button className='reset' onClick={handleResetClick}>
            Reset swipes
          </button>
          <button className='reset' onClick={handleResetGamesClick}>
            Reset games
          </button>
        </div>
      </div>
    </div>
  );
}

export default Maintenance;
