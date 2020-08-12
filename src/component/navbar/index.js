import React from 'react';
import './styles.scss';
import logo from '../../files/logo.svg';

export default function Navbar(props) {
  const { birdsTypes, currentLevel, score } = props;
  return (
    <div className="songbird-navbar">
      <div className="navbar-logo-score">
        <div>
          <img src={logo} alt='logo' />
        </div>
        <div className='navbar-score'>Результат: {score}</div>
      </div>
      <div className="navbar-list">
        {birdsTypes.map((bird, index) => <div key={bird}
          className={`songbird-navbar-element ${index === currentLevel && ' selected-level'}`}>
          {bird}
        </div>)}
      </div>
    </div>);
}
