
import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import { UserList, UserItem } from '../Users';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import { connect } from 'react-redux';
import { compareAsc, format } from 'date-fns'
const AdminPage = () => {
  console.log('In Admin::props::');
  useEffect(
    () => {
      console.log('Admin comp useEffect executed-MOUNTING::',format(new Date(), 'yyyy-MM-dd hh:mm:ss S T'))
      if (1 === 1) {
        //Do Something
      }

      return () => {
        //Cleanup here - it is like Component Unmount
        console.log('Admin comp useEffect executed-UNMOUNTING::',format(new Date(), 'yyyy-MM-dd hh:mm:ss S T'))
      };
    },
    [], //Pass the state/variables here, useEffect will execute when there is a change in the values of these variables
  );
  return (
  <div>
    <h1>Admin</h1>
    <p>The Admin Page is accessible by every signed in admin user.</p>

    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
  </div>
  );
};

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
)(AdminPage);
