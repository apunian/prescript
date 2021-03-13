
const INITIAL_STATE = {
  authUser: null,
  loader: false,
  alertMessage: '',
  showMessage: false,
  initURL: '',
  error: '',
};

const applySetAuthUser = (state, action) => ({
  ...state,
  loader: false,
  alertMessage: '',
  showMessage: false,
  initURL: '',
  authUser: action.authUser,
  error: {},
});

const applySetError = (state, action) => ({
  ...state,
  alertMessage: action.error.message,
  showMessage: true,
  error: action.error,
});

function session(state = INITIAL_STATE, action) {
  switch (action.type) {
    
    case 'ERROR_SET': {
      //console.log('In Session reducer ERROR_SET:::', action.error.code);
      //console.log(action.error.message);
      return applySetError(state, action);
    }
    case 'AUTH_USER_SET': {
      //console.log('In Session reducer AUTH_USER_SET:::', state);
      return applySetAuthUser(state, action);
    }
    case 'SIGNIN_USER': {
      //console.log('In Session reducer:::', state);
      const email = action.email;
      const password = action.password;

      this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        return applySetAuthUser(state, action);
      })
      .catch(error => {
        this.setState({ error });
      });
      break;
    }
    case 'SIGNUP_USER' : { 
      //console.log('WOW - the redux stored recognized the dispatch. userObj::', action.userObj);
      break;
    }
    case 'ON_SHOW_LOADER': {
      //console.log('In Session reducer ON_SHOW_LOADER:::', state);
      break;
    }
    default:
      return state;
  }
}

export default session;
