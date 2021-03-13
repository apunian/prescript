import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import IntlMessages from '../../utils/IntlMessages';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.css';
import ContainerHeader from '../AppLayout/ContainerHeader';
import Header from '../AppLayout/Header';

import CardBox from '../CardBox';
import FooterLanding from '../AppLayout/FooterLanding';
const MyFormikSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address format, Email must be a valid one')
    .required('Email is required'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/(?=.*[0-9])/, 'Password must contain a number.'),
});
const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_CODE_ACCOUNT_NOTFOUND = 'auth/user-not-found';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.timeout = setInterval(() => {
      //this.props.dispatch(hideMessage());
      if (this.props.authUser) {
        clearInterval(this.timeout);
        this.props.history.push(ROUTES.MAIN_ENTRY);
        //return <MainEntry authUser={this.props.authUser}/>;
      }
      if (this.props.error.showMessage) {
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  render() {
    return (
      <Formik
        initialValues={{
          email: 'amandeep.punian@gmail.com',
          password: '11111111',
          error: '',
          loader: false,
        }}
        validationSchema={MyFormikSchema}
        onSubmit={(values, {}) => {
          const email = values.email;
          const password = values.password;
          this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(({}) => {})
            .then(() => {
              return this.props.firebase.doSendEmailVerification();
            })
            .catch(error => {
              NotificationManager.error(values.error.message);
              //this.showError({error});
              //DISPATCH TO REDUX STORE BASED ON MAPTODISPACT
              if (error.code === ERROR_CODE_ACCOUNT_NOTFOUND) {
                error.message = ERROR_MSG_ACCOUNT_EXISTS;
              }
              //this.props.onSetError(error);
              this.showError(error);
            });
        }}
      >
        {({
          touched,
          errors,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          let isInvalid = false;

          if (values.email === '' || values.password === '') {
            isInvalid = false;
          }
          if (
            errors.email !== undefined ||
            errors.password !== undefined
          ) {
            isInvalid = true;
          }
          return (
            <div className="app-main-container app-wrapper animated slideInUpTiny animation-duration-3">
              <div className="app-header ml-4">
                <Header />
              </div>
              <div className="row align-items-center">
                <div className="col-lg-12 col-md-12">
                  <ContainerHeader
                    match={this.props.match}
                    title={<IntlMessages id="appModule.signin" />}
                  />
                </div>
              </div>
              <div styleName="row align-items-center">
                <CardBox
                  styleName="col-lg-12 col-md-12 "
                  childrenStyle="d-flex justify-content-center"
                  headerOutside
                >
                  <form method="post" onSubmit={handleSubmit}>
                    <fieldset>
                      <TextField
                        name="email"
                        label={<IntlMessages id="appModule.email" />}
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={values.email}
                        margin="normal"
                        type="text"
                        placeholder="Email Address"
                        //className="mt-1 my-sm-3"
                        className={`form-control ${
                          touched.email && errors.email
                            ? 'is-invalid'
                            : ''
                        } mt-0 mb-3`}
                      />
                      <ErrorMessage
                        component="div"
                        name="email"
                        className="invalid-feedback"
                      />
                      <TextField
                        name="password"
                        type="password"
                        label={
                          <IntlMessages id="appModule.password" />
                        }
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        defaultValue={values.password}
                        margin="normal"
                        placeholder="Password"
                        className={`form-control ${
                          touched.password && errors.password
                            ? 'is-invalid'
                            : ''
                        } mt-0 mb-3`}
                      />
                      <ErrorMessage
                        component="div"
                        name="password"
                        className="invalid-feedback"
                      />
                      <NotificationContainer />
                      <div className="mb-3 d-flex align-items-center justify-content-between">
                        <Button
                          disabled={isInvalid}
                          type="submit"
                          variant="contained"
                          color="primary"
                          className="mt-4"
                        >
                          <IntlMessages id="appModule.signin" />
                        </Button>

                        <Link to="/signup">
                          <IntlMessages id="signIn.signUp" />
                        </Link>
                      </div>
                      <div className="mb-3 d-flex align-items-center justify-content-between">
                        <Link to={ROUTES.PASSWORD_FORGET}>
                          <IntlMessages id="appModule.forgotPassword" />
                        </Link>
                      </div>
                    </fieldset>
                  </form>
                </CardBox>
                <div className="col-md-12 mb-2">
                  <FooterLanding />
                </div>
                {values.loader && (
                  <div className="loader-view">
                    <CircularProgress />
                  </div>
                )}
              </div>

              {values.error &&
                NotificationManager.error(values.error.message)}
              <NotificationContainer />
              {values.loader && (
                <div className="loader-view">
                  <CircularProgress />
                </div>
              )}
            </div>
          );
        }}
      </Formik>
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
  onSetError: error => dispatch({ type: 'ERROR_SET', error }),
});

const SignInForm = compose(
  withRouter,
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps),
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

export { SignInGoogle, SignInFacebook, SignInTwitter };
