import React from 'react';
import './App.css';

const board_position_array = ['Wool Sale',
  'Stock Sale',
  'Sheep Dipping',
  'Stud Ram - Elmsford Park Rex',
  'Tucker Bag',
  'Bore Dries Up',
  'Visiting Town',
  'Visiting Town',
  'Drench Sheep for worms',
  'Tucker bag',
  'Flood Damage',
  'Tucker Bag',
  'Stock Sale',
  'Jet Sheep Against Fly Strike',
  'Poison and Fumigate Rabbits',
  'Stock Sale',
  'Footrot Treatment',
  'Stock Sale',
  'Stud Ram - Laclan Lad',
  'Tucker Bag',
  'Pay Cost of Fencing Repairs',
  'Spray for Weeds and Insects',
  'Local Drought',
  'Drench for Liver Fluke',
  'Tucker Bag',
  'Stock Sale',
  'Stud Ram - King of Warramboo',
  'Local Rain',
  'Stock Sale',
  'Vaccinate for Pulpy Kidney',
  'Stud Ram - Winton Boy II',
  'Tucker Bag',
  'Stock Sale',
  'Stud Ram Dries',
  'Pay Water Drilling Expenses',
  'Tucker Bag',
  'Stock Sale',
  'Pay Cost of Fertilizing Pasture',
  'Stock Sale',
  'Stud Ram - Mitchell\'s Pride',
  'Shearing Costs',
  'Tucker Bag',
  'Stock Sale',
  'Local Drought'
]



function rollDice() {
  var randomDice1 = Math.floor(6 * Math.random()) + 1;
  var randomDice2 = Math.floor(6 * Math.random()) + 1;
  return randomDice1 + randomDice2;
}

function move() {
const dieRoll = rollDice();
let initial_position = Number(localStorage.getItem('position'));
const new_position = initial_position + dieRoll;
const modded_position = new_position % 43
localStorage.setItem('new_position', modded_position.toString());
localStorage.setItem('position', modded_position.toString());
return (
  <div className="Move">
    <div>F5 to Move to Next Event</div>
    <div>Your Old Position was: {initial_position}</div>
    <div>Your Roll was: {dieRoll}</div>
    <div>Your New Position is: {Number(localStorage.getItem('new_position'))}</div>
    <div>Your New Event is: {board_position_array[Number(localStorage.getItem('new_position'))]}</div>
  </div>
);
}

export default move;