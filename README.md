# sheepreact
A game about sheep using typescript and React. This is a demo design of the game mechanics in anticipation of implementation in Tezos.
Built following instructions at https://www.section.io/engineering-education/building-a-react-app-with-typescript/

## Run the game

```
~/sheepreact/sheepgame$ npm start
```

## Paddock Improvement
Move your sheep through a series of improved pastures. Pay the costs of raising sheep for market. Make money from selling wool and use it to improve pasture.

## Game Cycle
The result of two rolled dice is added and the player is advanced to the corresponding next event. Each mod 43 there is a Wool Sale. The events are various functions affecting the yields at Stock Sales or Wool Sales. Some game tokens and some game obligations will be handled with NFTs. There are asset NFTs and liability NFTs. 

## NFTs
The NFTs will be burned when used, or when a Stud Ram dies. The NFTs are obtained for a fee, and are often optional.  Others are obligations you have to meet, and you are required to burn them, generally at Wool Sale, incurring some owed deficit defined by the NFT. Holding some will help you, holding others may mean a penalty, but you burn them when you use them.

### Asset NFTs

#### Stud Rams
There are six Stud Rams. Holders of a Stud Ram NFT will have a premium added to their Wool Sales yield.
   - Elmsford Park Rex
   - Winton Boy II
   - Mitchell's Pride
   - Lachlan Lad
   - King of Warramboo

#### Insurance Policy for Stud Ram
- This NFT is not transferable and pays out if you have a Stud Ram that dies.

#### Haystack
- Holders of a Haystack NFT are afforded protection if their bore dries up

#### Fire Fighting Equipment
- Protection from fire.

#### Control Program NFTs
These NFTs entitle holders to a premium at Wool Sale and are burned on use. They also afford protection against their respective bad events.

 - Worm Control Programme
 - Control of Weeds and Insects
 - Fertilized Pasture

### Liabilty NFTs
#### Blowfly Wave
- A penalty at Wool Sale for poor management, randomly obtained from the Tucker Bag. Can be burned before the penalty is applied if you first Jet Sheep.

##### High Stock Prices Ruling
- Imposes a premium on the selling or buying price at the  next Stock Sale

##### New Sheering Shed
- A penalty proportional to your sheep holdings and obtained randomly from the Tucker Bag.
