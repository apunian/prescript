import {
  ADD_FAVOURITE,
  FETCH_ALL_PATIENT,
  FETCH_ALL_PATIENT_SUCCESS,
  FILTER_PATIENT,
  GET_ALL_PATIENT,
  GET_UNSELECTED_ALL_PATIENT,
  HANDLE_REQUEST_CLOSE,
  HIDE_PATIENT_LOADER,
  ON_ADD_PATIENT,
  ON_ALL_PATIENT_SELECT,
  ON_PATIENT_CLOSE,
  ON_PATIENT_SELECT,
  ON_DELETE_PATIENT,
  ON_DELETE_SELECTED_PATIENT,
  ON_FILTER_OPTION_SELECT,
  ON_SAVE_PATIENT,
  ON_TOGGLE_DRAWER,
  SHOW_MESSAGE,
  UPDATE_SEARCH_USER
} from '../constants/ActionTypes';


export const fetchPatients = () => {
  return {
    type: FETCH_ALL_PATIENT
  };
};

export const fetchPatientsSuccess = (Patient) => {
  return {
    type: FETCH_ALL_PATIENT_SUCCESS,
    payload: Patient
  }
};
export const showPatientMessage = (message) => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};
export const addFavourite = (data) => {
  return {
    type: ADD_FAVOURITE,
    payload: data
  };
};
export const onPatientSelect = (data) => {
  return {
    type: ON_PATIENT_SELECT,
    payload: data
  };
};


export const onAddPatient = () => {
  return {
    type: ON_ADD_PATIENT,
    payload: ''
  };
};
export const onPatientClose = () => {
  return {
    type: ON_PATIENT_CLOSE,
    payload: ''
  };
};
export const onFilterOptionSelect = (option) => {
  return {
    type: ON_FILTER_OPTION_SELECT,
    payload: option
  };
};
export const onSavePatient = (data) => {
  return {
    type: ON_SAVE_PATIENT,
    payload: data
  };
};
export const onDeletePatient = (data) => {
  return {
    type: ON_DELETE_PATIENT,
    payload: data
  };
};
export const onDeleteSelectedPatient = () => {
  return {
    type: ON_DELETE_SELECTED_PATIENT,
    payload: ''
  };
};
export const filterPatient = (userName) => {
  return {
    type: FILTER_PATIENT,
    payload: userName
  };
};
export const getAllPatient = () => {
  return {
    type: GET_ALL_PATIENT,
    payload: ''
  };
};
export const getUnselectedAllPatient = () => {
  return {
    type: GET_UNSELECTED_ALL_PATIENT,
    payload: ''
  };
};
export const onAllPatientSelect = () => {
  return {
    type: ON_ALL_PATIENT_SELECT,
    payload: ''
  };
};
export const updatePatientUser = (userName) => {
  return {
    type: UPDATE_SEARCH_USER,
    payload: userName
  };
};
export const onToggleDrawer = () => {
  return {
    type: ON_TOGGLE_DRAWER,
  };
};
export const handleRequestClose = () => {
  return {
    type: HANDLE_REQUEST_CLOSE,
  };
};
export const hidePatientLoader = () => {
  return {
    type: HIDE_PATIENT_LOADER,
  };
};
