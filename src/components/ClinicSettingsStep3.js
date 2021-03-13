import Button from '@material-ui/core/Button';
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
import IntlMessages from '../utils/IntlMessages';
import CardBox from './CardBox';

const MyFormikSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  suffix: Yup.string().required('Required.'),
  speciality: Yup.string().required('Required.'),
  email: Yup.string()
    .email('Invalid email address format, Email must be a valid one')
    .required('Email is required'),
  phone: Yup.string()
    .phone()
    .required(),
  pager: Yup.string()
    .phone()
    .required(),
  license: Yup.string().required('Required.'),
  dob: Yup.string().required('Required.'),
  
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

class ClinicSettingsStep3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.clinic;
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  componentDidMount() {}
  componentWillUnmount() {}
  handleNext(values) {
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
        ownerPhysician: {
          id: this.state.clinic.ownerPhysician.id,
          image: this.state.clinic.ownerPhysician.image,
          name: values.name,
          suffix: values.suffix,
          speciality: values.speciality,
          email: values.email,
          phone: values.phone,
          pager: values.pager,
          license: values.license,
          dob: values.dob,
        },
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
  async handleBack(values) {
    const a = this.props.activeStep;
    const b = a - 1;
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
        ownerPhysician: {
          id: this.state.clinic.ownerPhysician.id,
          image: this.state.clinic.ownerPhysician.image,
          name: values.name,
          suffix: values.suffix,
          speciality: values.speciality,
          email: values.email,
          phone: values.phone,
          pager: values.pager,
          license: values.license,
          dob: values.dob,
        },
        lab: this.state.clinic.lab,
        pharmacy: this.state.clinic.pharmacy,
        diagnosysCenter: this.state.clinic.diagnosysCenter,
      },
    };
    try {
      await this.props.callBackToParent(updatedClinic);
      await this.props.calllBackToModifyActiveStep({ activeStep: b });
    } catch (error) {
      console.log('Error in handle back in ClinicSettingsStep3::', error);
    }
  }
  render() {
    return (
      <Formik
        initialValues={{
          image: this.state.clinic.ownerPhysician.image,
          name: this.state.clinic.ownerPhysician.name,
          suffix: this.state.clinic.ownerPhysician.suffix,
          speciality: this.state.clinic.ownerPhysician.speciality,
          email: this.state.clinic.ownerPhysician.email,
          phone: this.state.clinic.ownerPhysician.phone,
          pager: this.state.clinic.ownerPhysician.pager,
          license: this.state.clinic.ownerPhysician.license,
          dob: this.state.clinic.ownerPhysician.dob,
          error: '',
          loader: false,
        }}
        validationSchema={MyFormikSchema}
        onSubmit={(values, {}) => {}}
      >
        {({touched, errors,values,handleChange, handleBlur, handleSubmit,}) => {
          if (
            values.name == '' ||
            values.suffix == '' ||
            values.speciality == '' ||
            values.email == '' ||
            values.phone == '' ||
            values.pager == '' ||
            values.license == '' ||
            values.dob == ''
          ) {
            isInvalid = true;
          } else {
            isInvalid = false;
          }
          if (
            errors.name !== undefined ||
            errors.suffix !== undefined ||
            errors.speciality !== undefined ||
            errors.email !== undefined ||
            errors.phone !== undefined ||
            errors.pager !== undefined ||
            errors.license !== undefined ||
            errors.dob !== undefined 
          ) {
            isInvalid = true;
          }
          return (
            <div>
              <div className="row">
                <CardBox
                  styleName="col-lg-12 "
                  childrenStyle="d-flex justify-content-center"
                  heading={<IntlMessages id="clinicPhysicianSetup" />}
                  headerOutside
                >
                  <form className="row" noValidate autoComplete="off">
                    <div className="col-md-6 col-12">
                      <TextField
                        name="name"
                        label={<IntlMessages id="name" />}
                        placeholder="Doctor Name"
                        defaultValue={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        type="text"
                        //className="mt-1 my-sm-3"
                        className={`form-control ${
                          touched.name && errors.name
                            ? 'is-invalid'
                            : ''
                        } mt-0 mb-3`}
                      />
                      <ErrorMessage
                        component="div"
                        name="name"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="col-md-6 col-12">
                      <TextField
                        name="suffix"
                        label={<IntlMessages id="suffix" />}
                        placeholder="City"
                        defaultValue={values.suffix}
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        type="text"
                        className={`form-control ${
                          touched.suffix && errors.suffix
                            ? 'is-invalid'
                            : ''
                        } mt-0 mb-3`}
                      />
                      <ErrorMessage
                        component="div"
                        name="suffix"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="col-md-6 col-12">
                      <TextField
                        name="speciality"
                        label={<IntlMessages id="speciality" />}
                        placeholder="County"
                        defaultValue={values.speciality}
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        type="text"
                        className={`form-control ${
                          touched.speciality && errors.speciality
                            ? 'is-invalid'
                            : ''
                        } mt-0 mb-3`}
                      />
                      <ErrorMessage
                        component="div"
                        name="speciality"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="col-md-6 col-12">
                      <TextField
                        name="email"
                        label={<IntlMessages id="email" />}
                        placeholder="Clinic Email"
                        defaultValue={values.email}
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        type="text"
                        //className="mt-1 my-sm-3"
                        className={`form-control ${
                          touched.email && errors.email
                            ? 'is-invalid'
                            : ''
                        } mt-0 mb-3`}
                      />
                      <ErrorMessage
                        component="div"
                        name="email"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="col-md-6 col-12">
                      <TextField
                        name="phone"
                        label={<IntlMessages id="phone" />}
                        placeholder="Clinic Phone"
                        defaultValue={values.phone}
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        type="text"
                        //className="mt-1 my-sm-3"
                        className={`form-control ${
                          touched.phone && errors.phone
                            ? 'is-invalid'
                            : ''
                        } mt-0 mb-3`}
                      />
                      <ErrorMessage
                        component="div"
                        name="phone"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="col-md-6 col-12">
                      <TextField
                        name="pager"
                        label={<IntlMessages id="pager" />}
                        placeholder="Pager"
                        defaultValue={values.pager}
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        type="text"
                        className={`form-control ${
                          touched.pager && errors.pager
                            ? 'is-invalid'
                            : ''
                        } mt-0 mb-3`}
                      />
                      <ErrorMessage
                        component="div"
                        name="pager"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="col-md-6 col-12">
                      <TextField
                        name="license"
                        label={<IntlMessages id="license" />}
                        placeholder="License#"
                        defaultValue={values.license}
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        type="text"
                        className={`form-control ${
                          touched.license && errors.license
                            ? 'is-invalid'
                            : ''
                        } mt-0 mb-3`}
                      />
                      <ErrorMessage
                        component="div"
                        name="license"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="col-md-6 col-12">
                      <TextField
                        name="dob"
                        label={<IntlMessages id="dob" />}
                        placeholder="Date of Birth"
                        defaultValue={values.dob}
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        type="text"
                        className={`form-control ${
                          touched.dob && errors.dob
                            ? 'is-invalid'
                            : ''
                        } mt-0 mb-3`}
                      />
                      <ErrorMessage
                        component="div"
                        name="dob"
                        className="invalid-feedback"
                      />
                    </div>
                    <NotificationContainer />
                  </form>
                   </CardBox>
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
                        {this.props.activeStep ===
                        this.props.steps.length - 1
                          ? 'Finish'
                          : 'Next'}
                      </Button>
                    </div>
                  </div>
               
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClinicSettingsStep3);
