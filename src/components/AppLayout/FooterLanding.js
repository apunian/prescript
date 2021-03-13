import React from 'react';
import Button from '@material-ui/core/Button';
import IntlMessages from '../../utils/IntlMessages';

const FooterLanding = () => {
  
    return (
      <footer className="app-landing-footer">
        <span className="d-inline-block">Copyright IDT Solutions &copy; 2021</span>
        <Button
          href="http://www.idtsol.com"
          target="_blank"
          size="small"
          color="primary"
        ><IntlMessages id="system-name"/></Button>
      </footer>
    );
  }
;

export default FooterLanding;