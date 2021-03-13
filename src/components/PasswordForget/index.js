import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { AppBar, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import IntlMessages from '../../utils/IntlMessages';
import ContainerHeader from '../AppLayout/ContainerHeader';
import CardBox from '../CardBox';
import Header from '../AppLayout/Header';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.css';
import FooterLanding from '../AppLayout/FooterLanding';

const MyFormikSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address format')
    .required('Email is required'),
});

const PasswordForgetPage = props => <PasswordForgetForm {...props} />;

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="app-main-container app-wrapper animated slideInUpTiny animation-duration-3">
        <div className="app-header ml-4">
          <Header />
        </div>
        <ContainerHeader
            match={this.props.match}
            title={<IntlMessages id="password-mgmt" />}
          />
       
          
          <div className="w-100">
          
            <div styleName="row align-items-center">
              <CardBox
                styleName="col-md-12  "
                headerOutside={false}
              >
                <Formik
                  initialValues={{
                    email: '',
                    error: '',
                    loader: false,
                  }}
                  validationSchema={MyFormikSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    this.props.firebase
                      .doPasswordReset(values.email)
                      .then(() => {
                        values.loader = true;
                      })
                      .catch(error => {
                        values.loader = true;
                        NotificationManager.error(
                          values.error.message,
                        );
                      });
                    setSubmitting(false);
                    //values.loader = true;
                  }}
                >
                  {({
                    touched,
                    errors,
                    isSubmitting,
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => {
                    const isInvalid =
                      values.email === '' || errors.email;
                    //console.log('Rendering::', values.loader);
                    return (
                      <div>
                        <form method="post" onSubmit={handleSubmit}>
                          <fieldset>
                            <TextField
                              name="email"
                              label={
                                <IntlMessages id="appModule.email" />
                              }
                              fullWidth
                              onChange={handleChange}
                              onBlur={handleBlur}
                              defaultValue={values.email}
                              margin="normal"
                              type="text"
                              placeholder="Email Address"
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

                            <NotificationContainer />
                            <div className="mb-3 d-flex align-items-center justify-content-between">
                              <Button
                                disabled={isInvalid}
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="mt-4"
                              >
                                <IntlMessages id="appModule.resetPassword" />
                              </Button>
                            </div>
                            <div className="col-md-12">
                              <div className="mb-3 d-flex align-items-center justify-content-between">
                                <Link to={ROUTES.SIGN_IN}>
                                  <IntlMessages id="appModule.signin" />
                                </Link>
                                <Link to={ROUTES.SIGN_UP}>
                                  <IntlMessages id="appModule.signup" />
                                </Link>
                                <Link to={ROUTES.LANDING}>
                                  <IntlMessages id="extraPages.goHome" />
                                </Link>
                              </div>
                            </div>
                          </fieldset>
                        </form>

                        {values.loader && (
                          <div className="loader-view">
                            <CircularProgress />
                          </div>
                        )}
                      </div>
                    );
                  }}
                </Formik>
              </CardBox>
            
              <div className="col-md-12 mb-2">
                    <FooterLanding />
                  </div>
            </div>
          </div>
      </div>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
/*
ONLINE COMMUNICATION INFORMED CONSENT Instructions for Using Online Communication You agree to take steps to keep your online communication to and from your physician confidential, including the following: Do not store messages on your employer-provided computer; otherwise personal information could be accessed or owned by your employer. Use a screen saver or close your messages instead of leaving your messages on the screen for passersby to read and keep your password safe and private. Do not allow other individuals or other third parties access to the computer(s) in which you store medical communications. Do not use email for medical communications. Standard e-mail lacks security and privacy features and may expose medical communications to employers or other unintended third parties. Withdrawal of this Informed Consent must be done by a written online communication or in writing to your physician's office. Conditions of Using Online Communication The following agreements and procedures relate to online communication: Your physician's office may keep a copy of any online communication from you in your medical record. eClinicalWorks will keep a copy of all medically important online communication in your medical record in an encrypted format. You should print or store (on a computer or storage device owned and controlled by you) a copy of any online communication that is important to you. Neither eClinicalWorks nor your physician's office will forward any online communication from you to third parties except as authorized or required by law. Online communication, including through eClinicalWorks, should be used with caution. eClinicalWorks cannot be used for emergencies or other urgent or time-sensitive matters. Any emergency communication or urgent requests must occur by telephone or through other existing emergency communication tools. If there is other, non-urgent information that you do not want transmitted via online communication, you must contact your physician's practice by phone or fax. eClinicalWorks is not liable for improper disclosure of confidential information. Follow-up is solely your responsibility. You are responsible for scheduling any necessary appointments and for determining if an unanswered online communication was not received. You are responsible for taking steps to protect yourself from unauthorized use of online communication, such as keeping your password confidential. eClinicalWorks is not responsible for breaches of confidentiality caused by you or an independent third party. You agree to not engage in any illegal online communication. Access to Online Communication The following pertains to access to and use of online communication: Online communication does not decrease or diminish any of the other ways in which you can communicate with your provider. It is an additional option and not a replacement. eClinicalWorks may stop providing online communication or change its services at any time without prior notification to you. Risks of Using Online Communication All medical communication carries some level of risk. While the likelihood of risks associated with the use of online communication, particularly in a secure environment, is substantially reduced, the risks are nonetheless real and very important to understand. It is very important that you consider these risks each time you plan to communicate with your physician, and communicate in such a fashion as to mitigate the potential for any of these risks. These risks include, but are not limited to: Online communication may travel much further than you planned. It is easier for online communication to be forwarded, intercepted, or even changed without your knowledge. Online communication is easier to falsify than handwritten or signed hard copies. A dishonest person could attempt to impersonate you to try to get your medical records. It is harder to get rid of an online communication. Backup copies may exist on a computer or in cyberspace, even after you have deleted your copies. Online communication is not private simply because it relates to your own medical information. Employers and online services have a right to inspect and keep online communication transmitted through their systems. Online communication is also admissible as evidence in court. Online communication may disrupt or damage your computer if a computer virus is attached. Patient Acknowledgement and Agreement I acknowledge that I have read and fully understand this consent form. I understand the risks associated with online communication between my physician and me, and consent to the conditions outlined herein. In addition, I agree to follow the instructions set forth herein, as well as any other instructions that my physician may impose to communicate with patients via online communication. I have had a chance to ask any questions that I had and to receive answers. I have been proactive about asking questions related to this consent agreement. All of my questions have been answered and I understand and concur with the information provided in the answers.

   */
