import React from 'react';
import {Modal, ModalHeader} from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import IntlMessages from '../../utils/IntlMessages';

class PatientNew extends React.Component {
  constructor(props) {
    super(props);

    const {id, thumb, name, email, phone, designation, selected, starred, frequently} = props.patient;
    this.state = {
      id,
      thumb,
      name,
      email,
      phone,
      designation,
      selected,
      starred,
      frequently
    }
  }

  render() {
    const {onSavePatient, onPatientClose, open, patient} = this.props;
    const {id, name, email, phone, designation, selected, starred, frequently} = this.state;
    let {thumb} = this.state;
    if (!thumb) {
      thumb = "https://via.placeholder.com/225x225";
    }
    return (
      <Modal className="modal-box" toggle={onPatientClose} isOpen={open}>
        <ModalHeader className="modal-box-header bg-primary text-white">
          {patient.name === '' ? <IntlMessages id="contact.addPatient"/> :
            <IntlMessages id="contact.savePatient"/>}
          <IconButton className="text-white"
                      onClick={onPatientClose}>
            <CloseIcon/>
          </IconButton>
        </ModalHeader>

        <div className="modal-box-content">
          <div className="row no-gutters">
            <div className="col-lg-3 text-center text-lg-right order-lg-2">
              <img className="ml-lg-3 mb-4 mb-lg-0 avatar size-120" src={thumb} alt={thumb}/>
            </div>

            <div className="col-lg-9 d-flex flex-column order-lg-1">
              <TextField
                required
                id="required"
                label={<IntlMessages id="appModule.name"/>}
                onChange={(event) => this.setState({name: event.target.value})}
                defaultValue={name}
                margin="none"/>
              <TextField
                id="required"
                label={<IntlMessages id="appModule.email"/>}
                onChange={(event) => this.setState({email: event.target.value})}
                value={email}
                margin="normal"/>
              <TextField
                id="required"
                label={<IntlMessages id="appModule.phone"/>}
                onChange={(event) => this.setState({phone: event.target.value})}
                value={phone}
                margin="normal"
              />
              <TextField
                id="required"
                label={<IntlMessages id="appModule.designation"/>}
                onChange={(event) => this.setState({designation: event.target.value})}
                value={designation}
                multiline
                rowsMax="4"
                margin="normal"/>
            </div>
          </div>
        </div>

        <div className="modal-box-footer d-flex flex-row">
          <Button disabled={name === ''} variant="contained" color="primary" onClick={() => {
            onPatientClose();
            onSavePatient(
              {
                'id': id,
                'name': name,
                'thumb': thumb,
                'email': email,
                'phone': phone,
                'designation': designation,
                'selected': selected,
                'starred': starred,
                'frequently': frequently
              });
            this.setState({
              'id': id + 1,
              'name': '',
              'thumb': '',
              'email': '',
              'phone': '',
              'designation': '',
            })

          }}><IntlMessages id="contact.savePatient"/></Button>
        </div>
      </Modal>
    );
  }
}

export default PatientNew;