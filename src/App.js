import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import PollCreate from './pages/PollCreate/PollCreate';
import PollVote from './pages/PollVote/PollVote';
import PollReset from './pages/PollReset/PollReset';
import VoteTokens from './pages/VoteTokens/VoteTokens';
import './App.css';
import { useState } from 'react';
import { APP_CONTRACT_ADDRESS } from './constants';

function App() {
  const [address, setAddress] = useState(APP_CONTRACT_ADDRESS);

  const handleInputChange = (event) => {
    setAddress( event.target.value)
    console.log(address);
  }
  return (
    <div className="App">
      <Header />
      <div className="Address">
        <label className="form-label" htmlFor="address">Contract address: </label>
        <input
            className="form-input"
            type="text" 
            name="address" 
            value={address}
            onChange={handleInputChange}
        />
      </div>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/polls/vote" />} />

        <Route path="/polls/new" render={() => <PollCreate APP_CONTRACT_ADDRESS={address} />} />

        <Route path="/tokens" render={() => <VoteTokens APP_CONTRACT_ADDRESS={address}/>} />
        
        <Route exact path="/polls/vote" render={() => <PollVote APP_CONTRACT_ADDRESS={address} />} />

        <Route path="/polls/reset" render={() => <PollReset APP_CONTRACT_ADDRESS={address} />} />
      </Switch>
    </div>
  );
}

export default App;
