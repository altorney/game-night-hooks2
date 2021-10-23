import React, { useContext } from 'react';
import './game-card.css';
import classnames from 'classnames';
import { GlobalContext } from 'context/global-context';
import { SUCCESSFUL_SELECTION, FAILURE } from 'reducers/rootReducer';

function GameCard(props) {
  const globalContext = useContext(GlobalContext);
  let gameCard = null;

  function handleClick(id) {
    gameCard.classList.add('game-card-click');
    try {
      globalContext.dispatch({ type: SUCCESSFUL_SELECTION, payload: id });
    } catch (err) {
      globalContext.dispatch({ type: FAILURE, payload: err });
    }
  }

  const myComponentClasses = classnames({
    'game-card': true,
    'game-card-click': props.game.selected,
  });

  return (
    <div className='card-wrapper' onClick={() => handleClick(props.game.id)}>
      <div className={myComponentClasses} ref={(el) => (gameCard = el)}>
        <div className='game-card-inner'>
          <div className='game-card-front'>?</div>
          <div className='game-card-back'>{props.game.title}</div>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
