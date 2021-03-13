import React, {useEffect} from 'react';
import Drawer from '@material-ui/core/Drawer';
import {useDispatch, useSelector} from 'react-redux'
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import PatientList from './PatientList';
import AppModuleHeader from '../AppModuleHeader';
import PatientNew from '../Patients/PatientNew';
import IntlMessages from '../../utils/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    addFavourite,
    getAllPatient,
    getUnselectedAllPatient,
    handleRequestClose,
    onAddPatient,
    onPatientClose,
    onPatientSelect,
    onDeletePatient,
    onDeleteSelectedPatient,
    onFilterOptionSelect,
    onSavePatient,
    onToggleDrawer,
    updatePatientUser
} from './../../actions/Patient';

import CustomScrollbars from '../../utils/CustomScrollbars';

let patientId = 723812738;

const filterOptions = [
  {
    id: 1,
    name: 'All Patients',
    icon: 'zmdi-menu'
  }, {
    id: 2,
    name: 'Frequently Patiented',
    icon: 'zmdi-time-restore'

  }, {

    id: 3,
    name: 'Starred Patients',
    icon: 'zmdi-star'
  }
];

const PatientMain = () => {

    const dispatch = useDispatch();
    const {width} = useSelector(({settings}) => settings);
    const {
        loader,
        alertMessage,
        showMessage,
        noContentFoundMessage,
        selectedSectionId,
        drawerState,
        user,
        searchUser,
        filterOption,
        patientList,
        selectedPatients,
        addPatientState
    } = useSelector(({patients}) => patients);
    const PatientSideBar = (user) => {
        return <div className="module-side">
            <div className="module-side-header">
                <div className="module-logo">
                    <i className="zmdi zmdi-account-box mr-4"/>
                    <span><IntlMessages id="chat.contacts"/></span>
                </div>
            </div>

            <div className="module-side-content">
                <CustomScrollbars className="module-side-scroll scrollbar"
                                  style={{height: width >= 1200 ? 'calc(100vh - 200px)' : 'calc(100vh - 80px)'}}>
                    <div className="module-add-task">
                        <Button className="jr-btn btn-block" variant="contained" color="primary" aria-label="add"
                                onClick={() => dispatch(onAddPatient())}>
                            <i className="zmdi zmdi-account-add zmdi-hc-fw"/>
                            <span>Add New Patient</span>
                        </Button>
                    </div>
                    <div className="module-side-nav">
                        <ul className="module-nav">
                            {filterOptions.map(option => <li key={option.id} className="nav-item">
                  <span
                      className={`jr-link ${option.id === selectedSectionId ? 'active' : ''}`} onClick={
                      ()=>filterOptionSelect(option)
                  }>
                    <i className={`zmdi ${option.icon}`}/>
                    <span>{option.name}</span>
                  </span>
                                </li>
                            )}

                        </ul>
                    </div>
                </CustomScrollbars>
            </div>
        </div>

    };


    const patientClose = () => {
        dispatch(onPatientClose());
    };
    const filterOptionSelect = (option) => {
        dispatch(onFilterOptionSelect(option));
    };

    const deleteSelectedPatient = () => {
        dispatch(onDeleteSelectedPatient());
    };
    const filterPatient = (userName) => {
        if (userName === '') {
            filterOptionSelect(filterOption);
        } else {
            dispatch(filterPatient(userName));
        }
    };

    const allPatientSelect = () => {
        const selectAll = selectedPatients < patientList.length;
        if (selectAll) {
            dispatch(getAllPatient());
        } else {
            dispatch(getUnselectedAllPatient());
        }
    };

    const toggleDrawer = () => {
        dispatch(onToggleDrawer());
    };

    const patientUserUpdate = (evt) => {
        dispatch(updatePatientUser(evt.target.value));
        dispatch(filterPatient(evt.target.value));
    };
    return (
        <div className="app-wrapper">
            <div className="app-module animated slideInUpTiny animation-duration-3">

                <div className="d-block d-xl-none">
                    <Drawer
                        open={drawerState}
                        onClose={toggleDrawer}>
                        {PatientSideBar(user)}
                    </Drawer>
                </div>
                <div className="app-module-sidenav d-none d-xl-flex">
                    {PatientSideBar(user)}
                </div>

                <div className="module-box">
                    <div className="module-box-header">
                        <IconButton className="drawer-btn d-block d-xl-none" aria-label="Menu"
                                    onClick={toggleDrawer}>
                            <i className="zmdi zmdi-menu"/>
                        </IconButton>
                        <AppModuleHeader placeholder="Search patient" notification={false} apps={false}
                                         user={user}
                                         onChange={patientUserUpdate}
                                         value={searchUser}/>
                    </div>
                    <div className="module-box-content">

                        <div className="module-box-topbar">
                            <Checkbox color="primary"
                                      indeterminate={selectedPatients > 0 && selectedPatients < patientList.length}
                                      checked={selectedPatients > 0}
                                      onChange={allPatientSelect}
                                      value="SelectMail"/>


                            {selectedPatients > 0 &&
                            <IconButton className="icon-btn"
                                        onClick={deleteSelectedPatient}>
                                <i className="zmdi zmdi-delete"/>
                            </IconButton>}

                        </div>
                        <CustomScrollbars className="module-list-scroll scrollbar"
                                          style={{height: width >= 1200 ? 'calc(100vh - 259px)' : 'calc(100vh - 240px)'}}>
                            {loader ?
                                <div className="loader-view-block h-100">
                                    <div className="loader-view">
                                        <CircularProgress/>
                                    </div>
                                </div>
                                :
                                patientList.length === 0 ?
                                    <div className="h-100 d-flex align-items-center justify-content-center">
                                        {noContentFoundMessage}
                                    </div>
                                    : <PatientList patientList={patientList}
                                                   addFavourite={(data) => dispatch(addFavourite(data))}
                                                   onPatientSelect={(data) => dispatch(onPatientSelect(data))}
                                                   onDeletePatient={(data) => dispatch(onDeletePatient(data))}
                                                   onSavePatient={(data) => dispatch(onSavePatient(data))}/>
                            }
                        </CustomScrollbars>

                    </div>
                </div>
            </div>
            <PatientNew open={addPatientState} patient={{
                'id': patientId++,
                'name': '',
                'thumb': '',
                'email': '',
                'phone': '',
                'designation': '',
                'selected': false,
                'starred': false,
                'frequently': false,
            }} onSavePatient={(data) => dispatch(onSavePatient(data))}
                        onPatientClose={patientClose} onDeletePatient={(data) => dispatch(onDeletePatient(data))}/>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={showMessage}
                autoHideDuration={3000}
                onClose={() => dispatch(handleRequestClose())}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{alertMessage}</span>}
            />
        </div>
    )
};

export default PatientMain;