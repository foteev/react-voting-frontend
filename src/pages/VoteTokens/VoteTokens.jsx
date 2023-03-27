import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { ethers } from 'ethers';
import AppContract from '../../artifacts/contracts/VotingSystem.sol/VotingSystem.json';
import '../../form.css';

function VoteTokens({ APP_CONTRACT_ADDRESS }) {
  const [state, setState] = useState({
    address: ''
  });

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(APP_CONTRACT_ADDRESS, AppContract.abi, signer);

  
  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }
  
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  const handleSendToken = async (event) => {
    event.preventDefault();
    
    console.log('send token form');
    
    if (!window.ethereum) return;

    setState({
      ...state,
      processing: true
    });

    try {
      await requestAccount();

      const transaction = await contract.sendTokenForVoting(state.address);
      await transaction.wait();
      
      console.log('token sent');
      
      setState({
        ...state,
        processing: false
      });
      
    } catch(err) {
      console.log('Error sending token ==>', err);
    }
  }

  const handleBurnToken = async (event) => {
    event.preventDefault();
    
    console.log('burn token form');
    
    if (!window.ethereum) return;

    setState({
      ...state,
      processing: true
    });

    try {
      await requestAccount();

      const transaction = await contract.deleteToken(state.address);
      await transaction.wait();
      
      console.log('token burned');
      
      setState({
        ...state,
        processing: false
      });
      
    } catch(err) {
      console.log('Error burning token ==>', err);
    }
  }

  if (state.processing) return <main className="main">Sending/Burning token...</main>;

  if (state.redirect) return <Redirect to="/polls/vote" />;
  
  return (
    <main className="main createPage">
      <h2 className="pageHeader">Send Token</h2>

      <form className="form" onSubmit={handleSendToken}>
        <div className="form-group">
          <label className="form-label" htmlFor="address">Address: </label>
          <input
            className="form-input"
            type="text" 
            name="address" 
            value={state.address}
            onChange={handleInputChange}
          />
        </div>

        <input 
          className="form-button form-buttonSubmit"
          type="submit" 
          value="Send Token" 
        />
      </form>

      <h2 className="pageHeader">Burn Token</h2>

      <form className="form" onSubmit={handleBurnToken}>
        <div className="form-group">
          <label className="form-label" htmlFor="address">Address: </label>
          <input
            className="form-input"
            type="text" 
            name="address" 
            value={state.address}
            onChange={handleInputChange}
          />
        </div>

        <input 
          className="form-button form-buttonSubmit"
          type="submit" 
          value="Burn Token" 
        />
      </form>
    </main>
  )
}

export default VoteTokens;
