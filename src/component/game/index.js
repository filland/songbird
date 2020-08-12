/* eslint-disable class-methods-use-this */
import React from 'react';
import birdsData from '../../common/birdsData';
import Navbar from '../navbar';
import BirdCard from '../birdCard';
import BirdsList from '../birdsList';

import './styles.scss';

export default class Game extends React.Component {
  state = {
    birds: [],
    currentLevel: 0,
    correctBirdIndex: -1,
    selectedBirdIndex: -1,
    currentScore: 0,
    attempts: 0,
    started: false,
    finished: false,
  };

  componentDidMount() {
    const { currentLevel } = this.state;
    const birds = [...birdsData[currentLevel]];

    birds.forEach((bird) => bird.color = 'gray');

    this.setState({
      birds,
      currentLevel: 0,
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

  selectBird = (index) => {
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
      // mark that current level is finished
      lFinished = true;

      for (let i = 0; i < birds.length; i += 1) {
        const bird = birds[i];
        if ((bird.id - 1) === index) {
          bird.color = 'green';
        }
      }

      const MAX_SCORE_FOR_LEVEL = 5;

      // add score if win
      newScore += attempts >= 5 ? 0 : MAX_SCORE_FOR_LEVEL - attempts;
    } else {
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
      selectedBirdIndex: -1,
      attempts: 0,
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
        {gameFinished ? <div className="framed">Finished.</div>
          : <>
            <BirdCard
              bird={correctBird}
              hidden={correctBirdIndex !== selectedBirdIndex}
              expanded={false} />
            <div className="list-and-bird">
              <BirdsList birdsData={birds} selectBird={this.selectBird} />
              {selectedBirdIndex === -1
                ? <div className='framed'>Послушайте голос птицы и выберите название из списка</div>
                : <BirdCard bird={selectedBird} expanded={true} />}

            </div>
            <button className={`finish-button ${levelFinished ? 'active-button' : 'inactive-button'}`} onClick={this.nextLevel} disabled={!levelFinished}>Следующий уровень</button>
          </>
        }
      </div>);
  }
}
