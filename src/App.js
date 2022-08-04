import { useEffect, useState } from "react";
import Input from "./components/Input";
import Confetti from "react-confetti";
import { generateCode } from "./helpers";

function App() {
  const [code, setCode] = useState("");
  const [isGameEnded, setIsGameEnded] = useState(false);
  const { innerWidth: width, innerHeight: height } = window;

  useEffect(() => {
    if (!isGameEnded) {
      setCode(generateCode());
    }
  }, [isGameEnded]);

  const handleRestart = () => {
    setIsGameEnded(false);
  };

  return (
    <div>
      {isGameEnded && <p className="title">Congratulations !!</p>}
      <Input code={code} endGame={setIsGameEnded} isGameEnded={isGameEnded} />
      {isGameEnded && (
        <>
          <Confetti width={width} height={height} />
          <div className="button_container">
            <button onClick={handleRestart}>Reset</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
