import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar-edit';
import { connect } from 'react-redux';
import IntlMessages from '../../utils/IntlMessages';
import CardBox from './../CardBox';

var isInvalid = false; //IT HAS TO BE true for PRODUCTION
class ClinicSettingsStep1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.clinic;
    //console.log('state::', this.state);
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }
  //
  componentDidMount() {}
  componentWillUnmount() {}
  handleNext() {
    const updatedClinic = {
      clinic: {
        id: this.state.clinic.id,
        image: this.state.clinic.image,
        name: this.state.clinic.name,
        email: this.state.clinic.email,
        phone: this.state.clinic.phone,
        addLine1: this.state.clinic.addLine1,
        addLine2: this.state.clinic.addLine2,
        village: this.state.clinic.village,
        city: this.state.clinic.city,
        county: this.state.clinic.county,
        state: this.state.clinic.state,
        zip: this.state.clinic.zip,
        country: this.state.clinic.country,
        setupDone: this.state.clinic.setupDone,
        sourceComponent: '',
        ownerPhysician: this.state.clinic.ownerPhysician,
        lab: this.state.clinic.lab,
        pharmacy: this.state.clinic.pharmacy,
        diagnosysCenter: this.state.clinic.diagnosysCenter,
      },
    };
    this.props.callBackToParent(updatedClinic);
    //No need to update the local as the component will unmount in anyway as call back function will change
    // the active step
    //this.setState(updatedClinic);
  }
  //In this component, the back btn will be always disabled
  handleBack() {
    const a = this.props.activeStep;
    const b = a - 1;
    this.props.calllBackToModifyActiveStep({ activeStep: b });
  }
  //
  onClose() {
    const updatedClinic = {
      clinic: {
        id: this.state.clinic.id,
        image: null,
        name: this.state.clinic.name,
        email: this.state.clinic.email,
        phone: this.state.clinic.phone,
        addLine1: this.state.clinic.addLine1,
        addLine2: this.state.clinic.addLine2,
        village: this.state.clinic.village,
        city: this.state.clinic.city,
        county: this.state.clinic.county,
        state: this.state.clinic.state,
        zip: this.state.clinic.zip,
        country: this.state.clinic.country,
        setupDone: this.state.clinic.setupDone,
        sourceComponent: '',
        ownerPhysician: this.state.clinic.ownerPhysician,
        lab: this.state.clinic.lab,
        pharmacy: this.state.clinic.pharmacy,
        diagnosysCenter: this.state.clinic.diagnosysCenter,
      },
    };
    this.setState(updatedClinic);
  }
  onCrop(preview) {
    const updatedClinic = {
      clinic: {
        id: this.state.clinic.id,
        image: preview,
        name: this.state.clinic.name,
        email: this.state.clinic.email,
        phone: this.state.clinic.phone,
        addLine1: this.state.clinic.addLine1,
        addLine2: this.state.clinic.addLine2,
        village: this.state.clinic.village,
        city: this.state.clinic.city,
        county: this.state.clinic.county,
        state: this.state.clinic.state,
        zip: this.state.clinic.zip,
        country: this.state.clinic.country,
        setupDone: this.state.clinic.setupDone,
        sourceComponent: '',
        ownerPhysician: this.state.clinic.ownerPhysician,
        lab: this.state.clinic.lab,
        pharmacy: this.state.clinic.pharmacy,
        diagnosysCenter: this.state.clinic.diagnosysCenter,
      },
    };
    isInvalid = false;
    this.setState(updatedClinic);
  }
  //REF ONLY
  /*async componentDidMount() {
    const racesResponse = await fetch(RACES).then(res => res.json())
    const classesResponse = await fetch(CLASSES).then(res =>   
    res.json())
  const races = racesResponse.results
  const classes = classesResponse.results
  this.setState({ races, classes })
  */

  render() {
    const styles = {
      color: 'blue',
      height: '500px',
    };
    return (
      <div >
          <form className="row" noValidate autoComplete="off">
            
              {this.state.clinic.image?
              <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                  <img
                    class="rounded float-left"
                    src={this.state.clinic.image}
                    width={133}
                    height={133}
                  />
              </div>:
              null}
            
              <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                <Avatar
                  width={227}
                  height={227}
                  onCrop={this.onCrop}
                  onClose={this.onClose}
                  className="ml-3 mt-3"
                  //src={require('../assets/images/pentagon.png')}
                  //src={this.state.clinic.image}
                />
              </div>
            

          </form>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <Button
              disabled={this.props.activeStep === 0}
              onClick={this.handleBack}
              className="mr-2 mt-3"
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleNext()}
              disabled={isInvalid}
              className="mr-2 mt-3"
            >
              {this.props.activeStep === this.props.steps.length - 1
                ? 'Finish'
                : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  clinicAtStore: state.settings.clinic,
});
const mapDispatchToProps = dispatch => ({
  dispatchAction: clinic =>
    dispatch({ type: 'CLINIC_SETUP_STEP_COMPLETED', clinic }),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClinicSettingsStep1);
