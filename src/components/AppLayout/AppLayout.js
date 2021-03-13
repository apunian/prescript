import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import {
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
} from '../../constants/ActionTypes';
import { format } from 'date-fns';
import { withAuthorization, withEmailVerification } from '../Session';
import Header from './Header';
import Footer from '../AppLayout/Footer';
import SideBar from '../AppLayout/SideBar';
import MyRoutes from '../MyRoutes';
import ContainerHeader from './ContainerHeader';
import IntlMessages from '../../utils/IntlMessages';
import FooterLanding from './FooterLanding';
import CardBox from '../CardBox';

const AppLayout = props => {
  const { drawerType, width, height, navigationStyle } = useSelector(
    ({ settings }) => settings,
  );
  let drawerStyle = drawerType.includes(FIXED_DRAWER)
    ? 'fixed-drawer'
    : drawerType.includes(COLLAPSED_DRAWER)
    ? 'collapsible-drawer'
    : 'mini-drawer';
    //drawerStyle = 'mini-drawer';
  //FIXED_DRAWER,window.innerWidth,VERTICAL_NAVIGATION
  //console.log('AppLayout RENDERED::',format(new Date(), 'yyyy-MM-dd hh:mm:ss S T'));
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  useEffect(
    () => {
      
      window.addEventListener('resize', () => {
        setWindowHeight(window.innerHeight);
        console.log('wow')
      });
      //console.log('AppLayout MOUNTED::',format(new Date(), 'yyyy-MM-dd hh:mm:ss S T'));
      return () => {
        //Cleanup here - it is like Component Unmount
        //console.log('AppLayout UNMOUNTED::',format(new Date(), 'yyyy-MM-dd hh:mm:ss S T'))
      };
    },
    [], //Pass the state/variables here, useEffect will execute when there is a change in the values of these variables
  );

  return (

<div className={`app-container ${drawerStyle}`}>
        

        <SideBar {...props}/>
        <div className="app-main-container">
          <div className="app-header">
            <Header/>
          </div>

          <main className="app-main-content-wrapper">
            <div className="app-main-content" style={{maxHeight:`${windowHeight-133}px`}}>
              {props.children}
            </div>
            <div style={{position: 'absolute', bottom: 0, width: `${window.innerWidth-240}px`}}>
              <Footer/>
            </div>
          </main>
        </div>
      </div>
    


/*
    <div className={`app-container ${drawerStyle}`}>
      <SideBar {...props} />
      <div className="app-main-container">
        <div className="app-header">
          <Header />
        </div>

        <main className="app-main-content-wrapper">
          <div className="app-main-content app-wrapper">
            {props.children}
          </div>
        </main>
      </div>
      <hr />
    </div>
*/
  );
};

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AppLayout);
