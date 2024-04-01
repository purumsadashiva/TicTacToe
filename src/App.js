import React, { useState } from "react";
import Player from "./Components/Players";
import GameBoard from "./Components/GameBoard";
import Log from "./Components/Log";
import { WINNING_COMBINATIONS } from './Components/winning-combination';
import GameOver from "./Components/GameOver";
import GameHintModal from "./Components/GameHintModal"; // Import the GameHintModal component

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns) {
  let currrentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currrentPlayer = 'O';
  }

  return currrentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for(const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]; 
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      secondSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map(array => [...array])];
  for(const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  } 

  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2'
  })
  const [gameTurns, setGameTurns] = useState([]);
  const [showHint, setShowHint] = useState(false); // State to manage the visibility of game hint

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowInd, colInd) {
    setGameTurns(prevTurns => {
      const currrentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{ square: {row: rowInd, col: colInd}, player: currrentPlayer }, ...prevTurns];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handelPlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div className="top-bar">
        <button id="game-hints" onClick={toggleHint}>Game Hint</button> {/* Button to toggle game hint */}
        {showHint && <GameHintModal onClose={() => setShowHint(false)} />} {/* Display game hint modal if showHint is true */}
      </div>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} onChangeName={handelPlayerNameChange} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} onChangeName={handelPlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
