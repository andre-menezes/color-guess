import React, { useEffect, useState } from 'react';
import correct from '../images/correct.svg';
import wrong from "../images/wrong.svg";

export default function Color(props) {
  const { red, green, blue, setAnswer, correctColor, disable, setDisable } = props;
  const [imgAnswer, setImgAnswer] = useState('');
  const [win, setWin] = useState();
  
  useEffect(() => {
    const revealAnswer = () => {
      if (disable
          && red === correctColor.red
          && green === correctColor.green
          && blue === correctColor.blue
      ) {
        setWin('correct');
      } else {
        setWin('')
      }
    }
    
    revealAnswer();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disable]);

  return (
    <div
      style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }}
      className={`color-ball ${win}`}
      disable={disable.toString()}
      id={imgAnswer}
      onClick={({ target }) => {
        if (!disable) {
          if (
            red === correctColor.red &&
            green === correctColor.green &&
            blue === correctColor.blue
          ) {
            setDisable(true);
            target.classList.add("correct");
            setImgAnswer("correct");
            return setAnswer("Acertou!");
          }
          setDisable(true);
          target.classList.add("wrong");
          setImgAnswer("wrong");
          return setAnswer("Infelizmente você errou!");
        }
      }}
    >
      {imgAnswer !== "" ? (
        imgAnswer === "correct" ? (
          <img src={correct} alt="correct" width="40" />
        ) : (
          <img src={wrong} alt="wrong" width="40" />
        )
      ) : null}
    </div>
  );
}
