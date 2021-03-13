import React from 'react';

import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { withAuthorization, withEmailVerification } from '../Session';
import SignOutButton from '../SignOut';
import Header from '../AppLayout/Header';
import Footer from '../AppLayout/Footer';
import SideBar from '../AppLayout/SideBar';
import * as ROUTES from '../../constants/routes';
//import { useStyles } from '../AppLayout/styles';

const HomePage = ({authUser}) => { 
  //const classes = useStyles();
  console.log (' in signin::::', authUser);
  //const theme = useTheme();
  return (
<div className="app-container mini-drawer">
      <SideBar />

      <div className="app-main-container">
       
      <div className="app-header">
              <Header />
            </div>
        <main className="app-main-content-wrapper">
          <div className="app-main-content">
           
            <ul>
              <li>
                <Link to={ROUTES.ADMIN}>
                  Admin - This button is in AppLayout
                </Link>
              </li>
              <li>
                <SignOutButton />
              </li>
            </ul>
          </div>
          <Footer />
        </main>
      </div>

      <hr />
    </div>
)};

const condition = authUser => !!authUser;


export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);
