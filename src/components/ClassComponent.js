import React from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import { format } from 'date-fns';

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {patients: [{age: 10, name:'Child'}, {age:20, name: 'Adult'}],
    fetchSignal: false };
  }
  //
  componentDidMount() {
    console.log('Class MOUNTED::',format(new Date(), 'yyyy-MM-dd hh:mm:ss S T'))
    
  }
  componentWillUnmount() {
    console.log('Class comp componentWillUnMount executed-UNMOUNTING::',format(new Date(), 'yyyy-MM-dd hh:mm:ss S T'));
  }
  handleNext = () => {
    this.setState({patients: [{age: 10, name:'Child'}, {age:200, name: 'Adult'}]});
    //this.props.dispatchAction ({name: "Amandeep Punian"});
  };
  render() {
    console.log('Class comp render() executed-FIRSTLINE::',format(new Date(), 'yyyy-MM-dd hh:mm:ss S T'))
    return (
      <div>
          <ul>
          {this.state.patients.map(item => (
            <li key={item.age}>{item.name}</li>
          ))}
        </ul>
        <h1>Welcome to Class Component. Clinic Name:: {this.props.clinicAtStore.name} :: {format(new Date(), 'yyyy-MM-dd hh:mm:ss S T')}</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleNext}
        >
          Test
        </Button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  clinicAtStore: state.settings.clinic,
  activeStep: state.settings.clinic.activeStep,
});
const mapDispatchToProps = dispatch => ({
  dispatchAction: clinic =>
    dispatch({ type: 'CLINIC_SETUP_STEP_COMPLETED', clinic }),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClassComponent);
