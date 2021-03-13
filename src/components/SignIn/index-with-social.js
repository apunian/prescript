import React, { useEffect, useState, Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import IntlMessages from '../../utils/IntlMessages';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGithubSignIn,
  userGoogleSignIn,
  userSignIn,
  userTwitterSignIn,
} from '../../actions/Auth';
import { AppBar, Typography } from '@material-ui/core';
import { withAuthentication } from '../Session';

const INITIAL_STATE = {
  email: 'amandeep.punian@gmail.com',
  password: '11111111',
  error: null,

};

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_CODE_ACCOUNT_NOTFOUND =
  'auth/user-not-found';

  const ERROR_MSG_ACCOUNT_NOTFOUND = `
  There is no user record corresponding to this identifier. The user may have been deleted.
`;

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  componentDidMount() {
   
    
    this.timeout = setInterval(() => {
      
      //this.props.dispatch(hideMessage());
      if (this.props.authUser) {
        clearInterval(this.timeout);
        this.props.history.push(ROUTES.DOCTORS_DASHBOARD);
      }
      if (this.props.error.showMessage) {
        
      }
      
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }


  onChange = event => {
    this.setState({ [event.target.name]: event.target.value, error: '' });
  };

  //SIGN IN ON SUBMIT
  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(({authUser}) => {
        this.setState({ ...INITIAL_STATE });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .catch(error => {
        //this.showError({error});
        //DISPATCH TO REDUX STORE BASED ON MAPTODISPACT
        if (error.code === ERROR_CODE_ACCOUNT_NOTFOUND) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        } 
        //this.props.onSetError(error);
        this.showError (error)
      });

    event.preventDefault();
  };

  showError = error => {
    this.setState({error});
  }

  render() {
    //console.log('rendering..')
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    //const dispatch = useDispatch();
    const {loader, showMessage, alertMessage } = '';
    return (
      <div id='a' className="app-login-main justify-content-center align-items-center vertical-align-middle horizontal-align-center align-center">
      <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="app-login-main-content">
          <div className="app-login-header mb-4">
            <AppBar position="static">
              <Typography
                variant="h6"
                color="inherit"
                align="center"
              >
                PresCRIPT Login
              </Typography>
            </AppBar>
          </div>
          <div className="app-login-form">
            <div className="mb-3 d-flex align-items-center justify-content-between">
              <div className="app-login-container-internal d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
                <div className="app-login-main-content">
                  <div className="app-logo-content d-flex align-items-center justify-content-center">
                    <Link
                      className="logo-lg"
                      to="/"
                      title="PresCRIPT"
                    >
                      <img
                        src={require('../../assets/images/dashboard/project-icon.png')}
                        alt="PresCRIPT"
                        title="PresCRIPT"
                      />
                    </Link>
                  </div>

                  <div className="app-login-content">
                    <div className="app-login-form">
                      <form>
                        <fieldset>
                          <TextField
                           name="email"
                            label={
                              <IntlMessages id="appModule.email" />
                            }
                            fullWidth
                            onChange={this.onChange}
                             defaultValue={email}
                            margin="normal"
                            className="mt-1 my-sm-3"
                          />
                          <TextField
                            name="password"
                            type="password"
                            label={
                              <IntlMessages id="appModule.password" />
                            }
                            fullWidth
                            onChange={this.onChange}
                            defaultValue={password}
                            margin="normal"
                            className="mt-1 my-sm-3"
                          />

                          <div className="mb-3 d-flex align-items-center justify-content-between">
                            <Button 
                             disabled={isInvalid}
                              onClick = {event => {
                                  this.onSubmit(event);
                                }  
                              }
                                
                                
                              
                              variant="contained"
                              color="primary"
                            >
                              <IntlMessages id="appModule.signIn" />
                            </Button>

                            <Link to="/signup">
                              <IntlMessages id="signIn.signUp" />
                            </Link>
                          </div>

                          <div className="app-social-block my-1 my-sm-3">
                            <div className="pl-0 d-flex align-items-center justify-content-between">
                              <IntlMessages id="signIn.connectWith" />
                            </div>
                            <ul className="social-link">
                              <li>
                                <IconButton
                                  className="icon"
                                  onClick={() => {
                                    this.props.dispatch(showAuthLoader());
                                    this.props.dispatch(
                                      userFacebookSignIn(),
                                    );
                                  }}
                                >
                                  <i className="zmdi zmdi-facebook" />
                                </IconButton>
                              </li>

                              <li>
                                <IconButton
                                  className="icon"
                                  onClick={() => {
                                    this.props.dispatch(showAuthLoader());
                                    this.props.dispatch(userTwitterSignIn());
                                  }}
                                >
                                  <i className="zmdi zmdi-twitter" />
                                </IconButton>
                              </li>

                              <li>
                                <IconButton
                                  className="icon"
                                  onClick={() => {
                                    this.props.dispatch(showAuthLoader());
                                    this.props.dispatch(userGoogleSignIn());
                                  }}
                                >
                                  <i className="zmdi zmdi-google-plus" />
                                </IconButton>
                              </li>

                              <li>
                                <IconButton
                                  className="icon"
                                  onClick={() => {
                                    this.props.dispatch(showAuthLoader());
                                    this.props.dispatch(userGithubSignIn());
                                  }}
                                >
                                  <i className="zmdi zmdi-github" />
                                </IconButton>
                              </li>
                            </ul>
                          </div>
                        </fieldset>
                      </form>
                    </div>
                  </div>
                </div>
                {loader && (
                  <div className="loader-view">
                    <CircularProgress />
                  </div>
                )}
                {error &&
                  NotificationManager.error(error.message)}
                <NotificationContainer />
              </div>
            </div>
          </div>
        </div>
        
      </div>
      </div>
    );
  }
}

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Google</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Facebook</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInTwitterBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithTwitter()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Twitter</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
const mapStateToProps = state => ({
  authUser: state.session.authUser,
  alertMessage: state.session.alertMessage,
  showMessage: state.session.showMessage,
  initURL: state.session.initURL,
  error: state.session.error,
});

const mapDispatchToProps = dispatch => ({
  onSetError: (error) =>
    dispatch({ type: 'ERROR_SET', error}),
});

const SignInForm = compose(
  withRouter,
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(SignInFormBase);

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

const SignInFacebook = compose(
  withRouter,
  withFirebase,
)(SignInFacebookBase);

const SignInTwitter = compose(
  withRouter,
  withFirebase,
)(SignInTwitterBase);



export default SignInForm;

export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter };
