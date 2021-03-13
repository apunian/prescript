import React from 'react';
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PatientNew from '../../PatientNew';

class PatientCell extends React.Component {

  onPatientOptionSelect = event => {
    this.setState({ menuState: true, anchorEl: event.currentTarget });
  };
  handleRequestClose = () => {
    this.setState({ menuState: false });
  };
  onPatientClose = () => {
    this.setState({ addPatientState: false });
  };
  onDeletePatient = (Patient) => {
    this.setState({ addPatientState: false });
    this.props.onDeletePatient(Patient);
  };
  onEditPatient = () => {
    this.setState({ menuState: false, addPatientState: true });
  };

  constructor() {
    super();
    this.state = {
      anchorEl: undefined,
      menuState: false,
      addPatientState: false,
    }
  }

  render() {
    const { patient, addFavourite, onPatientSelect, onSavePatient } = this.props;
    const { menuState, anchorEl, addPatientState } = this.state;
    const { name, thumb, email, phone, designation, starred } = patient;

    const options = [
      'Edit',
      'Delete',
    ];
    return (

      <div className="contact-item">

        <Checkbox color="primary"
          checked={patient.selected}
          value="checkedF"
          onClick={() => {
            onPatientSelect(patient)
          }}
        />
        <div className="col-auto px-1 actions d-none d-xs-flex">
          <IconButton className="icon-btn p-1" onClick={() => {
            addFavourite(patient)
          }}>
            {starred ? <i className="zmdi zmdi-star" /> : <i className="zmdi zmdi-star-outline" />}
          </IconButton>
        </div>
        {(thumb === null || thumb === '') ?
          <div className="rounded-circle size-40 bg-blue text-center text-white mx-1 mx-md-3"
            style={{ fontSize: 20 }}>
            {name.charAt(0).toUpperCase()}
          </div> :
          <img className="rounded-circle size-40 mx-1 mx-md-3" alt={name} src={thumb} />}

        <div className="col con-inf-mw-100">
          <p className="mb-0">
            <span className="text-truncate contact-name text-dark">
              {name}
            </span>
            <span className="d-inline-block toolbar-separator">&nbsp;</span>
            <span className="text-truncate job-title text-dark">
              {designation}
            </span>
          </p>

          <div className="text-muted">
            <span className="email d-inline-block mr-2">
              {email},
                        </span>

            <span className="phone d-inline-block">
              {phone}
            </span>
          </div>
        </div>


        <div className="col-auto px-1 actions d-none d-sm-flex">
          <IconButton className="icon-btn p-2" onClick={this.onPatientOptionSelect}>
            <i className="zmdi zmdi-more-vert" />
          </IconButton>

          <Menu id="long-menu"
            anchorEl={anchorEl}
            open={menuState}
            onClose={this.handleRequestClose}

            MenuListProps={{
              style: {
                width: 100,
              },
            }}>
            {options.map(option =>
              <MenuItem key={option} onClick={() => {
                if (option === 'Edit') {
                  this.onEditPatient()
                } else {
                  this.handleRequestClose();
                  this.onDeletePatient(patient)
                }
              }
              }>
                {option}
              </MenuItem>,
            )}
          </Menu>
          {addPatientState &&
            <PatientNew open={addPatientState} patient={patient} onSavePatient={onSavePatient}
              onPatientClose={this.onPatientClose} onDeletePatient={this.onDeletePatient} />}
        </div>
      </div>
    )
  }
}

export default PatientCell;