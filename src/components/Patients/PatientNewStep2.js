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
import IntlMessages from '../../utils/IntlMessages';
import CardBox from '../CardBox';

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

class ClinicSettingsStep2 extends React.Component {
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
        name: values.name,
        email: values.email,
        phone: values.phone,
        addLine1: values.addLine1,
        addLine2: values.addLine2,
        village: values.village,
        city: values.city,
        county: values.county,
        state: values.state,
        zip: values.zip,
        country: values.country,
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
  handleBack(values) {
    const a = this.props.activeStep;
    const b = a - 1;
    this.props.calllBackToModifyActiveStep({ activeStep: b });
  }
  render() {
    return (
      <Formik
        initialValues={{
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
          error: '',
          loader: false,
        }}
        validationSchema={MyFormikSchema}
        onSubmit={(values, {}) => {}}
      >
        {({touched, errors,values,handleChange, handleBlur, handleSubmit,}) => {
          if (
            values.name == '' ||
            values.addLine1 == '' ||
            values.city == '' ||
            values.county == '' ||
            values.state == '' ||
            values.zip == '' ||
            values.country == '' ||
            values.email == '' ||
            values.phone == ''
          ) {
            isInvalid = true;
          } else {
            isInvalid = false;
          }
          if (
            errors.name !== undefined ||
            errors.addLine1 !== undefined ||
            errors.city !== undefined ||
            errors.county !== undefined ||
            errors.state !== undefined ||
            errors.zip !== undefined ||
            errors.country !== undefined ||
            errors.email !== undefined ||
            errors.phone !== undefined
          ) {
            isInvalid = true;
          }
          return (
            <div>
              <div className="row">
                <CardBox
                  styleName="col-xl-12 col-lg-12 col-md-12 col-12"
                  childrenStyle="d-flex justify-content-center"
                  heading={<IntlMessages id="clinicInfo" />}
                  headerOutside
                >
                  <form className="row" noValidate autoComplete="off">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                      <TextField
                        name="name"
                        label={<IntlMessages id="name" />}
                        placeholder="Clinic Name"
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
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                      <TextField
                        name="email"
                        label={<IntlMessages id="clinicEmail" />}
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
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                      <TextField
                        name="phone"
                        label={<IntlMessages id="clinicPhone" />}
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
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                      <TextField
                        name="addLine1"
                        label={<IntlMessages id="addLine1" />}
                        placeholder="Address Line 1"
                        defaultValue={values.addLine1}
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        type="text"
                        className={`form-control ${
                          touched.addLine1 && errors.addLine1
                            ? 'is-invalid'
                            : ''
                        } mt-0 mb-3`}
                      />
                      <ErrorMessage
                        component="div"
                        name="addLine1"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                      <TextField
                        name="addLine2"
                        label={<IntlMessages id="addLine2" />}
                        placeholder="Address Line 2"
                        defaultValue={values.addLine2}
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        type="text"
                        className={`form-control ${
                          touched.addLine2 && errors.addLine2
                            ? 'is-invalid'
                            : ''
                        } mt-0 mb-3`}
                      />
                      <ErrorMessage
                        component="div"
                        name="addLine2"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                      <TextField
                        name="village"
                        label={<IntlMessages id="village" />}
                        placeholder="Village/Area"
                        defaultValue={values.village}
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        type="text"
                        className={`form-control ${
                          touched.village && errors.village
                            ? 'is-invalid'
                            : ''
                        } mt-0 mb-3`}
                      />
                      <ErrorMessage
                        component="div"
                        name="village"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                      <TextField
                        name="city"
                        label={<IntlMessages id="city" />}
                        placeholder="City"
                        defaultValue={values.city}
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        type="text"
                        className={`form-control ${
                          touched.city && errors.city
                            ? 'is-invalid'
                            : ''
                        } mt-0 mb-3`}
                      />
                      <ErrorMessage
                        component="div"
                        name="city"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                      <TextField
                        name="county"
                        label={<IntlMessages id="county" />}
                        placeholder="County"
                        defaultValue={values.county}
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        type="text"
                        className={`form-control ${
                          touched.county && errors.county
                            ? 'is-invalid'
                            : ''
                        } mt-0 mb-3`}
                      />
                      <ErrorMessage
                        component="div"
                        name="county"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                      <TextField
                        name="state"
                        label={<IntlMessages id="state" />}
                        placeholder="State"
                        defaultValue={values.state}
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        type="text"
                        className={`form-control ${
                          touched.state && errors.state
                            ? 'is-invalid'
                            : ''
                        } mt-0 mb-3`}
                      />
                      <ErrorMessage
                        component="div"
                        name="state"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                      <TextField
                        name="zip"
                        label={<IntlMessages id="zip" />}
                        placeholder="Zip Code"
                        defaultValue={values.zip}
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        type="text"
                        className={`form-control ${
                          touched.zip && errors.zip
                            ? 'is-invalid'
                            : ''
                        } mt-0 mb-3`}
                      />
                      <ErrorMessage
                        component="div"
                        name="zip"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                      <TextField
                        name="country"
                        label={<IntlMessages id="country" />}
                        placeholder="Country"
                        defaultValue={values.country}
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        type="text"
                        className={`form-control ${
                          touched.country && errors.country
                            ? 'is-invalid'
                            : ''
                        } mt-0 mb-3`}
                      />
                      <ErrorMessage
                        component="div"
                        name="country"
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
)(ClinicSettingsStep2);
