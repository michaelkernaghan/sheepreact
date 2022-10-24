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
  var randomDice1 = Math.floor(2 * Math.random())
  return randomDice1;
}

const pasture = 'Natural';

const Move: React.FC = () => {
  let woolsale = 'No';
  let haymaking = 'No';
  let woolSaleYield = 0;
  let stockSaleYield = 0;
  let paidForSundries = 0;
  let stocksale = 'No';
  let message = 'No news is good news';
  let stockSaleMessage = 'No stock sale details';
  let droughtMessage = 'No drought';
  const [positionValue, setPosition] = useState(() => 0);
  const [moneyValue, setMoney] = useState(() => 6000);
  const [sheepAmount, setSheep] = useState(() => 3000);
  //const [studRamAmount, setStudRams] = useState(() => 0);
  //const [droughtStatus, setDrought] = useState(() => false);
  const dieRoll = rollDice();
  let new_position = (positionValue + dieRoll)
  const modded_position = new_position % 44
  // WOOLSALE
  if (new_position > 43) {
    woolsale = 'Yes';
    woolSaleYield = (moneyValue + ((sheepAmount / 200) * 250))
    setMoney(moneyValue + woolSaleYield)
  }
  // HAYMAKING
  if (new_position > 36) {
    if (new_position < 43) {
      haymaking = 'Yes';
    }
  }
  // TUCKER BAG
  if (new_position === 4 || new_position === 9 || new_position === 11 || new_position === 19 || new_position === 24
    || new_position === 31 || new_position === 35 || new_position === 41) {
    let whichCard = randomForTuckerBag()
    switch (whichCard) {
      //Grass Fire
      case 0: {
        let howMany = ((sheepAmount / 200) / 2)
        let price = stockSellPrice()
        stockSaleYield = -1 * howMany * price
        if (moneyValue > stockSaleYield) {
          setMoney(moneyValue + stockSaleYield)
          setSheep(sheepAmount / 2)
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
      default: {
        message = 'Tucker Bag Default.'
        break;
      }
    }
  }

  // STUD RAM
  if (new_position === 3 || new_position === 18 || new_position === 26 || new_position === 30 || new_position === 39) {
    message = 'You bought a Stud Ram for $500'
    // setStudRams(studRamAmount + 1)
    //setMoney(moneyValue - 500)
  }

  // STUD RAM DIES
  if (new_position === 33) {
    message = 'A Stud Ram died.'
    // if (studRamAmount > 0) {
    //   setStudRams(studRamAmount - 1)
    // }
  }

  // STOCKSALE BUYING
  if (new_position === 1 || new_position === 15 || new_position === 25 || new_position === 32 || new_position === 38) {
    stocksale = 'Yes';
    let howMany = howManyPensForStockSale()
    let price = stockBuyPrice()
    stockSaleYield = -1 * howMany * price
    if (moneyValue > stockSaleYield) {
      setMoney(moneyValue + stockSaleYield)
    }
    setSheep(sheepAmount + howMany * 200)
    stockSaleMessage = 'You bought ' + howMany + ' pens at ' + price + ' 400 each.'
  }

  // STOCKSALE SELLING
  if (new_position === 12 || new_position === 17 || new_position === 28 || new_position === 36 || new_position === 42) {
    stocksale = 'Yes';
    let howManyPens = howManyPensForStockSale()
    let howManySheep = howManyPens * 200
    let price = stockSellPrice()
    stockSaleYield = howManyPens * price
    if (sheepAmount > howManySheep) {
      setMoney(moneyValue + stockSaleYield)
      setSheep(sheepAmount + howManySheep)
      stockSaleMessage = 'You bought ' + howManyPens + ' pens at ' + price + ' 400 each.'
    }
  }

  // BORE DRIES UP
  if (new_position === 5) {
    message = "Bore Dries Up affects only irrigated pastures."
  }

  // 5 per pen liabilities
  if (new_position === 13) {
    message = "You paid $5 per pen for " + (sheepAmount / 200) + "pens."
    paidForSundries = ((sheepAmount / 200) * 5)
    setMoney(moneyValue - (paidForSundries))
  }

  // 10 per pen liabilities
  if (new_position === 2 || new_position === 8 || new_position === 23) {
    message = "You paid $10 per pen for " + (sheepAmount / 200) + "pens."
    paidForSundries = ((sheepAmount / 200) * 10)
    setMoney(moneyValue - paidForSundries)
  }

  // 20 per pen liabilities
  if (new_position === 16 || new_position === 29 || new_position === 40) {
    message = "You paid $20 per pen for " + (sheepAmount / 200) + "pens."
    paidForSundries = ((sheepAmount / 200) * 20)
    setMoney(moneyValue - paidForSundries)
  }

  // FLOOD DAMAGE
  if (new_position === 10) {
    message = "You paid $1000 for Flood Damage."
    paidForSundries = 1000
    setMoney(moneyValue - paidForSundries)
  }

  // POISON RABBITS
  if (new_position === 14) {
    message = "You paid $50 to Poison and Fumigate Rabbits."
    paidForSundries = 1000
    setMoney(moneyValue - paidForSundries)
  }

  // FENCING REPAIRS
  if (new_position === 20) {
    message = "You paid $500 for Fencing Repairs."
    paidForSundries = 500
    setMoney(moneyValue - paidForSundries)
  }

  // SPRAY WEEDS
  if (new_position === 21) {
    message = "You paid $100 for Spraying Weeds and Insects."
    paidForSundries = 100
    setMoney(moneyValue - paidForSundries)
  }

  // WATER DRILLING EXPENSES
  if (new_position === 34) {
    message = "You paid $300 for Water Drilling."
    paidForSundries = 300
    setMoney(moneyValue - paidForSundries)
  }

  // FERTILIZING PASTURE
  if (new_position === 37) {
    message = "You paid $250 for Fertilizing Pasture."
    paidForSundries = 250
    setMoney(moneyValue - paidForSundries)
  }

  // LOCAL DROUGHT
  if (new_position === 22 || new_position === 43) {
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
  if (new_position === 27) {
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
      <br></br>
      {/* <div>Previous position was : {positionValue}</div>
      <div>Previous event was : {board_position_array[positionValue]}</div> */}
      <div>Roll was : {dieRoll}</div>
      <div>New position is : {modded_position}</div>
      <div>New event is : {board_position_array[modded_position]}</div>
      <br></br>
      <div>News of the turn : {message}</div>
      <br></br><br></br>
      <div>Wool Sale this turn? : {woolsale}</div>
      <div>Wool Sale yielded : {woolSaleYield}</div>
      <div>Sundry expenses : {paidForSundries}</div>

      {/* <button
        type="button"
        onClick={() => setMoney(moneyValue)}>Update Money
      </button> */}
      <br></br><br></br>
      <div>Stock Sale this turn? : {stocksale}</div>
      <div>Stock Sale detail : {stockSaleMessage}</div>
      <div>Stock Sale yield : {stockSaleYield}</div>
      <div>Amount of sheep : {sheepAmount}</div>
      <div>Amount of money : {moneyValue}</div>
      {/* <div>Amount of Stud Rams : {studRamAmount}</div> */}
      <div>Haymaking season this turn? : {haymaking}</div>
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