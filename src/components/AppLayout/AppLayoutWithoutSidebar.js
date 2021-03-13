import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { format } from 'date-fns';
import { withAuthorization, withEmailVerification } from '../Session';
import Header from './Header';
import FooterLanding from './FooterLanding';

const AppLayoutWithoutSidebar = props => {
  useEffect(
    () => {
      //console.log('AppLayout comp useEffect executed-MOUNTING::',format(new Date(), 'yyyy-MM-dd hh:mm:ss S T'))
      return () => {
        //Cleanup here - it is like Component Unmount
        //console.log('AppLayout comp useEffect executed-UNMOUNTING::',format(new Date(), 'yyyy-MM-dd hh:mm:ss S T'))
      };
    },
    [], //Pass the state/variables here, useEffect will execute when there is a change in the values of these variables
  );
  console.log('AppLayout comp LINE1 Rendering::',format(new Date(), 'yyyy-MM-dd hh:mm:ss S T'))
  return (
    <div className="app-main-content app-wrapper">
      <div className="animated slideInUpTiny animation-duration-3">
        <div className="app-header">
          <Header />
        </div>
        {props.children}
      </div>
      <hr />
      <div stylename="row align-items-center">
        <div className="col-md-12">
          <FooterLanding />
        </div>
      </div>
    </div>
  );
};

const condition = authUser => !!authUser;

export default compose(
  withRouter,
  withEmailVerification,
  withAuthorization(condition),
)(AppLayoutWithoutSidebar);
