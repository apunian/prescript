import React from 'react';
import PatientCell from "./PatientCell/index";

const PatientList = ({patientList, addFavourite, onPatientSelect, onSavePatient, onDeletePatient}) => {
  return (
    <div className="contact-main-content">
      {patientList.map((patient, index) =>
        <PatientCell key={index} patient={patient} onDeletePatient={onDeletePatient}
                     onSavePatient={onSavePatient}
                     addFavourite={addFavourite} onPatientSelect={onPatientSelect}/>
      )}

    </div>
  )
};

export default PatientList;