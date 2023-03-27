import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import AppContract from '../../artifacts/contracts/VotingSystem.sol/VotingSystem.json';

function Reset({ APP_CONTRACT_ADDRESS }) {

  const [state, setState] = useState({
    myPolls: [''],
    retrievingPolls: false,
    processingStop: false,
  });

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(APP_CONTRACT_ADDRESS, AppContract.abi, signer);

  async function requestAccount() {
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return account;
  }

  async function getRunningPolls() {
    if (!window.ethereum) return;

    setState({
      ...state,
      retrievingPolls: true
    });

    const userAddr = await requestAccount();

    try {
      let polls = [];

      await contract.allSessions()
        .then(result => {
          polls = [...result];
        })

      setState({
        ...state,
        myPolls: polls,
        userAddr: userAddr,
        retrievingPolls: false
      });

    } catch (err) {
      console.log('Error getting polls ==>', err);
    }
  }

  const handleStop = async (event) => {
      event.preventDefault();
      console.log(event.target.innerText);

      if (!window.ethereum) return;
  
      setState({
        ...state,
        processingStop: true
      });
  
      try {
        await requestAccount();
        console.log(event.target.innerText)

        const transaction = await contract.stopVoting(event.target.innerText);
        console.log(transaction);
        await transaction.wait();
        console.log('stopped poll');

        setState({
          ...state,
          processingStop: false
        });

      } catch(err) {
        console.log('Error stopping poll ==>', err);
      }
    }

  useEffect(() =>
    getRunningPolls()
  , [])

  return <>
    <button onClick={getRunningPolls}>Update</button>
    {state.myPolls.map((poll) => {
      return <React.Fragment key={poll}>
        <form
          className="form voteForm"
          onSubmit={handleStop}>
            <h2 className="subHeader">{poll}</h2>
            <input
              className="form-button buttonSubmit"
              type="submit"
              value="Stop Voting"
            ></input>
        </form>

      </React.Fragment>
    })}
  </>

}

export default Reset;