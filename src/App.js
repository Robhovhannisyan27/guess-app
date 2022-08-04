import { useEffect, useState } from "react";
import Input from "./components/Input";
import Confetti from 'react-confetti'

function App() {
  const [code, setCode] = useState('')
  const [isGameEnded, setIsGameEnded] = useState(false)
  const { innerWidth: width, innerHeight: height } = window;

  useEffect(() => {
    if(!isGameEnded) {
      setCode(generateCode())
    }
  }, [isGameEnded])

  const generateCode = () => {
    let code = Math.floor(Math.random() * 9000);
    return `0${code}`.slice(-4)
  }

  const handleRestart = () => {
    setIsGameEnded(false)
  }

  return (
    <div>
      {isGameEnded && <p className="title">Congratulations !!</p>}
      <Input code={code} endGame={setIsGameEnded} isGameEnded={isGameEnded} />
      {isGameEnded &&
        <>
          <Confetti
            width={width}
            height={height}
          />
          <div className="button_container">
            <button onClick={handleRestart}>Reset</button>
          </div>
        </>
      }
    </div>
  );
}

export default App;
