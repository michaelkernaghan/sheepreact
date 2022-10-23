import './App.css';
import React, { useState } from 'react';
import { board_position_array } from './data/board_position_array'


function rollDice() {
  var randomDice1 = Math.floor(6 * Math.random()) + 1;
  var randomDice2 = Math.floor(6 * Math.random()) + 1;
  return randomDice1 + randomDice2;
}

const sheep = 3000;
let new_money = 6000;
const pasture = 'natural';

const Move: React.FC = () => {
  let woolsale = 'No';
  let haymaking = 'No';
  let woolSaleYield = 0;
  const [value, setValue] = useState(0);
  const [moneyValue, setMoney] = useState(1);
  let initial_position = value
  let initial_money = moneyValue
  const dieRoll = rollDice();
  let new_position = (initial_position + dieRoll)
  if (new_position > 43) {
    woolsale = 'Yes';
    woolSaleYield = (sheep / 200) * 250
    new_money = initial_money + woolSaleYield
  }
  if (new_position === 0) {
    woolsale = 'Yes';
    woolSaleYield = (sheep / 200) * 250
    new_money = initial_money + woolSaleYield
  }
  if (new_position > 36) {
    if (new_position < 43) {
      haymaking = 'Yes';
    }
  }
  const modded_position = new_position % 43


  return (
    <div className="Move">
      <div>All your pastures are  : {pasture}</div>
      <div>Your Old Position was : {initial_position}</div>
      <div>Your Previous Event was : {board_position_array[initial_position]}</div>
      <div>Your Roll was : {dieRoll}</div>
      <div>Your New Position is : {modded_position}</div>
      <div>Your New Event is : {board_position_array[modded_position]}</div>
      <div>Wool Sale this turn? : {woolsale}</div>
      <div>Wool Sale yielded : {woolSaleYield}</div>
      <div>Haymaking Season this turn? : {haymaking}</div>
      <div>Your previous money amount was : {initial_money}</div>
      <div>Your new money amount is : {new_money}</div>
      <button
        type="button"
        onClick={() => setValue(modded_position)}>Update Position
      </button>
      <button
        type="button"
        onClick={() => setMoney(new_money)}>Update Money
      </button>
    </div>
  );
}

export default Move;