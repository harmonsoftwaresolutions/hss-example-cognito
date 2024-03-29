import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import ConfirmationForm from './ConfirmationForm';

const Home = () => (
  <p>Home</p>
);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="App">
            <div className="App-header">
              <h2>Harmon Software Solutions</h2>
            </div>
          </div>

          <nav>
            <Link to="/">Home</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log in</Link>
            <Link to="/confirmation">Confirmation</Link>
          </nav>

          <hr />

          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUpForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/confirmation" component={ConfirmationForm} />
        </div>
      </Router>
    );
  }
}

export default App;
