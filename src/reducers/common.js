import {TOGGLE_COLLAPSED_NAV,COLLABSABLE_NAV_ITEM_CLICKED } from '../constants/ActionTypes';

const INITIAL_STATE = {
	navCollapsed: false,
  };

const changeNavCollapsed = (state, action) => ({
	...state,
	navCollapsed: action.navCollapsed,
});  
function commonReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case '@@router/LOCATION_CHANGE':
			return {
				...state,
				navCollapsed: false,
			};
		case TOGGLE_COLLAPSED_NAV:
			return {
				...state,
				navCollapsed: !state.navCollapsed
			};
		
		case COLLABSABLE_NAV_ITEM_CLICKED:
			//console.log('REDUCER::common:COLLAPSABLE_NAV_ITEM_CLICKED::', action);
			return changeNavCollapsed (state, action);
		default:
			return state;
	}
  }
  
  export default commonReducer;