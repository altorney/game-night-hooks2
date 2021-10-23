import React, { useContext } from 'react';
import './game-card.css';
import classnames from 'classnames';
import { GlobalContext } from 'context/global-context';

function getSelectedGames(games, id) {
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

function GameCard(props) {
  const globalContext = useContext(GlobalContext);
  let gameCard = null;

  function handleClick(id) {
    gameCard.classList.add('game-card-click');

    try {
      const selectedGames = getSelectedGames(globalContext.state.games, id);
      localStorage.setItem('gameNight', JSON.stringify(selectedGames));
      globalContext.setState(selectedGames);
    } catch (err) {
      globalContext.setState({
        ...globalContext.state,
        error: `There was an error- ${err}`,
      });
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
