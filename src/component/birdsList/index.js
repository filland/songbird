import React from 'react';
import './styles.scss';

export default function BirdsList(props) {
  const { birdsData, selectBird } = props;

  return (<div className="birds-list framed">
    {birdsData.map((bird) => (<div key={bird.id + bird.name} className="birds-list-item" onClick={
      () => {
        selectBird(bird.id - 1);
      }
    }>
      <div className="birds-list__dot-container">
        <div className="birds-list__dot" style={{ backgroundColor: bird.color }}></div>
      </div>
      <div>{bird.name}</div>
    </div>))
    }
  </div >);
}
