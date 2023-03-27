import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import AppContract from '../../artifacts/contracts/VotingSystem.sol/VotingSystem.json';
import '../../form.css';
import './PollVote.css';

let poll = {
  name: "test",
  options: [
    "1",
    "2"
  ]
}

function PollVote({ APP_CONTRACT_ADDRESS }) {
  const [state, setState] = useState({
    allPolls: [poll],
    userAddr: '',
    retrievingPolls: false,
    processingVote: false
  });

  useEffect(() => {
    getRunningPolls();
  }, [])
  

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

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(APP_CONTRACT_ADDRESS, AppContract.abi, provider);
    
    try {

      const polls = [];

      await contract.allSessions()
        .then(result => result.forEach(async name => {
        await contract.allOption(name)
          .then(options => polls.push({ name: name, options: options }))
          .then(() =>  setState({
            ...state,
            allPolls: polls,
            userAddr: userAddr,
            retrievingPolls: false
          }));
        ;
      }));

    } catch (err) {
      console.log('Error getting polls ==>', err);
    }
  }

  if (state.retrievingPolls) return <main className="main">Retrieving all Polls...</main>;

  if (state.processingVote) return <main className="main">Processing your vote...</main>;

  return <>
    <button onClick={getRunningPolls}>Update</button>
    {state.allPolls.map((poll) => {
      return <React.Fragment key={poll.name}>
        <form
          className="form voteForm"
          >
            <h2 className="subHeader">{poll.name}</h2>
            <input
              className="form-button buttonSubmit"
              type="submit"
              value="Vote"
            ></input>
        </form>
      </React.Fragment>
    })}
  </>

}

export default PollVote;