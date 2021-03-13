import { DARK_INDIGO } from '../constants/ThemeColors';
import {
  CHANGE_DIRECTION,
  CHANGE_NAVIGATION_STYLE,
  DARK_THEME,
  DRAWER_TYPE,
  FIXED_DRAWER,
  HORIZONTAL_MENU_POSITION,
  INSIDE_THE_HEADER,
  SWITCH_LANGUAGE,
  THEME_COLOR,
  VERTICAL_NAVIGATION,
  WINDOW_WIDTH,
} from '../constants/ActionTypes';

const rltLocale = ['ar'];
const initialSettings = {
  drawerType: FIXED_DRAWER,
  themeColor: DARK_INDIGO,
  darkTheme: false,
  width: window.innerWidth,
  height: window.innerHeight,
  isDirectionRTL: false,
  navigationStyle: VERTICAL_NAVIGATION,
  horizontalNavPosition: INSIDE_THE_HEADER,
  locale: {
    languageId: 'english',
    locale: 'en',
    name: 'English',
    icon: 'us',
  },
  clinic: {
    id: '',
    image: '',
    name: 'AP Clinic',
    email: 'amandeep.punian@gmail.com',
    phone: '9546044098',
    addLine1: '5 Ocean Drive',
    addLine2: 'Suite 1300',
    village: 'Miami Beach',
    city: 'Miami Beach',
    county: 'Miami-Dade',
    state: 'Florida',
    zip: '33027',
    country: 'USA',
    setupDone: false,
    sourceComponent: '',
    ownerPhysician: {
      id: '',
      image: '',
      name: 'Dr. Anmol Bains',
      suffix: 'MD',
      speciality: 'General Practicioner',
      email: 'amandeep.punian@gmail.com',
      phone: '9546044098',
      pager: '9546044099',
      license: 'MD-License-FL-008ZG67A2',
      dob: '09-26-1971',
    },
    lab: {
      id: '',
      name: 'AP Labs Corp.',
      email: 'amandeep.punian@gmail.com',
      phone: '9546044098',
      fax: '9546044099',
      contactName : 'Veronica Gonzalez',
    },
    pharmacy: {
      id: '',
      name: 'AP Pharmacy',
      email: 'amandeep.punian@gmail.com',
      phone: '9546044098',
      fax: '9546044099',
      contactName : 'Veronica Gonzalez',
    },
    diagnosysCenter: {
      id: '',
      name: 'AP Diagnostic Center.',
      email: 'amandeep.punian@gmail.com',
      phone: '9546044098',
      fax: '9546044099',
      contactName : 'Jack Punian',
    },
  },
};

const updateState = (state, action) => ({
  ...state,
  clinic: { name: action.name },
});
const updateThemeColor = (state, action) => ({
  ...state,
  themeColor: action.themeColorObj.themeColor,
});

const settings = (state = initialSettings, action) => {
  switch (action.type) {
    case 'CLINIC_SETUP_STEP_COMPLETED': {
      return updateState(state, action);
    }
    case 'CHANGE_THEME_COLOR': {
      return updateThemeColor(state, action);
    }

    case DRAWER_TYPE:
      return {
        ...state,
        drawerType: action.drawerType,
      };
    case WINDOW_WIDTH:
      //console.log('Dispatch is in progress...In Setting reducer...::');
      return {
        ...state,
        width: action.width,
      };
    case THEME_COLOR:
      return {
        ...state,
        darkTheme: false,
        themeColor: action.color,
      };
    case DARK_THEME:
      return {
        ...state,
        darkTheme: !state.darkTheme,
      };
    case SWITCH_LANGUAGE:
      return {
        ...state,
        locale: action.payload,
        isDirectionRTL: rltLocale.includes(action.payload.locale),
      };
    case CHANGE_DIRECTION:
      return {
        ...state,
        isDirectionRTL: !state.isDirectionRTL,
      };

    case CHANGE_NAVIGATION_STYLE:
      return {
        ...state,
        navigationStyle: action.payload,
      };

    case HORIZONTAL_MENU_POSITION:
      return {
        ...state,
        horizontalNavPosition: action.payload,
      };

    default:
      return state;
  }
};

export default settings;
