import React from 'react';
import GameCard from 'components/game-card/Game-card';
import './main.css';
import { useContext } from 'react';
import { GlobalContext } from 'context/global-context';

function Main() {
  const { state } = useContext(GlobalContext);
  return (
    <div className='content'>
      {state.games?.map((game) => {
        return <GameCard key={game.id} game={game} />;
      })}
    </div>
  );
}

export default Main;
