import React, { Component } from 'react';
import {
  CognitoUserPool,
  CognitoUser
} from 'amazon-cognito-identity-js';
import { Config, CognitoIdentityCredentials } from 'aws-sdk';
import appConfig from './config';

Config.region = appConfig.region;
Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: appConfig.IdentityPoolId
});

const userPool = new CognitoUserPool({
  UserPoolId: appConfig.UserPoolId,
  ClientId: appConfig.ClientId
});

class ConfirmationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      confirmationCode: '',
      message: ''
    };
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleConfirmationCodeChange(e) {
    this.setState({ confirmationCode: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const cognitoUser = new CognitoUser({
      Username: this.state.email.trim(),
      Pool: userPool
    });
    cognitoUser.confirmRegistration(this.state.confirmationCode, true, (err, result) => {
      if (err) {
        this.setState({ message: err.message });
        console.log('error', err.message);
        return;
      }
      this.setState({ message: result });
      console.log('call result: ' + JSON.stringify(result));
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            value={this.state.email}
            placeholder="Enter Email"
            onChange={this.handleEmailChange.bind(this)} />
          <input
            type="password"
            value={this.state.confirmationCode}
            placeholder="Enter Confirmation Code"
            onChange={this.handleConfirmationCodeChange.bind(this)} />
          <input type="submit" />
        </form>
        <h3>{this.state.message}</h3>
      </div>
    );
  }
}

export default ConfirmationForm;
