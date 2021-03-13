import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { ErrorMessage, Formik } from 'formik';
import React from 'react';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import 'yup-phone';
import IntlMessages from '../../utils/IntlMessages';
import CardBox from '../CardBox';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

const MyFormikSchema = Yup.object().shape({
  name: Yup.string().required('Clinic Name is required'),
  addLine1: Yup.string().required('Address is required.'),
  city: Yup.string().required('City is required.'),
  county: Yup.string().required('County is required.'),
  state: Yup.string().required('State is required.'),
  zip: Yup.string().required('Zip is required.'),
  country: Yup.string().required('Address is required.'),
  email: Yup.string()
    .email('Invalid email address format, Email must be a valid one')
    .required('Email is required'),
  phone: Yup.string()
    .phone()
    .required(),
});
/*
(async () => {
  console.log(
    'Phone# is not valid',
    await MyFormikSchema.isValid('+919876543210'),
  ); // → true
})();
*/
var isInvalid = true;

class PatientDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.clinic;
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    //Get the list of patients from Firebase and store it in patients state
   await this.props.firebase
      .patients('-MTaPFmq_Pue6PwknzWD')
      .on('value', snapshot => {
        console.log('PatientsDashboard Fetch on Como Mount::', snapshot.val());

      });
  }
  componentWillUnmount() {}
  handleNext(values) {
    const patients = [
      {id:1, name:'Patient1'},
      {id:2, name:'Patient2'},
      {id:3, name:'Patient3'},
      {id:4, name:'Patient4'},
      {id:5, name:'Patient5'},
    ];
    const clinic = {
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
        patients: patients,
    };
    this.props.firebase.clinics().push({
      clinic,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });
    alert('Time to store the data in the database. Call Firebase Restful API or create your own using node Express and Mongodb')
    //this.props.callBackToParent(updatedClinic);
    //No need to update the local as the component will unmount in anyway as call back function will change
    // the active step
    //this.setState(updatedClinic);
    

  }
  handleBack(values) {
    const a = this.props.activeStep;
    const b = a - 1;
    this.props.calllBackToModifyActiveStep({ activeStep: b });
  }
  handleChange() {
    const a = this.props.activeStep;
    const b = a - 1;
    this.props.calllBackToModifyActiveStep({ activeStep: b });
  }
  render() {
    return (
      <Formik
        initialValues={{
          checked: false,
        }}
        validationSchema={MyFormikSchema}
        onSubmit={(values, {}) => {}}
      >
        {({
          touched,
          errors,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          if (values.checked) {
            isInvalid = false;
          } else {
            isInvalid = true;
          }
          if (errors.checked !== undefined ) {
            isInvalid = false;//IMPORTANT for the last step, Term & Conditions must be agreed before
          }
          return (
            <div>
              <div className="row">
                <CardBox
                  styleName="col-lg-12 "
                  childrenStyle="d-flex justify-content-center"
                  heading={<IntlMessages id="patientDashboard" />}
                  headerOutside
                >
                  
                  
                  
                  
                  <div className="row">
                    <div className="col-lg-12">
                      <Button
                        disabled={this.props.activeStep === 0}
                        onClick={() => this.handleBack(values)}
                        className="mr-2"
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.handleNext(values)}
                        disabled={isInvalid}
                      >
                        {console.log('actstep::length::', this.props.activeStep + '::' + this.props.steps)}
                        {this.props.activeStep ===
                        this.props.steps - 1
                          ? 'Finish'
                          : 'Next'}
                      </Button>
                    </div>
                  </div>
                </CardBox>
                {values.loader && (
                  <div className="loader-view">
                    <CircularProgress />
                  </div>
                )}
              </div>

              {values.error &&
                NotificationManager.error(values.error.message)}
              <NotificationContainer />
              {values.loader && (
                <div className="loader-view">
                  <CircularProgress />
                </div>
              )}
            </div>
          );
        }}
      </Formik>
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
export default compose (
  withFirebase,
  connect(
  mapStateToProps,
  mapDispatchToProps,
),
)(PatientDashboard);
