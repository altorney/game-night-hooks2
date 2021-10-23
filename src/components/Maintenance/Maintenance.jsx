import { GlobalContext } from 'context/global-context';
import React, { useContext } from 'react';
import {
  SUCCESSFUL_ADD,
  SUCCESSFUL_DELETE,
  FAILURE,
  RESET_CARDS,
  RESET_GAMES,
} from 'reducers/rootReducer';

import './maintenance.css';

function Maintenance() {
  const globalContext = useContext(GlobalContext);

  function handleAddClick() {
    let newId = Math.random();
    try {
      globalContext.dispatch({
        type: SUCCESSFUL_ADD,
        payload: [{ id: newId, title: newGame.value }],
      });
    } catch (err) {
      globalContext.dispatch({ type: FAILURE, payload: err });
    }
    newGame.value = '';
  }

  function handleDeleteClick(id) {
    try {
      globalContext.dispatch({ type: SUCCESSFUL_DELETE, payload: id });
    } catch (err) {
      globalContext.dispatch({ type: FAILURE, payload: 'There was an error' });
    }
  }

  function handleResetClick() {
    try {
      globalContext.dispatch({ type: RESET_CARDS });
    } catch (err) {
      globalContext.dispatch({ type: FAILURE, payload: 'There was an error' });
    }
  }

  function handleResetGamesClick() {
    try {
      globalContext.dispatch({ type: RESET_GAMES });
    } catch (err) {
      globalContext.dispatch({ type: FAILURE, payload: 'There was an error' });
    }
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
