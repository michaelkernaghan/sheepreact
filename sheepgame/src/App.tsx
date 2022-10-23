import './App.css';
import React, { useState } from 'react';
import { board_position_array } from './data/board_position_array'

function rollDice() {
  var randomDice1 = Math.floor(6 * Math.random()) + 1;
  var randomDice2 = Math.floor(6 * Math.random()) + 1;
  return randomDice1 + randomDice2;
}

const Move: React.FC = () => {
  const [value, setValue] = useState(0);
  let initial_position = value
  const dieRoll = rollDice();
  const new_position = (initial_position + dieRoll) % 43

  return (
    <div className="Move">
      <div>Your Old Position was: {initial_position}</div>
      <div>Your Roll was: {dieRoll}</div>
      <div>Your New Position is: {new_position}</div>
      <div>Your New Event is: {board_position_array[new_position]}</div>
      <span>{new_position}</span>
      <button
        type="button"
        onClick={() => setValue(new_position)}>+
      </button>
    </div>
  );
}

export default Move;