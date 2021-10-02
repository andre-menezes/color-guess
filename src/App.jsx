import React, { useEffect, useState } from 'react';
import './App.css';
import Color from './components/Color';
import arrow from './images/arrow.svg';

function App() {
  const ZERO = 0;
  const ONE = 1;
  const MAX_COLOR_VALUE = 255;
  const MIN_COLOR_VALUE = ZERO;
  const DEFAULT_LEVEL = 'easy';
  const EASY = 4;
  const MEDIUM = 7;
  const HARD = 10;
  
  const [level, setLevel] = useState(DEFAULT_LEVEL);
  const [correctColor, setCorrectColor] = useState(null);
  const [arrayColors, setArrayColors] = useState([]);
  const [answer, setAnswer] = useState('');
  const [disable, setDisable] = useState(false);

  const randomNumber = (min, max) => {
    return Math
      .round(Math.random() * (max - min) + min)
      .toFixed(ZERO);
  }

  const generateColor = () => {
    const red = randomNumber(MIN_COLOR_VALUE, MAX_COLOR_VALUE);
    const green = randomNumber(MIN_COLOR_VALUE, MAX_COLOR_VALUE);
    const blue = randomNumber(MIN_COLOR_VALUE, MAX_COLOR_VALUE);
    return { red, green, blue };
  };

  useEffect(() => {
  const generateColorOptions = (option) => {
    let arrayOfColors = [];
    let quantity;
    switch (option.level) {
      case 'easy':
        quantity = EASY;
        break;
      case 'medium':
        quantity = MEDIUM;
        break;
      case 'hard':
        quantity = HARD;
        break;
      default:
        quantity = EASY;
    }
    for (let i = ZERO; i < quantity; i++) {
      const color = generateColor();
      arrayOfColors.push(color);
    }
    setArrayColors(arrayOfColors);
    const correctColorIndex = randomNumber(ZERO, arrayOfColors.length - ONE);
    setCorrectColor(arrayOfColors[correctColorIndex]);
  }
    
  generateColorOptions(level);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level])

  const levelOptions = [
    { level: 'easy', text: 'Fácil' },
    { level: 'medium', text: 'Médio' },
    { level: 'hard', text: 'Difícil' },
  ];

  return (
    <>
      <header>
        <h1>Adivinhe a cor!</h1>
      </header>
      <main className="content">
          <div className="level-content">
            <p>Nível:</p>
            <div className="select-option">
            <div
              className="selected"
              onClick={() => {
                document.getElementById('options-content').classList.add('show');
                document.getElementById('arrow').classList.add('rotate');
              }}
            >
                <p>{level.text || 'Fácil'}</p>
                <img id="arrow" src={arrow} alt="arrow" width='20' className="arrow" />
              </div>
              <div id="options-content" className="options-content">
                {levelOptions.map((option) => (
                  <div
                    key={option.level}
                    className="option"
                    onClick={({target}) => {
                      setLevel(option); 
                      target.parentNode.classList.remove('show');
                      document.getElementById('arrow').classList.remove('rotate');
                    }}
                    
                  >
                    <input
                      type="radio"
                      id={option.level}
                      value={option.level}
                    />
                    <label
                      htmlFor={option.level}
                      onClick={({ target }) => target.parentNode
                          .parentNode.classList.remove('show')}
                    >
                      {option.text}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        {correctColor && (
          <p className="rgb-color">
            {`(${correctColor.red}, ${correctColor.green}, ${correctColor.blue})`}
          </p>
        )}
        <div className="balls-content">
          <p className="answer">Escolha uma cor</p>
          <div>
            {
              arrayColors && arrayColors
              .map(({ red, green, blue }, index) => (
                <Color
                  disable={disable}
                  setDisable={setDisable}
                  correctColor={correctColor}
                  setAnswer={setAnswer}
                  key={index}
                  red={red}
                  green={green}
                  blue={blue}
                />
              ))
            }
          </div>
        </div>
        <p className="answer">{answer}</p>
      </main>
    </>
  );
}

export default App;
