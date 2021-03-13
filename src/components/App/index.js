import React, {useEffect} from 'react';
import { format } from 'date-fns';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  RouteProps,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import indigoTheme from './../themes/indigoTheme';
import darkTheme from './../themes/darkTheme';
import AppLocale from '../../translations';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInForm from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import CRM from '../CRM';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import RTL from '../../utils/RTL';
import '../../assets/vendors/style';
import AppLayoutWrapper from '../AppLayout/AppLayoutWrapper';
import AppLayoutWithoutSidebar from '../AppLayout/AppLayoutWithoutSidebar';
import ClinicSettings from '../ClinicSettings';
import ClassComponent from '../ClassComponent';
import FunctionalComponent from '../FunctionalComponent';
import MainEntry from '../AppLayout/MainEntry';
import MyRoutes from '../MyRoutes';
const App = props => {
  //useSelect will take settingState from a reducer and populate the variables.
  //local from settings:  {languageId: 'english', locale: 'en', name: 'English', icon: 'us'}
  const {
    themeColor,
    darkTheme,
    locale,
    isDirectionRTL,
  } = useSelector(({ settings }) => settings);

  const { authUser } = useSelector(
    ({ session }) => session,
  );

  const isDarkTheme = darkTheme;

  const {match, location} = props;
  //console.log("App prop::match.url::", match.url);
  //console.log("App prop::location.pathname::", location.pathname);
  //console.log('App RENDERED::',format(new Date(), 'yyyy-MM-dd hh:mm:ss S T'));
  useEffect(
    () => {
      //console.log('App MOUNTED::',format(new Date(), 'yyyy-MM-dd hh:mm:ss S T'))
    return () => {
       //Cleanup here - it is like Component Unmount
       //console.log('App UNMOUNTED::',format(new Date(), 'yyyy-MM-dd hh:mm:ss S T'))
     };
    },
  [], //Pass the state/variables here, useEffect will execute when there is a change in the values of these variables
  );

  let applyTheme = createMuiTheme(indigoTheme);
  if (isDarkTheme) {
    document.body.classList.add('dark-theme');
    applyTheme = createMuiTheme(darkTheme);
  }

  const currentAppLocale = AppLocale[locale.locale]; //e.g. AppLocale[en]

  const RestrictedRoute = ({
    authUser,
    component: Component,
    ...rest
  }) => (
    <Route
      {...rest}
      render={props =>
        authUser ? 
           <Component {...props} />
         : 
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        
      }
    />
  );
  const initURL = '';
  if (location.pathname === '/') {
    if (authUser === null) {
      return ( <Redirect to={ROUTES.SIGN_IN}/> );
    } else if (initURL === '' || initURL === '/' || initURL === '/signin') {
      return ( <Redirect to={ROUTES.DOCTORS_DASHBOARD}/> );
    } else {
      return ( <Redirect to={initURL}/> );
    }
  }
  
  return (
    <ThemeProvider theme={applyTheme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <RTL>
            <div className="app-main">
             
            <RestrictedRoute path={ROUTES.APP} authUser={authUser}
                                 component={AppLayoutWrapper}/>
                <Route path={ROUTES.SIGN_IN} component={SignInForm}/>
                <Route path={ROUTES.SIGN_UP} component={SignUpPage}/>

      <Route path={ROUTES.CLINIC_SETTINGS} component={ClinicSettings}/>
            </div>
          </RTL>
        </IntlProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};
export default withAuthentication(App);