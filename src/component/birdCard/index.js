import React from 'react';
import './styles.scss';
import Player from '../audioPlayer';

export default function BirdCard(props) {
  const defaultBird = {
    image: './default-bird.jpg',
  };
  const { expanded, hidden, bird = defaultBird } = props;
  const player = <Player url={bird.audio}></Player>;
  return (<div className="bird framed">
    <div className="bird-main">
      <div className="bird-pic">
        {hidden ? <img src={defaultBird.image} alt='a bird' /> : <img src={bird.image} alt='a bird' />}
      </div>
      <div className="bird-name-player">
        <h3>
          {hidden ? '******' : bird.name}
        </h3>
        <hr></hr>
        {expanded && (
          <>
            <p>{bird.species}</p>
            <hr></hr>
          </>
        )}
        <div className="bird-player">
          {/* <Player url={'https://www.xeno-canto.org/sounds/uploaded/XIQVMQVUPP/XC518684-Grands%20corbeaux%2009012020%20Suzon.mp3'}></Player> */}
          {player}
        </div>
      </div>
    </div>
    {expanded && (
      <>
        <div>
          {bird.description}
        </div>
      </>
    )}

  </div>);
}
