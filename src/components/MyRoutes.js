import React from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import ClassComponent from './ClassComponent';
import AdminPage from './Admin';
import AccountPage from './Account';
import * as ROUTES from "../constants/routes";
import FunctionalComponent from './FunctionalComponent';
import { withRouter } from "react-router";
import MainEntry from './AppLayout/MainEntry';
import ClinicSettings from './ClinicSettings';
import { roundToNearestMinutes } from 'date-fns';
import Landing from './Landing';
import PasswordForgetPage from './PasswordForget';
import PasswordChange from './PasswordChange';
import CRM from './CRM';
import Test from './Test';
import {PatientsList, Prescribe, Appointments, Exam, OrderLabs, OrderImageServices } from './Patients';
import ClinicStaff from './ClinicStaff';
import ClinicBldgMgmt from './ClinicBldgMgmt';
import Messages from './Messages/Messages';
import PatientDashboard from './Patients/PatientDashboard';
import PatientMain from './Patients/PatientMain';

const MyRoutes = ({match}) => (
  <div className="app-wrapper">
    <Switch>
      <Route path={ROUTES.MAIN_ENTRY} component={MainEntry}/>
      <Route path={ROUTES.ADMIN} component={AdminPage}/>
      <Route path={ROUTES.ACCOUNT} component={AccountPage}/>   
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}/>
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordChange}/>
      <Route path={ROUTES.DOCTORS_DASHBOARD} component={CRM}/>
      <Route path={ROUTES.APPOINTMENTS} component={Appointments}/>
      <Route path={ROUTES.EXAM} component={Exam}/>
      <Route path={ROUTES.PRESCRIBE} component={Prescribe}/>
      <Route path={ROUTES.ORDERLABS} component={OrderLabs}/>
      <Route path={ROUTES.ORDERIMAGESERVICES} component={OrderImageServices}/>
      <Route path={ROUTES.PATIENTSLIST} component={PatientsList}/>
      <Route path={ROUTES.CLINICSTAFF} component={ClinicStaff}/>
      <Route path={ROUTES.CLINICBLDGMGMT} component={ClinicBldgMgmt}/>
      <Route path={ROUTES.MESSAGES} component={Messages}/>
      <Route path={ROUTES.PATIENT_DASHBOARD} component={PatientDashboard}/>
      <Route path={ROUTES.PATIENT_MAIN} component={PatientMain}/>

      <Route  path={'/function'} component={FunctionalComponent} /> 
      <Route  path={'/class'} 
      render={(props) => <Wrap><ClassComponent {...props}/></Wrap>}/>
       <Route path={ROUTES.TEST} component={Test}/>
    </Switch>
    </div>
);
const Wrap = (props) => props.children; 
export default withRouter(MyRoutes);
