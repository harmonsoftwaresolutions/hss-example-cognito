import { Config, CognitoIdentityCredentials } from 'aws-sdk';
import {
  CognitoUserPool,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js';
import React, { Component } from 'react';
import appConfig from './config';

Config.region = appConfig.region;
Config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: appConfig.IdentityPoolId
});

const userPool = new CognitoUserPool({
  UserPoolId: appConfig.UserPoolId,
  ClientId: appConfig.ClientId
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: ''
    };
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email
      })
    ];
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        console.log(err);
        this.setState({ message: err.message });
        return;
      }
      this.setState({ message: "User created" });
      console.log('user name is: ' + result.user.getUsername());
      console.log('call result: ' + JSON.stringify(result));
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text"
                 value={this.state.email}
                 placeholder="Email"
                 onChange={this.handleEmailChange.bind(this)} />
          <input type="password"
                 value={this.state.password}
                 placeholder="Password"
                 onChange={this.handlePasswordChange.bind(this)} />
          <input type="submit" />
        </form>
        <h3>{this.state.message}</h3>
      </div>
    );
  }
}

export default SignUpForm;

