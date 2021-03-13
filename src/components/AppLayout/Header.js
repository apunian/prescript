import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
} from '../../constants/ActionTypes';

const Header = () => {
  const { drawerType } = useSelector(
    ({ settings }) => settings,
  );

  return (
    <AppBar className="app-main-header">
      <Toolbar className="app-toolbar" disableGutters={false}>
        {/*
        <IconButton
          className={`jr-menu-icon mr-3 ${drawerStyle}`}
          aria-label="Menu"
        >
          <span className="menu-icon" />
        </IconButton>
        */}
        <Link className="app-logo mr-2 d-none d-sm-block" to="/">
          <img
            src={require('../../assets/images/dashboard/project-icon.png')}
            alt="presCRIPT"
            title="presCRIPT"
          />
        </Link>
        <div className="quick-menu">
        PresCRIPT - Doctors Favorite EMR Portal
          </div>
        <div className="ellipse-shape" />
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);
