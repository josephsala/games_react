import React, { useState, useEffect } from 'react';

function Simon() {
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [showInitialSequence, setShowInitialSequence] = useState(true);
  const [showUserSequence, setShowUserSequence] = useState(false);
  const [timer, setTimer] = useState(10);
  const [level, setLevel] = useState(1);
  const [shuffledSequence, setShuffledSequence] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [correctSequence, setCorrectSequence] = useState(false);

  const calculationsAndFormulas = [
    "2 + 2", "H2O", "5 * 3", "CO2", "10 / 2", "NaCl", "3^2", "H2SO4", // Ejemplos iniciales
    "C6H12O6", "a²+b²=c²", "E=mc^2", "pi * r^2", "V+C-A=2", // Fórmulas y cálculos combinados
    "dS≥0", "x2 + 4 = 0", "2 x + 5", "8 + 6 - 12 "
  ];

  useEffect(() => {
    if (showInitialSequence) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(interval);
            setShowInitialSequence(false);
            setShowUserSequence(true);
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showInitialSequence]);

  useEffect(() => {
    if (showUserSequence && !shuffledSequence.length) {
      const shuffled = shuffleArray(sequence);
      setShuffledSequence(shuffled);
    }
  }, [showUserSequence, sequence, shuffledSequence]);

  useEffect(() => {
    generateSequence();
  }, [level]);

  const generateSequence = () => {
    const randomSequence = [];
    for (let i = 0; i < level + 1; i++) {
      randomSequence.push(calculationsAndFormulas[Math.floor(Math.random() * calculationsAndFormulas.length)]);
    }
    setSequence(randomSequence);
    setTimer(10);
    setShowInitialSequence(true);
    setShowUserSequence(false);
    setShuffledSequence([]);
    setCorrectSequence(false);
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array].sort(() => Math.random() - 0.5);
    return shuffledArray;
  };

  const handleUserClick = (element) => {
    setUserInput([...userInput, element]);

    if (userInput.length === sequence.length - 1) {
      const isCorrect = userInput.every((value, index) => value === sequence[index]);
      if (isCorrect) {
        setCorrectSequence(true);
      } else {
        setGameOver(true);
      }
    }
  };

  const handleNextLevel = () => {
    setScore(score + 1); // Aumentar la puntuación en 1
    setLevel(level + 1);
    setUserInput([]);
    generateSequence();
  };

  const resetGame = () => {
    setUserInput([]);
    setLevel(1);
    setScore(0);
    setGameOver(false);
    generateSequence();
  };

  return (
    <div className="bg-gradient-to-b from-blue-400 to-blue-700 min-h-screen flex flex-col justify-center items-center">
      <div className="container mx-auto px-4 py-8 text-center text-white">
        <h1 className="text-4xl font-bold mb-8">Simon Dice: Química y Matemáticas</h1>
        <h2 className="text-2xl mb-4">Puntuación: {score}</h2>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Secuencia inicial:</h2>
          <div className="flex flex-wrap justify-center">
            {showInitialSequence && sequence.map((item, index) => (
              <div key={index} className="bg-blue-800 text-white rounded-full px-4 py-2 m-2 text-lg">{item}</div>
            ))}
          </div>
          {showInitialSequence && <h3 className="text-lg mt-4">Temporizador: {timer}</h3>}
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Repite la secuencia:</h2>
          <div className="flex flex-wrap justify-center">
            {showUserSequence && shuffledSequence.map((item, index) => (
              <div key={index} className="bg-blue-800 text-white rounded-full px-4 py-2 m-2 text-lg cursor-pointer hover:bg-blue-600 transition duration-300" onClick={() => handleUserClick(item)}>
                {item}
              </div>
            ))}
          </div>
        </div>
        {gameOver && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg text-center">
              <h2 className="text-3xl font-bold mb-4 text-red-500">¡Game Over!</h2>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300" onClick={resetGame}>Volver a Jugar</button>
            </div>
          </div>
        )}
        {correctSequence && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg text-center">
              <h2 className="text-3xl font-bold mb-4 text-green-500">¡Correcto!</h2>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300" onClick={handleNextLevel}>Siguiente Nivel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Simon;
