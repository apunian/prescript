import React from "react";

const WelComeCard = (props) => {

  return (
    <div className="jr-wel-ema">
      <h6 className="mb-3">Welcome {props.authUser.email}</h6>
      <p className="jr-fs-sm text-uppercase">You Have</p>
      <ul className="list-unstyled">
        <li className="mb-1">
          <i className="zmdi zmdi-comment-text zmdi-hc-fw zmdi-hc-lg mr-2"/>
          <span>5 Patients waiting</span>
        </li>
        <li className="mb-1">
          <i className="zmdi zmdi-email zmdi-hc-fw zmdi-hc-lg mr-2"/>
          <span>10 Appointments remaining today</span>
        </li>
        <li className="mb-1">
          <i className="zmdi zmdi-file-plus zmdi-hc-fw zmdi-hc-lg mr-2"/>
          <span>7 Due tasks</span>
        </li>
        <li className="mb-1">
          <i className="zmdi zmdi-notifications-none zmdi-hc-fw zmdi-hc-lg mr-2"/>
          <span>3 Other notifications</span>
        </li>
      </ul>
    </div>
  );
};

export default WelComeCard;
