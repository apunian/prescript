import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import UserInfo from './UserInfo';
import {
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
} from '../../constants/ActionTypes';
import SideBarContent from './SideBarContent';
import SideBarContentDoctors from './SideBarContentDoctors';
import * as ROLES from '../../constants/roles';
import {
  toggleCollapsedNav,
  updateWindowWidth,
} from './../../actions/Setting';

//const drawerWidth = 240;

const SideBar = props => {
  console.log('SideBar::props::', props.authUser.roles[ROLES.DOCTOR_OWNER]);
  const dispatch = useDispatch();
  const authUser = props.authUser;
  const { drawerType, width, navigationStyle } = useSelector(
    ({ settings }) => settings,
  ); //FIXED_DRAWER,window.innerWidth,VERTICAL_NAVIGATION
  const {  navCollapsed } = useSelector(({common}) => common);
  useEffect(() => {
    /*window.addEventListener('resize', () => {
      dispatch(updateWindowWidth(window.innerWidth))
    });*/
  }, []);

  const onToggleCollapsedNav = e => {
    dispatch(toggleCollapsedNav());
  };

  let drawerStyle = drawerType.includes(FIXED_DRAWER)
    ? 'd-xl-flex'
    : drawerType.includes(COLLAPSED_DRAWER)
    ? ''
    : 'd-flex';
  let type = 'permanent';
  if (
    drawerType.includes(COLLAPSED_DRAWER) ||
    (drawerType.includes(FIXED_DRAWER) && width < 1200)
  ) {
    type = 'temporary';
  }

  if (navigationStyle === HORIZONTAL_NAVIGATION) {
    drawerStyle = '';
    type = 'temporary';
  }
  return (
    <div className={`app-sidebar d-none ${drawerStyle}`}>
      <Drawer
        className="app-sidebar-content"
        variant={type}
        open={type.includes('temporary') ? navCollapsed : true}
        onClose={onToggleCollapsedNav}
        classes={{
          paper: 'side-nav',
        }}
      > 
        <UserInfo {...props} />
        <SideBarContentDoctors {...props} />
        {/*
        {authUser.roles[ROLES.DOCTOR_OWNER] ? (
          <SideBarContentDoctors />
        ) : (
          <SideBarContent />
        )}*/}
      </Drawer>
    </div>
  );
};
export default withRouter(SideBar);
