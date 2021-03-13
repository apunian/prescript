import React, {  } from 'react';
import { compose } from 'recompose';
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import IntlMessages from '../../utils/IntlMessages';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './styles.css';
import { withFirebase } from '../Firebase';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import FooterLanding from '../AppLayout/FooterLanding';
import Header from '../AppLayout/Header';
import ContainerHeader from '../AppLayout/ContainerHeader';
import CardBox from '../CardBox';

const SignUp = props => (
  <Formik
    initialValues={{
      name: 'Aeh Pe',
      email: 'amandeep.punian@gmail.com',
      passwordOne: '11111111',
      passwordTwo: '11111111',
      appUserRole: 'DOCTOR_OWNER',
      error: '',
    }}
    onSubmit={(values, { setSubmitting }) => {
      const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';
      const ERROR_CODE_WEAK_PASSWORD = 'auth/weak-password';
      const ERROR_MSG_ACCOUNT_EXISTS = `
        An account with this E-Mail address already exists.
        Try to login with this account instead. If you think the
        account is already used from one of the social logins, try
        to sign in with one of them. Afterward, associate your accounts
        on your personal account page.
      `;
      const ERROR_MESSAGE_WEAK_PASSWORD = `
      The password is week. ERROR THROWN BY GOOGLE  FIREBASE.
    `;
      const roles = {};

      if (values.appUserRole === ROLES.ADMIN) {
        roles[ROLES.ADMIN] = ROLES.ADMIN;
      } else if (values.appUserRole === ROLES.DOCTOR_OWNER) {
        roles[ROLES.DOCTOR_OWNER] = ROLES.DOCTOR_OWNER;
      } else if (values.appUserRole === ROLES.DOCTOR) {
        roles[ROLES.DOCTOR] = ROLES.DOCTOR;
      } else if (values.appUserRole === ROLES.NURSE) {
        roles[ROLES.NURSE] = ROLES.NURSE;
      } else if (values.appUserRole === ROLES.STAFF) {
        roles[ROLES.STAFF] = ROLES.STAFF;
      }
      setTimeout(() => {
        const userName = values.name;
        const userEmail = values.email;
        const userPassword = values.passwordOne;
        const { REACT_APP_CONFIRMATION_EMAIL_REDIRECT } = process.env;
        

        props.firebase
          .doCreateUserWithEmailAndPassword(userEmail, userPassword)
          .then(authUser => {
            //console.log('Firbase returns authUser::', authUser);
            // Create a user in your Firebase realtime database
            return props.firebase.user(authUser.user.uid).set({
              userName,
              userEmail,
              roles,
            });
          })
          .then(() => {
            //console.log('firebase.doSendEmailVerification');
            return props.firebase.doSendEmailVerification();
          })
          .then(() => {
            //console.log('Rerouting now to MAIN_ENTRY');
            props.history.push(ROUTES.MAIN_ENTRY);
          })
          .catch(error => {
            if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
              error.message = ERROR_MSG_ACCOUNT_EXISTS;
            } else if (error.code === ERROR_CODE_WEAK_PASSWORD) {
              error.message = ERROR_MESSAGE_WEAK_PASSWORD;
            }
          });

        setSubmitting(false);
      }, 1000);
    }}
    //********Handling validation messages yourself*******/
    // validate={values => {
    //   let errors = {};
    //   if (!values.email) {
    //     errors.email = "Required";
    //   } else if (!EmailValidator.validate(values.email)) {
    //     errors.email = "Invalid email address";
    //   }

    //   const passwordRegex = /(?=.*[0-9])/;
    //   if (!values.password) {
    //     errors.password = "Required";
    //   } else if (values.password.length < 8) {
    //     errors.password = "Password must be 8 characters long.";
    //   } else if (!passwordRegex.test(values.password)) {
    //     errors.password = "Invalida password. Must contain one number";
    //   }

    //   return errors;
    // }}
    //********Using Yum for validation********/

    validationSchema={Yup.object().shape({
      name: Yup.string().required('Required'),
      email: Yup.string()
        .email()
        .required('Required'),
      passwordOne: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/(?=.*[0-9])/, 'Password must contain a number.'),
      passwordTwo: Yup.string()
        .oneOf(
          [Yup.ref('passwordOne'), null],
          'Password does not match.',
        )
        .required('Required'),
      appUserRole: Yup.string().required('Required'),
    })}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;
      //console.log(props);

      const {
        loader,
        alertMessage,
        showMessage,
      } = true;//useSelector(({ session }) => session);

      const isInvalid =
        values.passwordOne !== values.passwordTwo ||
        values.passwordOne === '' ||
        values.email === '' ||
        values.appUserRole === '';
      //console.log('values::', isInvalid);
      return (
        <div className="app-main-container app-wrapper animated slideInUpTiny animation-duration-3">
          <div className="app-header ml-4">
            <Header />
          </div>
          <ContainerHeader
            title={<IntlMessages id="appModule.signup" />}
          />
          <div className="w-100">
            <div styleName="row align-items-center">
              <CardBox styleName="col-md-12  " headerOutside={false}>
                <div className="mb-4">
                  <h4>
                    <IntlMessages id="appModule.createAccount" />
                  </h4>
                </div>

                <div className="app-login-form">
                  <form method="post" onSubmit={handleSubmit}>
                    <TextField
                      id="name"
                      type="text"
                      label="Name"
                      fullWidth
                      defaultValue={values.name}
                      margin="normal"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-control ${
                        touched.name && errors.name
                          ? 'is-invalid'
                          : ''
                      } mt-0 mb-3`}
                    />
                    <ErrorMessage
                      component="div"
                      name="name"
                      className="invalid-feedback"
                    />

                    <TextField
                      id="email"
                      name="email"
                      type="email"
                      varoamt="outlined"
                      label={<IntlMessages id="appModule.email" />}
                      fullWidth
                      defaultValue={values.email}
                      margin="normal"
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                      id="passwordOne"
                      type="password"
                      label={<IntlMessages id="appModule.password" />}
                      fullWidth
                      defaultValue={values.passwordOne}
                      margin="normal"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-control ${
                        touched.passwordOne && errors.passwordOne
                          ? 'is-invalid'
                          : ''
                      } mt-0 mb-3`}
                    />
                    <ErrorMessage
                      component="div"
                      name="passwordOne"
                      className="invalid-feedback"
                    />
                    <TextField
                      id="passwordTwo"
                      type="password"
                      onChange={handleChange}
                      label={
                        <IntlMessages id="appModule.password.repeat" />
                      }
                      fullWidth
                      defaultValue={values.passwordTwo}
                      margin="normal"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-control ${
                        touched.passwordTwo && errors.passwordTwo
                          ? 'is-invalid'
                          : ''
                      } mt-0 mb-3`}
                    />
                    <ErrorMessage
                      component="div"
                      name="passwordTwo"
                      className="invalid-feedback"
                    />
                    <FormControl className="w-100 mb-4">
                      <InputLabel>I am a</InputLabel>
                      <Select
                        value={values.appUserRole}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        input={<Input name="appUserRole" />}
                      >
                        <MenuItem value={'DOCTOR_OWNER'}>
                          Doctor setting up a new Clinic
                        </MenuItem>
                        <MenuItem value={'DOCTOR'}>
                          Doctor working for an existing Clinic
                        </MenuItem>
                        <MenuItem value={'NURSE'}>
                          Nurse working for an existing Clinic
                        </MenuItem>
                        <MenuItem value={'STAFF'}>
                          Office Admin working for an existing Clinic
                        </MenuItem>
                      </Select>
                    </FormControl>
                    {errors.appUserRole && touched.appUserRole && (
                      <div className="input-feedback">
                        {errors.appUserRole}
                      </div>
                    )}
                    {/* REGISTER BUTTON  */}
                    <div className="mb-0 d-flex align-items-center justify-content-between">
                      <Button
                        disabled={isInvalid}
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        <IntlMessages id="appModule.regsiter" />
                      </Button>

                      <Link to="/signin">
                        <IntlMessages id="signUp.alreadyMember" />
                      </Link>
                    </div>

                    {/* SOCIAL ICONS SECTION 
                  <div className="app-social-block my-1 my-sm-3">
                    <IntlMessages id="signIn.connectWith" />
                    <ul className="social-link">
                      <li>
                        <IconButton
                          className="icon"
                          onClick={() => {
                            //dispatch(showAuthLoader());
                            //dispatch(userFacebookSignIn());
                          }}
                        >
                          <i className="zmdi zmdi-facebook" />
                        </IconButton>
                      </li>

                      <li>
                        <IconButton
                          className="icon"
                          onClick={() => {
                            //dispatch(showAuthLoader());
                            //dispatch(userTwitterSignIn());
                          }}
                        >
                          <i className="zmdi zmdi-twitter" />
                        </IconButton>
                      </li>

                      <li>
                        <IconButton
                          className="icon"
                          onClick={() => {
                            //dispatch(showAuthLoader());
                            //dispatch(userGoogleSignIn());
                          }}
                        >
                          <i className="zmdi zmdi-google-plus" />
                        </IconButton>
                      </li>

                      <li>
                        <IconButton
                          className="icon"
                          onClick={() => {
                            //dispatch(showAuthLoader());
                            //dispatch(userGithubSignIn());
                          }}
                        >
                          <i className="zmdi zmdi-github" />
                        </IconButton>
                      </li>
                    </ul>
                  </div> */}
                  </form>
                </div>
              </CardBox>
              <div styleName="row align-items-center">
                <div className="col-md-12 ">
                  <FooterLanding />
                </div>
              </div>
            </div>
          </div>

          {values.error &&
            NotificationManager.error(values.error.message)}
          <NotificationContainer />
          {loader && (
            <div className="loader-view">
              <CircularProgress />
            </div>
          )}
          {showMessage && NotificationManager.error(alertMessage)}
          <NotificationContainer />
        </div>
      );
    }}
  </Formik>
);

const composedSignUp = compose(withFirebase)(SignUp);
export default composedSignUp;
