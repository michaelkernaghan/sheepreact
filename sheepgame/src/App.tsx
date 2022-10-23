import './App.css';
import React, { useState } from 'react';
import { board_position_array } from './data/board_position_array'

function rollDice() {
  var randomDice1 = Math.floor(6 * Math.random()) + 1;
  var randomDice2 = Math.floor(6 * Math.random()) + 1;
  return randomDice1 + randomDice2;
}



const Move: React.FC = () => {
  let woolsale = 'No';
  let haymaking = 'No';
  const [value, setValue] = useState(0);
  let initial_position = value
  const dieRoll = rollDice();
  let new_position = (initial_position + dieRoll) 
  if (new_position > 43)  {
    woolsale = 'Yes';
  }
  if (new_position === 0)  {
    woolsale = 'Yes';
  }
  if (new_position > 36)
      { if (new_position < 43) {
    haymaking = 'Yes';
  }}
  const modded_position = new_position % 43
  return (
    <div className="Move">
      <div>Your Old Position was : {initial_position}</div>
      <div>Your Previous Event was : {board_position_array[initial_position]}</div>
      <div>Your Roll was : {dieRoll}</div>
      <div>Your New Position is : {modded_position}</div>
      <div>Your New Event is : {board_position_array[modded_position]}</div>
      <div>Wool Sale this turn? : {woolsale}</div>
      <div>Haymaking Season this turn? : {haymaking}</div>
      <span>{modded_position}</span>
      <button
        type="button"
        onClick={() => setValue(modded_position)}>+
      </button>
    </div>
  );
}

export default Move;