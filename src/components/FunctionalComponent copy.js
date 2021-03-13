import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compareAsc, format } from 'date-fns'
import Button from '@material-ui/core/Button';

const FunctionalComponent = props => {
  console.log('Functional Component Line 1 executed - RENDERED...::',format(new Date(), 'yyyy-MM-dd hh:mm:ss S T'));
  //Use Effect hook
  useEffect(
    () => {
      console.log('Functional comp useEffect executed-MOUNTING::',format(new Date(), 'yyyy-MM-dd hh:mm:ss S T'))
      if (1 === 1) {
        //Do Something
      }

      return () => {
        //Cleanup here - it is like Component Unmount
        console.log('Functional comp useEffect executed-UNMOUNTING::',format(new Date(), 'yyyy-MM-dd hh:mm:ss S T'))
      };
    },
    [], //Pass the state/variables here, useEffect will execute when there is a change in the values of these variables
  );
  const handleNext = () => {
    //props.dispatchAction({ clinic: { name: 'AP' } });
    props.dispatchThemeChangeAction ({themeColor: 'RED'});
  };
  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <h1>Welcome to the functional component {props.clinic.name} {props.themeColor}</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNext}
      >Test </Button>
    </div>
  );
};
const mapStateToProps = state => ({
  clinic: state.settings.clinic,
  themeColor: state.settings.themeColor,
});
const mapDispatchToProps = dispatch => ({
  dispatchAction: myClinicObj => dispatch({ type: 'CLINIC_SETUP_STEP_COMPLETED', myClinicObj }),
  dispatchThemeChangeAction: themeColorObj => dispatch({ type: 'CHANGE_THEME_COLOR', themeColorObj }),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FunctionalComponent);
