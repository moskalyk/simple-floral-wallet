import React, { useState, useEffect } from 'react';
import frame from './6cyybpgcn.png';
import './App.css';

import { sequence } from '0xsequence';

// Works in both a Webapp (browser) or Node.js:
import { SequenceIndexerClient } from '@0xsequence/indexer'

const indexer = new SequenceIndexerClient('https://polygon-indexer.sequence.app')


function App() {

  const [balance, setBalance] = useState<any>(0)
  const [accountAddress, setAccountAddress] = useState<any>("")


  useEffect(() => {
    loadBalance()
  })

  const connectWallet = async () => {
    try {
      const wallet = await sequence.initWallet('polygon');
      const connectDetails = await wallet.connect({
        app: 'EMOJIS',
        authorize: true,
      });
      console.group(connectDetails)
      setAccountAddress(connectDetails!.session!.accountAddress)
      // setWallet(wallet);
      // setAppState(1)
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const loadBalance = async () => {
    // try any account address you'd like :)
    // const accountAddress = '0xabc...'

    // query Sequence Indexer for all token balances of the account on Polygon
    const tokenBalances = await indexer.getTokenBalances({
        accountAddress: accountAddress,
        includeMetadata: true
    })
    console.log('tokens in your account:', tokenBalances)

    tokenBalances.balances.map((token: any) => {
      if(token.contractAddress == "0x2791bca1f2de4661ed88a30c99a7a9449aa84174")
        setBalance(Number(Number(token.balance) / 100000).toPrecision(3))
    })
  }

  function openNav() {
    document.getElementById("mySidenav")!.style.width = "390px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav")!.style.width = "0";
  }

  return (
    <div className="App">
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      {
        ! accountAddress ? <button className='button' onClick={connectWallet}>connect</button>: <span className="greeting" onClick={openNav}>open wallet<p>🎕</p></span>
      }
      
      <div id="mySidenav"className="sidenav">
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
        <img height="" width="100%" src={frame} />
        <p className='balance-currency'>usdc</p>
        <div className='balance'>${balance}</div>
      </div>
    </div>
  );
}

export default App;
