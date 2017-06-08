import {
  Config,
  CognitoIdentityCredentials,
  CognitoIdentityServiceProvider
} from 'aws-sdk';
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

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
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
    const authenticationDetails = new CognitoIdentityServiceProvider.AuthenticationDetails({
      Username: email,
      Password: password
    });
    const userPool = new CognitoIdentityServiceProvider.CognitoUserPool({
      UserPoolId: appConfig.UserPoolId,
      ClientId: appConfig.ClientId
    });
    const cognitoUser = new CognitoIdentityServiceProvider.CognitoUser({
      Username: email,
      Pool: userPool
    });
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log('access token + ' + result.getAccessToken().getJwtToken());
      },
      onFailure: function (err) {
        alert(err);
      }
    });
    // cognitoUser.getUserAttributes((err, result) => {
        // if (err) {
            // alert(err);
            // return;
        // }
        // for (let i = 0; i < result.length; i++) {
            // console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());
        // }
    // });
  }

  render() {
    return (
      <section id="loginBox">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            <input type="text"
               value={this.state.email}
               placeholder="Email"
               onChange={this.handleEmailChange.bind(this)} />
          </label>
          <label>
            <input type="password"
               value={this.state.password}
               placeholder="Password"
               onChange={this.handlePasswordChange.bind(this)} />
            <input type="submit" value="Log In"/>
          </label>
        </form>
      </section>
    );
  }
}

export default LoginForm;

