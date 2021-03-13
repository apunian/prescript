import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compareAsc, format } from 'date-fns'
import Button from '@material-ui/core/Button';

const FunctionalComponent = props => {
  const [testState, setTestState] = useState();
  console.log('Functional RENDERED::',format(new Date(), 'yyyy-MM-dd hh:mm:ss S T'));
  //Use Effect hook
  useEffect(
    () => {
      
      if (props.themeColor) {
        //Do Something like set the local state
        console.log('Functional MOUNTED::',props.themeColor+format(new Date(), 'yyyy-MM-dd hh:mm:ss S T'))
        //setTestState('WOW IT WORKED');
      };

      return () => {
        //Cleanup here - it is like Component Unmount
        console.log('Functional UNMOUNTED::',format(new Date(), 'yyyy-MM-dd hh:mm:ss S T'))
      };
    },
    [], //Pass the state/variables here, useEffect will execute when there is a change in the values of these variables
  );
  const handleNext = () => {
    //props.dispatchAction({ clinic: { name: 'AP' } });
    props.dispatchThemeChangeAction ({themeColor: 'RED'});
    //setTestState('My Test State Value');
  };
  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <h1>Welcome to the functional component {testState} {props.clinic.name} {props.themeColor} {format(new Date(), 'yyyy-MM-dd hh:mm:ss S T')}</h1>
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
