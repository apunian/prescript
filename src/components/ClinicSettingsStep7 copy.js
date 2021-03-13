import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar-edit';
import { connect } from 'react-redux';
import IntlMessages from '../utils/IntlMessages';
import ContainerHeader from './AppLayout/ContainerHeader';
import CardBox from './CardBox';
import Checkbox from '@material-ui/core/Checkbox';

const INITIAL_STATE = {
  clinic: {
    image: '',
    imageSource: '',
    name: '',
    village: '',
    city: '',
    county: '',
    state: '',
    zip: '',
    country: '',
    preview: null,
    setupDone: false,
    activeStep: 0,
  },
};

class ClinicSettingsStep7 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.onChange = this.onChange.bind(this);
  }
  //
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  //
  //
  onChange = event => {
    this.setState({
      clinic: { [event.target.name]: event.target.value, error: '' },
    });
  };
  render() {
    return (
      <div className="tab-pane" id="tab2-4">
        <h3 className="title text-primary">Terms and Conditions</h3>
        <p>
          <strong>Lorem</strong> Ipsum is simply dummy text of the
          printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five
          centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
        <div className="d-flex align-items-center">
          <Checkbox color="primary" />{' '}
          <span>I agree with the Terms and Conditions.</span>
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
)(ClinicSettingsStep7);
