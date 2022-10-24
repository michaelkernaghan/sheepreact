import './App.css';
import React, { useState } from 'react';
import { board_position_array } from './data/board_position_array'


function rollDice() {
  var randomDice1 = Math.floor(6 * Math.random()) + 1;
  var randomDice2 = Math.floor(6 * Math.random()) + 1;
  return randomDice1 + randomDice2;
}

function howManyPensForStockSale() {
  var randomDice1 = Math.floor(10 * Math.random()) + 1;
  return randomDice1;
}

function stockBuyPrice() {
  var randomDice1 = Math.floor(400 * Math.random()) + 400;
  return randomDice1;
}

function stockSellPrice() {
  var randomDice1 = Math.floor(600 * Math.random()) + 600;
  return randomDice1;
}

function randomForTuckerBag() {
  var randomDice1 = Math.floor(5 * Math.random())
  return randomDice1;
}

const pasture = 'Natural';

const Move: React.FC = () => {
  let woolsale = 'No';
  let haymaking = 'No';
  let woolSaleYield = 0;
  let stockSaleYield = 0;
  let expenses = 0;
  let stocksale = 'No';
  let message = 'No news is good news';
  let stockSaleMessage = 'No stock sale details';
  let droughtMessage = 'No drought';
  const [positionValue, setPosition] = useState(() => 0);
  const [moneyValue, setMoney] = useState(() => 6000);
  const [sheepAmount, setSheep] = useState(() => 3000);
  //const [studRamAmount, setStudRams] = useState(() => 0);
  //const [droughtStatus, setDrought] = useState(() => false);
  const pens = sheepAmount / 200
  const dieRoll = rollDice();
  let new_position = (positionValue + dieRoll)
  const modded_position = new_position % 44
  // WOOLSALE
  if (new_position > 43) {
    woolsale = 'Yes, good luck!';
    woolSaleYield = pens * 250
    //setMoney(moneyValue + woolSaleYield)
  }
  // HAYMAKING
  if (modded_position > 36 && modded_position < 43) {
      haymaking = 'Yes';
    }
  // TUCKER BAG
  if (modded_position === 4 || modded_position === 9 || modded_position === 11 || modded_position === 19 || modded_position === 24
    || modded_position === 31 || modded_position === 35 || modded_position === 41) {
    let whichCard = randomForTuckerBag()
    switch (whichCard) {
      //Grass Fire
      case 0: {
        let howMany = ((sheepAmount / 200) / 2)
        let price = stockSellPrice()
        stockSaleYield = -1 * howMany * price
        if (moneyValue > stockSaleYield) {
          //   setMoney(moneyValue + stockSaleYield)
          //   setSheep(sheepAmount / 2)
        }
        message = 'Grass Fires destroy Haystack and most of the Pasture Fodder. Half your sheep must be sold at market price'
        stockSaleMessage = "You sold " + howMany * 200 + " sheep for " + stockSaleYield + "."
        break;
      }
      // Income Tax
      case 1: {
        message = 'You must pay $300 Income Tax.'
        setMoney(moneyValue - 300)
        break;
      }
      // GENERAL DROUGHT
      case 3: {
        message = 'There is now a General Drought.'
        droughtMessage = 'General Drought'
        //setDrought(true)
        break;
      }
      // CHAMPION RAM
      case 4: {
        message = 'You have won a Trophy for Champion Ram and recieve $400.'
        setMoney(moneyValue + 400)
        break;
      }
      // FIRE
      case 5: {
        message = 'Fire destroys Haystack and damges Out-Buildings at a cost of $500.'
        setMoney(moneyValue - 500)
        break;
      }
      default: {
        message = 'Tucker Bag Default.'
        break;
      }
    }
  }

  // STUD RAM
  if (modded_position === 3 || modded_position === 18 || modded_position === 26 || modded_position === 30 || modded_position === 39) {
    message = 'You bought a Stud Ram for $500'
    // setStudRams(studRamAmount + 1)
    expenses = 500
    setMoney(moneyValue - 500)
  }

  // STUD RAM DIES
  if (modded_position === 33) {
    message = 'A Stud Ram died.'
    // if (studRamAmount > 0) {
    //   setStudRams(studRamAmount - 1)
    // }
  }

  // STOCKSALE BUYING
  if (modded_position === 1 || modded_position === 15 || modded_position === 25 || modded_position === 32 || modded_position === 38) {
    stocksale = 'Yes';
    let howMany = howManyPensForStockSale()
    let price = stockBuyPrice()
    stockSaleYield = -1 * howMany * price
    if (moneyValue > stockSaleYield) {
       setMoney(moneyValue + stockSaleYield)
     }
    setSheep(sheepAmount + howMany * 200)
    message = 'Good luck at the stock sale.'
    stockSaleMessage = 'You sold ' + howMany + ' pens at ' + price + ' each for a total of ' + stockSaleYield + '.'
  }

  // STOCKSALE SELLING
  if (modded_position === 12 || modded_position === 17 || modded_position === 28 || modded_position === 36 || modded_position === 42) {
    stocksale = 'Yes';
    message = 'Good luck at the stock sale.'
    let howManyPens = howManyPensForStockSale()
    let howManySheep = howManyPens * 200
    let price = stockSellPrice()
    stockSaleYield = howManyPens * price
    if (sheepAmount > howManySheep) {
      setMoney(moneyValue + stockSaleYield)
      setSheep(sheepAmount + howManySheep)
      stockSaleMessage = 'You bought ' + howManyPens + ' pens at ' + price + ' each for a total of ' + stockSaleYield + '.'
    }
  }

  // BORE DRIES UP
  if (modded_position === 5) {
    message = "Bore Dries Up affects only irrigated pastures."
  }

  // 5 per pen liabilities
  if (modded_position === 13) {
    message = "You paid $5 per pen for " + (sheepAmount / 200) + " pens for a net expense of $" + expenses + "."
    expenses = ((sheepAmount / 200) * 5)
    setMoney(moneyValue - (expenses))
  }

  // 10 per pen liabilities
  if (modded_position === 2 || modded_position === 8 || modded_position === 23) {
    message = "You paid $10 per pen for " + (sheepAmount / 200) + " pens for a net expense of $" + expenses + "."
    expenses = ((sheepAmount / 200) * 10)
    setMoney(moneyValue - expenses)
  }

  // 20 per pen liabilities
  if (modded_position === 16 || modded_position === 29 || modded_position === 40) {
    expenses = ((sheepAmount / 200) * 20)
    message = "You paid $20 per pen for " + (sheepAmount / 200) + " pens for a net expense of $" + expenses + "."
    setMoney(moneyValue - expenses)
  }

  // FLOOD DAMAGE
  if (modded_position === 10) {
    message = "You paid $1000 for Flood Damage."
    expenses = 1000
    setMoney(moneyValue - expenses)
  }

  // POISON RABBITS
  if (modded_position === 14) {
    message = "You paid $50 to Poison and Fumigate Rabbits."
    expenses = 1000
    setMoney(moneyValue - expenses)
  }

  // FENCING REPAIRS
  if (modded_position === 20) {
    message = "You paid $500 for Fencing Repairs."
    expenses = 500
    setMoney(moneyValue - expenses)
  }

  // SPRAY WEEDS
  if (modded_position === 21) {
    message = "You paid $100 for Spraying Weeds and Insects."
    expenses = 100
    setMoney(moneyValue - expenses)
  }

  // WATER DRILLING EXPENSES
  if (modded_position === 34) {
    message = "You paid $300 for Water Drilling."
    expenses = 300
    setMoney(moneyValue - expenses)
  }

  // FERTILIZING PASTURE
  if (modded_position === 37) {
    message = "You paid $250 for Fertilizing Pasture."
    expenses = 250
    setMoney(moneyValue - expenses)
  }

  // LOCAL DROUGHT
  if (modded_position === 22 || modded_position === 43) {
    message = "You have a local drought and must sell half your sheep."
    let howMany = ((sheepAmount / 200) / 2)
    let price = stockSellPrice()
    stockSaleYield = -1 * howMany * price
    if (moneyValue > stockSaleYield) {
       setMoney(moneyValue + stockSaleYield)
       setSheep(sheepAmount / 2)
    }
    stockSaleMessage = "You sold " + howMany * 200 + " sheep for " + stockSaleYield + "."
  }

  // LOCAL RAIN
  if (modded_position === 27) {
    message = "Local Rain relieves you of any General Drought."
    //setDrought(false)
    droughtMessage = "No drought."
  }

  return (
    <div className="Move">
      Sheep Game - F5 to Start Over
      <br></br>
      <div>Pastures are  : {pasture}</div>
      <div>Drought Status : {droughtMessage}</div>
      <div>Haymaking season this turn? : {haymaking}</div>
      <br></br>
      {/* <div>Previous position was : {positionValue}</div>
      <div>Previous event was : {board_position_array[positionValue]}</div> */}
      {/* <div>Roll was : {dieRoll}</div>
      <div>New position is : {modded_position}</div> */}
      <div>Your current event is : {board_position_array[modded_position]}</div>
      <br></br>
      <div>{message}</div>
      <br></br>
      <div>Wool Sale this turn? : {woolsale}</div>
      <div>Wool Sale yielded : ${woolSaleYield}</div>

      {/* <button
        type="button"
        onClick={() => setMoney(moneyValue)}>Update Money
      </button> */}
      <br></br><br></br>
      <div>Stock Sale this turn? : {stocksale}</div>
      <div>Stock Sale detail : {stockSaleMessage}</div>
      <div>Stock Sale yield : ${stockSaleYield}</div>
      <br></br>
      <div>Expenses : ${expenses}</div>
      <br></br>
      <div>Amount of sheep : {sheepAmount}</div>
      <div>Amount of money : ${moneyValue}</div>
      {/* <div>Amount of Stud Rams : {studRamAmount}</div> */}

      {/* <button
        type="button"
        onClick={() => setSheep(sheepAmount)}>Update Sheep
      </button> */}
      <br></br><br></br>
      <button
        type="button"
        onClick={() => setPosition(modded_position)}>Update Position
      </button>
    </div>
  );
}

export default Move;