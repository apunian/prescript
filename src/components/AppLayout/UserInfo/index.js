import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar'
import {useDispatch} from 'react-redux'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {userSignOut} from '../../../actions/Auth';
import IntlMessages from '../../../utils/IntlMessages';
import * as ROLES from '../../../constants/roles';

const UserInfo = (props) => {
  const authUser = props.authUser;
  const dispatch = useDispatch();
  const [anchorE1, setAnchorE1] = useState(null);
  const [open, setOpen] = useState(false);
//console.log('In user info');
  const userName = 'Dr. Anmol Bains, MD';//authUser.roles[ROLES.DOCTOR_OWNER]?'Dr. Anmol Bains, MD':'Staff Nurse Daizy God';

  const handleClick = event => {
    setOpen(true);
    setAnchorE1(event.currentTarget);
  };
  //"../../../../assets/images/dfg-150x150.png"

  const handleRequestClose = () => {
    setOpen(false);
  };

  return (
    <div className="user-profile d-flex flex-row align-items-center">
      <Avatar
        className="user-avatar"
        src={require("./../../../assets/images/anmol1.jpg")}
      />
      <div className="user-detail">
          <h4 className="user-name d-flex" onClick={handleClick}><span className='text-truncate'>{userName}</span> <i
          className="zmdi zmdi-caret-down zmdi-hc-fw align-middle"/>
        </h4>
      </div>
      <Menu className="user-info"
            id="simple-menu"
            anchorEl={anchorE1}
            open={open}
            onClose={handleRequestClose}
            PaperProps={{
              style: {
                minWidth: 120,
                paddingTop: 0,
                paddingBottom: 0
              }
            }}
      >
        <MenuItem onClick={handleRequestClose}>
          <i className="zmdi zmdi-account zmdi-hc-fw mr-2"/>
          <IntlMessages id="popup.profile"/>
        </MenuItem>
        <MenuItem onClick={handleRequestClose}>
          <i className="zmdi zmdi-settings zmdi-hc-fw mr-2"/>
          <IntlMessages id="popup.setting"/>
        </MenuItem>
        <MenuItem onClick={() => {
          handleRequestClose();
          dispatch(userSignOut());
        }}>
          <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2"/>

          <IntlMessages id="popup.logout"/>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserInfo;


