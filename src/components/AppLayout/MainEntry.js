import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const MainEntry = (props) => {
  
  const {clinic} = useSelector(({settings}) => settings);  
  const {authUser} = useSelector(({session}) => session);  
  useEffect(() => {
    if (clinic.setupDone === true) {
      //Route to the DoctorsDashboard
      props.history.push(ROUTES.DOCTORS_DASHBOARD);
    }
    else {
      props.history.push(ROUTES.DOCTORS_DASHBOARD);
      //props.history.push(ROUTES.CLINIC_SETTINGS);
    }
    
    return () => {
        //Cleanup here - it is like Component Unmount
    };
  },
  [clinic.setupDone], //Pass the state/variables here, useEffect will execute when there is a change in the values of these variables
  );
  console.log('props::', props);
  console.log('authUser::', authUser);
  console.log('Clinic::', clinic);
  return (
    <h1>Main Entry</h1>
  );
};

export default withRouter(MainEntry);
