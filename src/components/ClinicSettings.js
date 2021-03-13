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
    'Lab (Optional)',
    'Pharmacy (Optional)',
    'Diagnostic Center (Optional)',
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
      license: 'MD-License-FL-008ZG67A2',
      dob: '09-26-1971',
    },
    lab: {
      id: '',
      name: 'AP Labs Corp.',
      email: 'amandeep.punian@gmail.com',
      phone: '9546044098',
      fax: '9546044099',
      contactName : 'Veronica Gonzalez',
    },
    pharmacy: {
      id: '',
      name: 'AP Pharmacy',
      email: 'amandeep.punian@gmail.com',
      phone: '9546044098',
      fax: '9546044099',
      contactName : 'Veronica Gonzalez',
    },
    diagnosysCenter: {
      id: '',
      name: 'AP Diagnostic Center.',
      email: 'amandeep.punian@gmail.com',
      phone: '9546044098',
      fax: '9546044099',
      contactName : 'Jack Punian',
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
