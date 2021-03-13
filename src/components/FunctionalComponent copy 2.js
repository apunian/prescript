import React, { useEffect } from 'react';
import { format } from 'date-fns'
import Button from '@material-ui/core/Button';

const FunctionalComponent = () => {
  console.log('Functional Component Line 1 executed...::',format(new Date(), 'yyyy-MM-dd hh:mm:ss S T'));
  //Use Effect hook
  useEffect(
    () => {
      console.log('Functional comp useEffect executed-MOUNTING::',format(new Date(), 'yyyy-MM-dd hh:mm:ss S T'))
      return () => {
        //Cleanup here - it is like Component Unmount
        console.log('Functional comp useEffect executed-UNMOUNTING::',format(new Date(), 'yyyy-MM-dd hh:mm:ss S T'))
      };
    },
    [], //Pass the state/variables here, useEffect will execute when there is a change in the values of these variables
  );
  const handleNext = () => {
    //console.log('Functional Comp handleNext exec::',format(new Date(), 'yyyy-MM-dd hh:mm:ss S T'))
  };
  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <h1>Welcome to the functional component {format(new Date(), 'yyyy-MM-dd hh:mm:ss S T')}</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNext}
      >Test </Button>
    </div>
  );
};

export default FunctionalComponent;
