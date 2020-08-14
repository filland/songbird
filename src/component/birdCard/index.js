import React from 'react';
import './styles.scss';
import Player from '../audioPlayer';
import defaultBirdPic from '../../data/default-bird.jpg';

export default function BirdCard(props) {
  const defaultBird = {
    image: defaultBirdPic,
  };
  const { expanded, hidden, bird = defaultBird } = props;
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
        <div>
          <Player url={bird.audio}></Player>
        </div>
      </div>
    </div>
    {expanded && (
      <div className='bird-description'>
        {bird.description}
      </div>
    )}

  </div>);
}
