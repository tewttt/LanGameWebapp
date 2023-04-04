import React, { useState } from "react";
import css from "./style.module.css"
// import "./styles.css";

const SQUARE_SIZE = 50; // Size of each square on the board
const BOARD_SIZE = 15; // Number of squares in each row/column
const PLAYER_COLORS = ["red", "green", "blue", "yellow"]; // Colors of each player

// Helper function to generate the initial board state
const generateBoardState = () => {
  const boardState = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      row.push({ player: null });
    }
    boardState.push(row);
  }
  // Set up the starting positions for each player
  boardState[0][0].player = 0;
  boardState[0][BOARD_SIZE - 1].player = 1;
  boardState[BOARD_SIZE - 1][0].player = 2;
  boardState[BOARD_SIZE - 1][BOARD_SIZE - 1].player = 3;
  return boardState;
};

const LudoGame = () => {
  const [boardState, setBoardState] = useState(generateBoardState());
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceValue, setDiceValue] = useState(0);

  // Helper function to roll the dice and update the state
  const rollDice = () => {
    const value = Math.floor(Math.random() * 6) + 1;
    setDiceValue(value);
    return value;
  };

  // Helper function to handle a player's move
  const handleMove = (row, col) => {
    // Check if the square is empty or already occupied by the current player
    if (!boardState[row][col].player || boardState[row][col].player === currentPlayer) {
      const newBoardState = boardState.map((r) => r.slice());
      newBoardState[row][col].player = currentPlayer;
      setBoardState(newBoardState);
      setCurrentPlayer((currentPlayer + 1) % 4);
    }
  };

  return (
    <div className={css.body}>
      <h1>Ludo Game</h1>
      <div className="board">
        {boardState.map((row, i) =>
          row.map((square, j) => (
            <div
              key={`${i}-${j}`}
              className={`square ${square.player !== null ? PLAYER_COLORS[square.player] : ""}`}
              onClick={() => handleMove(i, j)}
            />
          ))
        )}
      </div>
      <button onClick={() => rollDice()}>Roll Dice</button>
      <div>Current Player: {PLAYER_COLORS[currentPlayer]}</div>
      <div>Dice Value: {diceValue}</div>
    </div>
  );
};

export default LudoGame;
