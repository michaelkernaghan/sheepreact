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
  var randomDice1 = Math.floor(24 * Math.random())
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
  if (modded_position === 0 || new_position === 45 || new_position === 46 || new_position === 47 || new_position === 48
    || new_position === 49 || new_position === 50 || new_position === 51 || new_position === 52 || new_position === 53
    || new_position === 54 || new_position === 55) {
    message = 'It\'s the start of another Year!';
    woolsale = 'Yes, good luck!';
    woolSaleYield = pens * 250
    //setMoney(() => (moneyValue + woolSaleYield))
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
      case 0: {
        let howMany = ((sheepAmount / 200) / 2)
        let price = stockSellPrice()
        stockSaleYield = -1 * howMany * price
        // setMoney(moneyValue + stockSaleYield)
        // setSheep(sheepAmount / 2)
        message = 'Grass Fires destroy Haystack and most of the Pasture Fodder. Half your sheep must be sold at market price'
        stockSaleMessage = "You sold " + howMany * 200 + " sheep for " + stockSaleYield + "."
        break;
      }
      case 1: {
        message = 'You must pay $50 Income Tax for each Natural Pasture Paddock and $200 for each $1,000 Cash held, to nearest thousand.'
        // let taxOnCash = Math.floor(moneyValue / 1000) * 200
        //setMoney(moneyValue - (300 + taxOnCash))
        break;
      }
      case 3: {
        message = 'There is now a General Drought.'
        droughtMessage = 'General drought'
        //setDrought(true)
        break;
      }
      case 4: {
        message = 'You have won a Trophy for Champion Ram and recieve $400.'
        setMoney(moneyValue + 400)
        break;
      }
      case 5: {
        message = 'Fire destroys Haystack and damges Out-Buildings at a cost of $500.'
        setMoney(moneyValue - 500)
        break;
      }
      case 6: {
        message = 'You buy Fire Fighting Equipment for $150.'
        setMoney(moneyValue - 150)
        break;
      }

      case 7: {
        message = 'You get an Insurance Policy for a Stud Ram. If the Stud Ram dies you get $500.'
        break;
      }
      case 8: {
        message = 'Your selling price at next stock sale is increased by 20%.'
        break;
      }
      case 9: {
        message = 'Purchase a new shearing shed. $1,000 each if less than 15 pens, otherwise $2,000 each'
        if (pens < 15) {
          setMoney(moneyValue - (pens * 1000))
        }
        if (pens >= 15) {
          setMoney(moneyValue - (pens * 2000))
        }
        break;
      }
      case 10: {
        message = 'By careful management you have eradicated Foot Rot. You are exempt from future treatment costs.'
        break;
      }
      case 11: {
        message = 'As a result of severe Blowfly Wave, and your failure to take precautionary action your next Wool Cheque reduces by 10%. No loss if you land on "Jet Sheep" before your next Wool Cheque.'
        break;
      }
      case 12: {
        message = 'If your property is not fully stocked, receive Agistment fees of $600.'
        if (sheepAmount < 3000) {
          setMoney(moneyValue + 600)
        }
        break;
      }
      case 13: {
        message = 'General rain breaks drought'
        droughtMessage = 'No drought'
        break;
      }
      case 14: {
        message = 'You are injured by Tractor as a result of carelessness.'
        break;
      }
      case 15: {
        message = 'Severe infestation of Lucerne Flea and red Legged Earth Mite reduces carrying capacity by one third. Sell one third of stock to Bank for $500 per pen.'
        stockSaleYield = -1 * ((sheepAmount / 200) / 3) * 500
        // setMoney(moneyValue + stockSaleYield)
        // setSheep((sheepAmount - ((sheepAmount / 200) / 3)))
        stockSaleMessage = "You sold " + (sheepAmount / 3) + " sheep for " + stockSaleYield + "."
        break;
      }
      case 16: {
        message = 'Paddocks require spelling due to heavy sheep Worm infestation. Sell half of your stock at $500 per pen.'
        stockSaleYield = -1 * ((sheepAmount / 200) / 2) * 500
        // setMoney(moneyValue + stockSaleYield)
        // setSheep(sheepAmount / 2)
        stockSaleMessage = "You sold " + (sheepAmount / 2) + " sheep for " + stockSaleYield + "."
        break;
      }
      case 17: {
        message = 'You must pay $50 Income Tax for each Natural Pasture Paddock and $200 for each $1,000 Cash held, to nearest thousand.'
        let taxOnCash = Math.floor(moneyValue / 1000) * 200
        setMoney(moneyValue - (300 + taxOnCash))
        break;
      }
      case 18: {
        message = 'Successful lambing season due to good mangement - 120% Lambs. Receive additional 600 stock, i.e, 3 pens of sheep, or your property is already fully stocked, receive $1,200 instead.'
        if (sheepAmount < 3000) {
          setSheep(sheepAmount + 600)
        }
        if (sheepAmount >= 3000) {
          setMoney(moneyValue + 1200)
        }
        break;
      }
      case 19: {
        message = 'Receive $800 Compensation for State Highway put through your property.'
        setMoney(moneyValue + 800)
        break;
      }
      case 20: {
        message = 'From sale of Fat Lambs receive $500.'
        setMoney(moneyValue + 500)
        break;
      }
      case 21: {
        message = 'Wild Dogs kill many Sheep. If you own Stock, return 3 pens of Sheep to the Bank.'
        setSheep(sheepAmount - 600)
        break;
      }
      case 22: {
        message = 'You have won Soil Conservation Trophy - Receive $300.'
        setSheep(sheepAmount + 300)
        break;
      }
      case 23: {
        message = 'Good Autumn and Spring Rains. Have an additional Wool Sale. These rains break drought.'
        woolsale = 'Yes, good luck!';
        woolSaleYield = pens * 250
        setMoney(moneyValue + woolSaleYield)
        droughtMessage = 'General drought'
        //setDrought(false)
        break;
      }
      case 24: {
        message = 'You have increased the average Fleece weight by selective breeding and good mangement, Receive bonus of $1,000.'
        setMoney(moneyValue + 500)
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
    setMoney(moneyValue + stockSaleYield)
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
    setMoney(moneyValue + stockSaleYield)
    setSheep(sheepAmount + howManySheep)
    stockSaleMessage = 'You bought ' + howManyPens + ' pens at ' + price + ' each for a total of ' + stockSaleYield + '.'
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
    stocksale = 'Yes'
    message = "You have a local drought and must sell half your sheep."
    let howMany = ((sheepAmount / 200) / 2)
    let price = stockSellPrice()
    stockSaleYield = -1 * howMany * price
    setMoney(moneyValue + stockSaleYield)
    setSheep(sheepAmount / 2)
    stockSaleMessage = "You sold " + howMany * 200 + " sheep for $" + stockSaleYield + "."
  }

  // LOCAL RAIN
  if (modded_position === 27) {
    message = "Local Rain breaks drought."
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
      <div>Previous position was : {positionValue}</div>
      <div>Previous event was : {board_position_array[positionValue]}</div>
      <div>Roll was : {dieRoll}</div>
      <div>New position is : {modded_position}</div> 
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