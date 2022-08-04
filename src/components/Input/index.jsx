import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

const Input = ({ code, endGame, isGameEnded }) => {
  const [value, setValue] = useState(new Array(4).fill(""));
  const inputs = useRef(new Array(4).fill(null));

  useEffect(() => {
    if (code) {
      restartGame();
    }
  }, [code]);

  const restartGame = () => {
    setValue(new Array(4).fill(""));
    inputs.current[0].focus();
  };

  const handleChange = (e, index) => {
    if (e.target.validity.valid) {
      if (e.target.value) {
        if (index > 0) {
          inputs.current[index].blur();
        }
        if (index < 3) {
          inputs.current[index + 1].focus();
        }
      }
      const newArr = [...value];
      newArr[index] = e.target.value;
      setValue(newArr);
      if (newArr.join("").length === code.length) {
        compareCode(newArr);
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!value[index]) {
        if (index > 0) {
          inputs.current[index - 1].focus();
        }
        if (index < 3) {
          inputs.current[index].blur();
        }
      } else {
        const newArr = [...value];
        newArr[index] = "";
        setValue(newArr);
      }
    } else if (value[index]) {
      if (index > 0) {
        inputs.current[index].blur();
      }
      if (index < 3) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const compareCode = (newArr) => {
    const insertedCode = newArr.join("");
    setTimeout(() => {
      if (insertedCode === code) {
        endGame(true);
      } else {
        restartGame();
      }
    }, [500]);
  };

  return (
    <div className="inputComponent">
      {inputs.current.map((el, index) => {
        return (
          <input
            type="text"
            key={index}
            ref={(element) => {
              inputs.current[index] = element;
            }}
            data-testid={`input${index + 1}`}
            className={classNames({
              wrong: value[index] && code[index] !== value[index],
              right: value[index] && code[index] === value[index],
            })}
            maxLength={1}
            pattern="[0-9]*"
            value={value[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            disabled={isGameEnded}
          />
        );
      })}
    </div>
  );
};

export default Input;
