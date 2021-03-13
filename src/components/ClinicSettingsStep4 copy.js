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

class ClinicSettingsStep4 extends React.Component {
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
          name: this.state.clinic.lab.name,
          contactName: this.state.clinic.lab.contactName,
          email: this.state.clinic.lab.email,
          phone: this.state.clinic.lab.phone,
          fax: this.state.clinic.lab.fax,
          error: '',
          loader: false,
        }}
        validationSchema={MyFormikSchema}
        onSubmit={(values, {}) => {}}
      >
        {({touched, errors,values,handleChange, handleBlur, handleSubmit,}) => {
          if (
            values.name == '' ||
            values.contactName == '' ||
            values.email == '' ||
            values.phone == '' ||
            values.fax == ''
          ) {
            isInvalid = false;
          } else {
            isInvalid = false;
          }
          if (
            errors.name !== undefined ||
            errors.contactName !== undefined ||
            errors.email !== undefined ||
            errors.phone !== undefined ||
            errors.fax !== undefined
          ) {
            isInvalid = false;
          }
          return (
            <div>
              <div className="row">
                <CardBox
                  styleName="col-lg-12 "
                  childrenStyle="d-flex justify-content-center"
                  heading={<IntlMessages id="labInfo" />}
                  headerOutside
                >
                  <form className="row" noValidate autoComplete="off">
                    <div className="col-md-3 col-12">
                      <TextField
                        name="name"
                        label={<IntlMessages id="labName" />}
                        placeholder="Lab Name"
                        defaultValue={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        type="text"
                        fullWidth
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
                    <div className="col-lg-3 col-12">
                      <TextField
                        name="contactName"
                        label={<IntlMessages id="contactName" />}
                        placeholder="Contact Name"
                        defaultValue={values.contactName}
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        type="text"
                        className={`form-control ${
                          touched.contactName && errors.contactName
                            ? 'is-invalid'
                            : ''
                        } mt-0 mb-3`}
                      />
                      <ErrorMessage
                        component="div"
                        name="contactName"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="col-md-3 col-12">
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
                    <div className="col-md-3 col-12">
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
                    <div className="col-md-3 col-12">
                      <TextField
                        name="fax"
                        label={<IntlMessages id="fax" />}
                        placeholder="Fax"
                        defaultValue={values.fax}
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        type="text"
                        className={`form-control ${
                          touched.fax && errors.fax
                            ? 'is-invalid'
                            : ''
                        } mt-0 mb-3`}
                      />
                      <ErrorMessage
                        component="div"
                        name="fax"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="col-md-3 col-12">
                      <TextField
                        name="fax"
                        label={<IntlMessages id="fax" />}
                        placeholder="Fax"
                        defaultValue={values.fax}
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        type="text"
                        className={`form-control ${
                          touched.fax && errors.fax
                            ? 'is-invalid'
                            : ''
                        } mt-0 mb-3`}
                      />
                      <ErrorMessage
                        component="div"
                        name="fax"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="col-md-3 col-12">
                      <TextField
                        name="fax"
                        label={<IntlMessages id="fax" />}
                        placeholder="Fax"
                        defaultValue={values.fax}
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        type="text"
                        className={`form-control ${
                          touched.fax && errors.fax
                            ? 'is-invalid'
                            : ''
                        } mt-0 mb-3`}
                      />
                      <ErrorMessage
                        component="div"
                        name="fax"
                        className="invalid-feedback"
                      />
                    </div>
                    
                    <NotificationContainer />
                  </form>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClinicSettingsStep4);
