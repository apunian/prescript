import React from 'react';
import CustomScrollbars from '../../utils/CustomScrollbars';
import SideBarNavigation from '../AppLayout/SideBarNavigation';

const SideBarContent = () => {
  const navigationMenus = [
    {
      name: 'sidebar.main',
      type: 'section',
      children: [
        {
          name: 'doctors-menu-dashboard',
          icon: 'view-dashboard',
          type: 'item',
          link: '/doctors-main-content',
        },
        {
          name: 'doctors-menu-appointments',
          icon: 'view-dashboard',
          type: 'item',
          link: '/account',
        },
        {
          name: 'doctors-menu-waiting-area',
          icon: 'view-dashboard',
          type: 'item',
          link: '/account',
        },
        {
          name: 'doctors-menu-clinic-patients',
          icon: 'view-dashboard',
          type: 'item',
          link: '/account',
        },
        {
          name: 'doctors-menu-clinic-staff',
          icon: 'view-dashboard',
          type: 'item',
          link: '/account',
        },
        {
          name: 'doctors-menu-calendar',
          icon: 'view-dashboard',
          type: 'item',
          link: '/account',
        },
        {
          name: 'doctors-menu-write-a-prescription',
          icon: 'view-dashboard',
          type: 'item',
          link: '/account',
        },

        {
          name: 'doctors-menu-newexam',
          icon: 'view-dashboard',
          type: 'collapse',
          children: [
            {
              name: 'doctors-menu-newexam-dashboard',
              type: 'item',
              link: '/account',
            },
            {
              name: 'doctors-menu-patient-vitals',
              type: 'item',
              link: '/account',
            },
            {
              name: 'doctors-menu-diagonsis',
              type: 'item',
              link: '/account',
            },
            {
              name: 'doctors-menu-patient-prescriptions',
              type: 'item',
              link: '/account',
            },
            {
              name: 'doctors-menu-patient-labs',
              type: 'item',
              link: '/account',
            },
            {
              name: 'doctors-menu-patient-prescriptions',
              type: 'item',
              link: '/account',
            },
          ],
        },
        {
          name: 'doctors-menu-reports',
          icon: 'folder',
          type: 'collapse',
          children: [
            {
              name: 'doctors-menu-build-patient-record-binder',
              type: 'item',
              link: '/account',
            },
          ],
        },
        {
          name: 'doctors-menu-settings',
          type: 'item',
          icon: 'account-box',
          link: '/account',
        },
        {
          name: 'doctors-menu-profile',
          icon: 'book-image',
          type: 'item',
          link: '/account',
        },
      ],
    },
  ];

  return (
    <CustomScrollbars className=" scrollbar">
      <SideBarNavigation menuItems={navigationMenus} />
    </CustomScrollbars>
  );
};

export default SideBarContent;
