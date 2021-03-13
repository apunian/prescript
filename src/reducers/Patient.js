import {
  ADD_FAVOURITE,
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
} from './../constants/ActionTypes';

import data from './../components/Patients/data/patientList';

const INIT_STATE = {
  alertMessage: '',
  showMessage: false,
  loader: false,
  noContentFoundMessage: 'No patient found in selected folder',
  selectedSectionId: 1,
  drawerState: false,
  user: {
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    avatar: "https://via.placeholder.com/150x150"
  },
  searchUser: '',
  filterOption: 'All patients',
  // allpatient: [],
  // patientList: [], //only for prod
  allPatient: data,
  patientList: data,
  selectedPatient: null,
  selectedPatients: 0,
  addPatientState: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_FAVOURITE: {
      return {
        ...state,
        alertMessage: action.payload.starred ? 'Patient removed as star' : 'Patient marked as star',
        showMessage: true,
        patientList: state.patientList.map((patient) => patient.id === action.payload.id ? {
          ...patient,
          starred: !action.payload.starred
        } : patient),
        allPatient: state.allPatient.map((patient) => patient.id === action.payload.id ? {
          ...patient,
          starred: !action.payload.starred
        } : patient)
      };
    }
    case FETCH_ALL_PATIENT_SUCCESS: {
      return {
        ...state,
        loader: false,
        allPatient: action.payload,
        patientList: action.payload,
      }
    }
    case SHOW_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false
      }
    }
    case ON_PATIENT_SELECT: {
      action.payload.selected = !action.payload.selected;
      let selectedPatients = 0;
      const patientList = state.patientList.map(patient => {
          if (patient.selected) {
            selectedPatients++;
          }
          if (patient.id === action.payload.id) {
            if (patient.selected) {
              selectedPatients++;
            }
            return action.payload;
          } else {
            return patient;
          }
        }
      );
      return {
        ...state, INIT_STATE,
        selectedPatients: selectedPatients,
        patientList: patientList
      };
    }
    case ON_ADD_PATIENT: {
      return {...state, addPatientState: true};
    }
    case ON_PATIENT_CLOSE: {
      return {...state, addPatientState: false};
    }
    case ON_FILTER_OPTION_SELECT: {
      let selectedSectionId = 0;
      let filterOption = '';
      let patientList = [];
      switch (action.payload.name) {
        case 'All patients': {
          selectedSectionId = action.payload.id;
          filterOption = action.payload.name;
          patientList = state.allPatient;
          break;
        }
        case 'Frequently patiented': {
          selectedSectionId = action.payload.id;
          filterOption = action.payload.name;
          patientList = state.allPatient.filter((patient) => patient.frequently);
          break;
        }
        case 'Starred patients': {
          selectedSectionId = action.payload.id;
          filterOption = action.payload.name;
          patientList = state.allPatient.filter((patient) => patient.starred);
          break;
        }

        default: {
          selectedSectionId = action.payload.id;
          filterOption = action.payload.name;
          patientList = state.allPatient;
          break;
        }
      }
      return {
        ...state, selectedSectionId, filterOption, patientList, drawerState: false
      };
    }
    case ON_SAVE_PATIENT: {
      let isNew = true;
      const patientList = state.allPatient.map((patient) => {
        if (patient.id === action.payload.id) {
          isNew = false;
          return action.payload
        } else {
          return patient
        }
      });
      if (isNew) {
        patientList.push(action.payload);
      }
      return {
        ...state,
        alertMessage: isNew ? 'Patient Added Successfully' : 'Patient Updated Successfully',
        showMessage: true,
        patientList: patientList,
        allPatient: patientList,
      }
    }
    case ON_DELETE_PATIENT: {
      return {
        ...state,
        alertMessage: 'Patient Deleted Successfully',
        showMessage: true,
        allPatient: state.allPatient.filter((patient) => patient.id !== action.payload.id),
        patientList: state.allPatient.filter((patient) => patient.id !== action.payload.id),
      }
    }
    case ON_DELETE_SELECTED_PATIENT: {
      const patients = state.allPatient.filter((patient) => !patient.selected);
      return {
        ...state,
        alertMessage: 'Patient Deleted Successfully',
        showMessage: true,
        allPatient: patients,
        patientList: patients,
        selectedPatients: 0
      }
    }
    case FILTER_PATIENT: {
      const {filterOption} = state;
      let patientList = [];
      if (action.payload === '') {
        patientList = state.allPatient;
      } else {
        const filterPatient = state.allPatient.filter((patient) =>
          patient.name.toLowerCase().indexOf(action.payload.toLowerCase()) > -1);
        if (filterOption === 'All patients') {
          patientList = filterPatient
        } else if (filterOption === 'Frequently patiented') {
          patientList = filterPatient.filter((patient) => patient.frequently);
        } else if (filterOption === 'Starred patients') {
          patientList = filterPatient.filter((patient) => patient.starred);
        }
      }
      return {...state, patientList: patientList}
    }
    case GET_ALL_PATIENT: {
      let patientList = state.allPatient.map((patient) => patient ? {
        ...patient,
        selected: true
      } : patient);
      return {
        ...state,
        selectedPatients: patientList.length,
        allPatient: patientList,
        patientList: patientList
      }
    }
    case GET_UNSELECTED_ALL_PATIENT: {
      let patientList = state.allPatient.map((patient) => patient ? {
        ...patient,
        selected: false
      } : patient);
      return {
        ...state,
        selectedPatients: 0,
        allPatient: patientList,
        patientList: patientList
      }
    }
    case ON_ALL_PATIENT_SELECT: {
      const selectAll = state.selectedPatients < state.patientList.length;
      let selectedPatients = 0;
      let patientList = [];
      if (selectAll) {
        patientList = state.allPatient.map((patient) => patient ? {
          ...patient,
          selected: true
        } : patient);
        selectedPatients = patientList.length;
      } else {
        patientList = state.allPatient.map((patient) => patient ? {
          ...patient,
          selected: true
        } : patient);
        selectedPatients = 0;
      }
      return {
        ...state,
        selectedPatients: selectedPatients,
        allPatient: patientList,
        patientList: patientList
      }
    }
    case UPDATE_SEARCH_USER: {
      return {...state, searchUser: action.payload}
    }
    case HANDLE_REQUEST_CLOSE: {
      return {...state, showMessage: false}
    }
    case ON_TOGGLE_DRAWER: {
      return {...state, drawerState: !state.drawerState}
    }
    case HIDE_PATIENT_LOADER: {
      return {...state, loader: false}
    }

    default:
      return state;
  }
}
