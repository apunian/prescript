import { combineReducers } from 'redux';
import {connectRouter} from 'connected-react-router'
import session from './session';
import userReducer from './user';
import messageReducer from './message';
import settings from './settings';
import Common from "./common";
import Patient from "./Patient";

//When there is a change in the state, Reducer functions executes, E.g. messagesState change will execute messageReducer function
const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  session: session,
  userState: userReducer,
  messageState: messageReducer,
  settings: settings,
  common: Common, 
  patients: Patient
});

export default rootReducer;
