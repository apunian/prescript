import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import IntlMessages from '../../utils/IntlMessages';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import CardBox from '../CardBox';
import BasicCard from '../BasicCard';
import FooterLanding from '../AppLayout/FooterLanding';
import ContainerHeader from '../AppLayout/ContainerHeader';
import Header from '../AppLayout/Header';
import { withAuthentication } from '../Session';
const Landing = props => {
  //const authUser = props.authUser;
  const { authUser } = useSelector(
    ({ sessionState }) => sessionState,
  );
   console.log('Landing::authUser::', authUser);
  //
  let routeToComp = '';
    if (authUser) {
      routeToComp = ROUTES.MAIN_ENTRY;
    } else {
      routeToComp = ROUTES.SIGN_IN;
    }
    console.log('routeToComp::', routeToComp)
  useEffect(() => {
    //EXECUTES WHEN ANY OF THE VALUES CHANGES IN authUser
    if (authUser) {
      //console.log('Landing to Main Entry now ..')
      props.history.push(ROUTES.MAIN_ENTRY);
    }

    return () => {
      //Cleanup here - it is like Component Unmount
    };
  }, []);
  console.log('Landing to Main Entry now ..')
  return (
    <div className="app-main-content app-wrapper">
      <div className="animated slideInUpTiny animation-duration-3">
        <div className="app-header">
          <Header />
        </div>
        <ContainerHeader
          match={props.match}
          title={<IntlMessages id="welcome-1" />}
        />
       
          <div stylename="row align-items-center">
            <CardBox
              stylename="col-md-12"
              heading={<IntlMessages id="clinic-landing-heading" />}
            >
              <div >
                <div className="row">
                  <div className="col-md-6">
                    <BasicCard
                      props={props}
                      //image="https://via.placeholder.com/500x330"
                      image={require('../../assets/images/clinic-landing-1.jpg')}
                      title="Clinics"
                      subTitle="Basic or Advanced"
                      description="Designed for Clinic Owner Doctors, Clinic Staff - Patients, Clinic Services, Doctors, Nurses, Lab Technicians, Pharmacists and Clinic Office Management Staff"
                      btnText="Go Doctors Portal"
                      routeToComp={routeToComp}
                    />
                  </div>
                  <div className="col-md-6">
                    <BasicCard
                      //image="https://via.placeholder.com/500x330"
                      image={require('../../assets/images/hospital.jpeg')}
                      title="Hospitals"
                      subTitle="With Full Features"
                      description="A Comprehensive Hospital Management system to manage all aspects of any scale hospital including services, Patients, Doctors, and Hospital Management Staff"
                      btnText="Go Hospitals Portal"
                    />
                  </div>
                </div>
              </div>
            </CardBox>
            <div className="col-md-12">
              <FooterLanding />
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default withRouter(withFirebase(withAuthentication(Landing)));

//authUser ?  <h1>Landing Page</h1> : <Redirect to='/signin' />
