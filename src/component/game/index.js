/* eslint-disable class-methods-use-this */
import React from 'react';
import birdsData from '../../common/birdsData';
import Navbar from '../navbar';
import BirdCard from '../birdCard';
import BirdsList from '../birdsList';

import win from '../../files/win.mp3';
import error from '../../files/error.mp3';

import './styles.scss';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      birds: [],
      currentLevel: 0,
      correctBirdIndex: -1,
      selectedBirdIndex: -1,
      currentScore: 0,
      attempts: 0,
      started: false,
      finished: false,
    };
  }

  componentDidMount() {
    const { currentLevel } = this.state;
    const birds = [...birdsData[currentLevel]];

    birds.forEach((bird) => bird.color = 'gray');

    this.setState({
      birds,
      currentLevel: 0,
      // correctBirdIndex: this.getRandomIndex(birds.length - 1),
      correctBirdIndex: 1,
      selectedBirdIndex: -1,
      currentScore: 0,
      attempts: 0,
      gameStarted: false,
      gameFinished: false,
      levelStarted: false,
      levelFinished: false,
    });
  }

  getRandomIndex = (maxIndex) => Math.round(Math.random() * maxIndex);

  selectBirdHandler = (index) => {
    const {
      correctBirdIndex,
      birds,
      currentScore,
      levelFinished,
      attempts,
    } = this.state;

    let newScore = currentScore;
    let lFinished = levelFinished;
    let attemptsNumber = attempts;

    // if current level is finished
    // no need to go down
    if (levelFinished) {
      this.setState({
        selectedBirdIndex: index,
      });
      return;
    }

    // check if bird was found (level finished)
    if (index === correctBirdIndex) {
      this.playWinSound();

      // mark that current level is finished
      lFinished = true;

      for (let i = 0; i < birds.length; i += 1) {
        const bird = birds[i];
        if ((bird.id - 1) === index) {
          bird.color = '#00bc8c';
        }
      }

      const MAX_SCORE_FOR_LEVEL = 5;

      // add score if win
      newScore += attempts >= 5 ? 0 : MAX_SCORE_FOR_LEVEL - attempts;
    } else {
      this.playErrorSound();

      // add attempt if not win
      attemptsNumber += 1;

      for (let i = 0; i < birds.length; i += 1) {
        const bird = birds[i];
        if ((bird.id - 1) === index) {
          bird.color = 'red';
        }
      }
    }

    this.setState({
      birds,
      selectedBirdIndex: index,
      currentScore: newScore,
      levelFinished: lFinished,
      attempts: attemptsNumber,
    });
  }

  playWinSound() {
    const winSound = new Audio(win);
    winSound.volume = 0.05;
    winSound.play();
  }

  playErrorSound() {
    const errorSound = new Audio(error);
    errorSound.volume = 0.05;
    errorSound.play();
  }

  nextLevel = () => {
    const { currentLevel } = this.state;

    // check if the game is finished (all levels finished)
    if (currentLevel === 5) {
      this.setState({
        gameFinished: true,
      });
      return;
    }

    const nextLevel = currentLevel + 1;
    const birds = birdsData[nextLevel];
    birds.forEach((bird) => bird.color = 'gray');
    this.setState({
      birds,
      currentLevel: nextLevel,
      correctBirdIndex: 1,
      // correctBirdIndex: this.getRandomIndex(birds.length - 1),
      selectedBirdIndex: -1,
      attempts: 0,
      levelStarted: false,
      levelFinished: false,
    });
  }

  startNewGame = () => {
    const FIRST_LEVEL = 0;
    const birds = [...birdsData[FIRST_LEVEL]];
    birds.forEach((bird) => bird.color = 'gray');

    this.setState({
      birds,
      currentLevel: FIRST_LEVEL,
      // correctBirdIndex: this.getRandomIndex(birds.length - 1),
      correctBirdIndex: 1,
      selectedBirdIndex: -1,
      currentScore: 0,
      attempts: 0,
      gameStarted: false,
      gameFinished: false,
      levelStarted: false,
      levelFinished: false,
    });
  }

  render() {
    const {
      birds,
      currentLevel,
      correctBirdIndex,
      selectedBirdIndex,
      levelFinished,
      gameFinished,
      currentScore,
    } = this.state;
    const correctBird = birds[correctBirdIndex];
    const selectedBird = birds[selectedBirdIndex];
    const birdsTypes = ['Разминка', 'Воробьиные', 'Лесные птицы', 'Певчие птицы', 'Хищные птицы', 'Морские птицы'];
    return (
      <div className="main">
        <Navbar birdsTypes={birdsTypes} currentLevel={currentLevel} score={currentScore} />
        {gameFinished ? <div className="songbird-results framed">
          <h2>Поздравляем!</h2>
          <p>Вы прошли викторину и набрали {currentScore} из 30 возможных баллов</p>
          {currentScore !== 30
            ? <div>
              <button className='songbird-play-again-button active-button' onClick={this.startNewGame}>Попробовать еще раз</button>
            </div>
            : null}
        </div>
          : <>
            <BirdCard
              bird={correctBird}
              hidden={!levelFinished}
              expanded={false} />
            <div className="list-and-bird">
              <BirdsList birdsData={birds} selectBird={this.selectBirdHandler} />
              {selectedBirdIndex === -1
                ? <div className='framed'>Послушайте голос птицы и выберите название из списка слева</div>
                : <BirdCard bird={selectedBird} expanded={true} />}

            </div>
            <button className={`finish-button ${levelFinished ? 'active-button' : 'inactive-button'}`} onClick={this.nextLevel} disabled={!levelFinished}>Следующий уровень</button>
          </>
        }
      </div>);
  }
}
