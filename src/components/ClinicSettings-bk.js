import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { eachMonthOfInterval, format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar-edit';
import { connect } from 'react-redux';
import IntlMessages from '../utils/IntlMessages';
import ContainerHeader from './AppLayout/ContainerHeader';
import Header from './AppLayout/Header';
import Footer from './AppLayout/Footer';
import CardBox from './CardBox';
import ClinicSettingsStep1 from './ClinicSettingsStep1';
import ClinicSettingsStep2 from './ClinicSettingsStep2';
import ClinicSettingsStep3 from './ClinicSettingsStep3';
import ClinicSettingsStep4 from './ClinicSettingsStep4';
import ClinicSettingsStep5 from './ClinicSettingsStep5';
import ClinicSettingsStep6 from './ClinicSettingsStep6';
import ClinicSettingsStep7 from './ClinicSettingsStep7';
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
//
function getSteps() {
  return [
    'Avatar',
    'Clinic',
    'Physician',
    'Lab',
    'Pharmacy',
    'Diagnostic Center',
    'Confirm and Finish',
  ];
}
const StepsContent = props => {
  const stepIndex = props.activeStep;
  switch (stepIndex) {
    case 0:
      return <ClinicSettingsStep1 {...props} />;
    case 1:
      return <ClinicSettingsStep2 {...props} />;
    case 2:
      return <ClinicSettingsStep3 {...props} />;
    case 3:
      return <ClinicSettingsStep4 {...props} />;
    case 4:
      return <ClinicSettingsStep5 {...props} />;
    case 5:
      return <ClinicSettingsStep6 {...props} />;
    case 6:
      return <ClinicSettingsStep7 {...props} />;
    default:
      return 'Uknown stepIndex';
  }
};
const INITIAL_STATE = {
  clinic: {
    id: '',
    image: '',
    name: 'AP Clinic',
    email: 'amandeep.punian@gmail.com',
    phone: '9546044098',
    addLine1: '5 Ocean Drive',
    addLine2: 'Suite 1300',
    village: 'Miami Beach',
    city: 'Miami Beach',
    county: 'Miami-Dade',
    state: 'Florida',
    zip: '33027',
    country: 'USA',
    setupDone: false,
    sourceComponent: '',
    ownerPhysician: {
      id: '',
      image: '',
      name: 'Dr. Anmol Bains',
      suffix: 'MD',
      speciality: 'General Practicioner',
      email: 'amandeep.punian@gmail.com',
      phone: '9546044098',
      pager: '9546044099',
    },
    lab: {
      id: '',
      image: '',
      name: 'AP Labs Corp.',
      email: 'amandeep.punian@gmail.com',
      phone: '9546044098',
      addLine1: '5 Ocean Drive',
      addLine2: 'Suite 1300',
      village: 'Miami Beach',
      city: 'Miami Beach',
      county: 'Miami-Dade',
      state: 'Florida',
      zip: '33027',
      country: 'India',
      labContact: {
        id: '',
        image: '',
        name: 'Veronica Gonzalez',
        suffix: 'Technician',
        speciality: 'General',
        email: 'amandeep.punian@gmail.com',
        phone: '9546044098',
        pager: '9546044099',
      },
    },
    pharmacy: {
      id: '',
      image: '',
      name: 'AP Pharmacy Corp.',
      email: 'amandeep.punian@gmail.com',
      phone: '9546044098',
      addLine1: '5 Ocean Drive',
      addLine2: 'Suite 1300',
      village: 'Miami Beach',
      city: 'Miami Beach',
      county: 'Miami-Dade',
      state: 'Florida',
      zip: '33027',
      country: 'India',
      pharmacyContact: {
        id: '',
        image: '',
        name: 'Eric Swanson',
        suffix: 'Pharmacist',
        speciality: 'General',
        email: 'amandeep.punian@gmail.com',
        phone: '9546044098',
        pager: '9546044099',
      },
    },
    diagnosysCenter: {
      id: '',
      image: '',
      name: 'AP Diagnosys Center',
      email: 'amandeep.punian@gmail.com',
      phone: '9546044098',
      addLine1: '5 Ocean Drive',
      addLine2: 'Suite 1300',
      village: 'Miami Beach',
      city: 'Miami Beach',
      county: 'Miami-Dade',
      state: 'Florida',
      zip: '33027',
      country: 'India',
      diagnosysCenterContact: {
        id: '',
        image: '',
        name: 'Jack Punian',
        suffix: 'Radiology Technician',
        speciality: 'General',
        email: 'amandeep.punian@gmail.com',
        phone: '9546044098',
        pager: '9546044099',
      },
    },
  },
};
const ClinicSettings = props => {
  const [activeStep, setActiveStep] = useState(0);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [clinic, setClinic] = useState(INITIAL_STATE);
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [addLine1, setAddLine1] = useState();
  const [addLine2, setAddLine2] = useState();
  const [village, setVillage] = useState();
  const [city, setCity] = useState();
  const [county, setCounty] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [zip, setZip] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [setupDone, setSetupDone] = useState(false);
  const myLocalStyle = useStyles();
  const steps = getSteps();
  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setNextBtnDisabled(true);
  };
  //
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  //
  const handleReset = () => {
    setActiveStep(0);
  };
  const calllBackToModifyActiveStep = dataFromChild => {
    if (dataFromChild.activeStep === 0 || dataFromChild.activeStep ) {
      setActiveStep(dataFromChild.activeStep );
    }
  }
  const calllBackToEnableNextBtn = dataFromChild => {
    if (dataFromChild.nextBtnDisabled === false) {
      setNextBtnDisabled(false );
    }
  }
  const myCallBackFn = dataFromChild => {
    setClinic(dataFromChild);
    setNextBtnDisabled(!nextBtnDisabled );
    setActiveStep(activeStep + 1);
  };
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div className="app-container">
      <div className="app-main-container">
        <div className="app-header">
          <Header />
        </div>
        <main className="app-main-content-wrapper">
          <div className="app-main-content app-wrapper">
            <div className="animated slideInUpTiny animation-duration-3">
              <ContainerHeader
                match={props.match}
                title={<IntlMessages id="welcome1" />}
              />
              <div className="row ">
                <CardBox
                  styleName="col-lg-12"
                  childrenStyle="d-flex justify-content-center"
                  heading={<IntlMessages id="clinicsetup" />}
                  headerOutside
                >
                  <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    className="horizontal-stepper-linear"
                  >
                    {steps.map((label, index) => {
                      return (
                        <Step
                          key={label}
                          className={`horizontal-stepper ${
                            index === activeStep ? 'active' : ''
                          }`}
                        >
                          <StepLabel className="stepperlabel">
                            {label}
                          </StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                  <div>
                    {activeStep === steps.length ? (
                      <div>
                        <Typography className="my-2">
                          All steps completed - you&quot;re finished
                        </Typography>
                        <Button onClick={handleReset}>Reset</Button>
                      </div>
                    ) : (
                      <div>
                        <StepsContent
                          steps={steps.length}
                          activeStep={activeStep}
                          clinic={clinic}
                          callBackToParent={myCallBackFn}
                          calllBackToEnableNextBtn={calllBackToEnableNextBtn}
                          calllBackToModifyActiveStep={calllBackToModifyActiveStep}
                        />
                        <div style={{bacgroundColor:'blue',}}>
                          <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className="mr-2"
                            disabled={false}
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            disabled={nextBtnDisabled}
                          >
                            {activeStep === steps.length - 1
                              ? 'Finish'
                              : 'Next'}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardBox>
              </div>
            </div>
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
};
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
)(ClinicSettings);
