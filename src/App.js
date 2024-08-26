import React, { useState } from 'react';
import Web3 from 'web3';
import WalletConnection from './WalletConnection';
import CoinflipABI from './CoinflipABI.json';

function App() {
  const [guess, setGuess] = useState(true);
  const [betAmount, setBetAmount] = useState(0);
  const contractAddress = '0xfCB1f956E736e4982013061F1072A8EDC4A64e89';

  console.log(CoinflipABI);

  const handleFlip = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(CoinflipABI.abi, contractAddress);
      const accounts = await web3.eth.getAccounts();

      await contract.methods.flip(guess).send({
        from: accounts[0],
        value: web3.utils.toWei(betAmount.toString(), 'ether'),
      });
    } else {
      console.error('Ethereum provider is not available.');
    }
  };

  return (
    <div>
      <WalletConnection />
      <h2>Coinflip Game</h2>
      <div>
        <label>Bet Amount (ETH): </label>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
        />
      </div>
      <div>
        <label>Select Heads or Tails: </label>
        <button onClick={() => setGuess(true)}>Heads</button>
        <button onClick={() => setGuess(false)}>Tails</button>
      </div>
      <button onClick={handleFlip}>Flip the Coin!</button>
    </div>
  );
}

export default App;
