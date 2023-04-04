import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { ethers } from 'ethers';
import AppContract from '../../artifacts/contracts/VotingSystem.sol/VotingSystem.json';
import './PollCreate.css';
import '../../form.css';




function PollCreate({ APP_CONTRACT_ADDRESS }) {
  const [state, setState] = useState({
    name: '',
    options: [],
    limitVotes: '',
    optionInput: '',
    redirect: false,
    processing: false
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

  const handleOptionAdd = (event) => {
    const updatedOptions = [...state.options, state.optionInput];

    setState({
      ...state,
      optionInput: '',
      options: updatedOptions
    });
  }

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    console.log('submit form');
    
    if (!state.name || !state.options.length) return;
    if (!window.ethereum) return;

    setState({
      ...state,
      processing: true
    });

    try {
      await requestAccount();

      const transaction = await contract.makeVoting(state.name, state.options);
      await transaction.wait();
      
      console.log('created poll');
      
      setState({
        ...state,
        processing: false
      });
      
    } catch(err) {
      console.log('Error creating poll ==>', err);
    }
  }

  const handleLimitSubmit = async (event) => {
    event.preventDefault();
    
    console.log('limit form');
    
    if (!window.ethereum) return;

    setState({
      ...state,
      processing: true
    });

    try {
      await requestAccount();

      const transaction = await contract.makeLimit(state.name, Number(state.limitVotes));
      await transaction.wait();
      console.log('set limit');
      
      setState({
        ...state,
        processing: false
      });
      
    } catch(err) {
      console.log('Error setting limit ==>', err);
    }
  }
  
  function renderOptions() {
    return state.options.map((opt, idx) => {
      return (
        <li className="form-option" key={idx}>
          {opt}
        </li>
      );
    });
  }
  

  if (state.processing) return <main className="main">Creating/Updating a Poll...</main>;

  if (state.redirect) return <Redirect to="/polls/vote" />;
  
  return (
    <main className="main createPage">
      <h2 className="pageHeader">Create a Poll</h2>

      <form className="form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Name: </label>
          <input
            className="form-input"
            type="text" 
            name="name" 
            value={state.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="options">Options:</label>
          <ul id="options" className="form-optionGroup">{renderOptions()}</ul>

          <label className="form-label" htmlFor="optionInput" hidden>Add: </label>
          <input
            className="form-input"
            type="text"
            name="optionInput"
            value={state.optionInput}
            onChange={handleInputChange}
          />
          <input
            className="form-button form-buttonOption"
            type="button"
            value="Add Option"
            onClick={handleOptionAdd}
          />
        </div>

        <input
          className="form-button form-buttonSubmit"
          type="submit"
          value="Create"
        />
      </form>

    <h2 className="pageHeader">Set votes limit</h2>

      <form className="form" onSubmit={handleLimitSubmit}>

        <div className="form-group">
          <label className="form-label" htmlFor="name">Name: </label>
          <input
            className="form-input"
            type="text" 
            name="name" 
            value={state.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="description">Votes limit (optional): </label>
          <input
            className="form-input"
            type="text" 
            name="limitVotes" 
            value={state.limitVotes}
            onChange={handleInputChange}
          />
        </div>

        <input
          className="form-button form-buttonSubmit"
          type="submit"
          value="Set"
        />
      </form>
    </main>
  )
}

export default PollCreate;
