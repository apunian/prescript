import React from 'react';
import CustomScrollbars from '../../utils/CustomScrollbars';
import SideBarNavigation from '../AppLayout/SideBarNavigation';

const SideBarContentDoctors = () => {

  console.log('In SidebarContents')
  const navigationMenus = [
    {
      name: 'sidebar.main',
      type: 'section',
      children: [
      {
        name: 'doctorsdashboard',
        type: 'item',
        icon: 'check-square',
        link: '/app/doctors-dashboard',
      },
      {
        name: 'appointments',
        type: 'item',
        icon: 'check-square',
        link: '/app/appointments',
      },
      {
        name: 'newexam',
        type: 'item',
        icon: 'check-square',
        link: '/app/exam'
      },
      {
        name: 'prescribe',
        type: 'item',
        icon: 'check-square',
        link: '/app/prescribe',
      },
      {
        name: 'orderlabs',
        type: 'item',
        icon: 'check-square',
        link: '/app/orderlabs',
      },
      {
        name: 'orderimagesrvc',
        type: 'item',
        icon: 'check-square',
        link: '/app/orderimageservices',
      },
      {
        name: 'refertoanotherdoctor',
        type: 'item',
        icon: 'check-square',
        link: '/app/orderimageservices',
      },
      {
        name: 'requestforpatientrecords',
        type: 'item',
        icon: 'check-square',
        link: '/app/orderimageservices',
      },
      ]
    },
    {
      name: 'patientsmgmt',
      type: 'section',
      children: [
        {
          name: 'patientDashboard',
          icon: 'book-image',
          type: 'item',
          link: '/app/patientMain',
        },
        {
          name: 'vitals',
          icon: 'book-image',
          type: 'item',
          link: '/app/patientslist',
        },
        {
          name: 'rxrefillls',
          icon: 'book-image',
          type: 'item',
          link: '/app/patientslist',
        },
        {
          name: 'prescriptions',
          icon: 'book-image',
          type: 'item',
          link: '/app/patientslist',
        },
        {
          name: 'labs',
          icon: 'book-image',
          type: 'item',
          link: '/app/patientslist',
        },
        {
          name: 'dximages',
          icon: 'book-image',
          type: 'item',
          link: '/app/patientslist',
        },
        {
          name: 'history',
          icon: 'book-image',
          type: 'item',
          link: '/app/patientslist',
        },
        {
          name: 'diagnosyses',
          icon: 'book-image',
          type: 'item',
          link: '/app/patientslist',
        },
        {
          name: 'referrals',
          icon: 'book-image',
          type: 'item',
          link: '/app/patientslist',
        },
        {
          name: 'patientconents',
          icon: 'book-image',
          type: 'item',
          link: '/app/patientslist',
        },
      ]
    },
    {
      name: 'clinicbldg',
      type: 'section',
      children: [
        {
          name: 'clinicsrvc',
          icon: 'book-image',
          type: 'item',
          link: '/app/clinicbldgmgmt',
        },
        {
          name: 'electricsrvc',
          icon: 'book-image',
          type: 'item',
          link: '/app/clinicbldgmgmt',
        },
        {
          name: 'generalmaintenance',
          icon: 'book-image',
          type: 'item',
          link: '/app/clinicbldgmgmt',
        },
        {
          name: 'logistics',
          icon: 'book-image',
          type: 'item',
          link: '/app/clinicbldgmgmt',
        },
        {
          name: 'others',
          icon: 'book-image',
          type: 'item',
          link: '/app/clinicbldgmgmt',
        },
      ]
    },
    {
      name: 'doctors-menu-settings',
      type: 'section',
      children: [
        {
          name: 'messages',
          icon: 'book-image',
          type: 'item',
          link: '/app/messages',
        },
        {
          name: 'doctors-menu-profile',
          icon: 'book-image',
          type: 'item',
          link: '/app/account',
        },
        {
          name: 'account',
          type: 'item',
          icon: 'check-square',
          link: '/app/admin'
        },
        {
          name: 'clinic-setup',
          type: 'item',
          icon: 'account-box',
          link: '/app/clinic-settings'
        },
        {
          name: 'addstaff',
          type: 'item',
          icon: 'account-box',
          link: '/app/clinic-settings'
        },
        {
          name: 'modifyroles',
          type: 'item',
          icon: 'account-box',
          link: '/app/clinic-settings'
        },
      ]
    },
  ];

  return (
    <CustomScrollbars className=" scrollbar">
      <SideBarNavigation menuItems={navigationMenus} />
    </CustomScrollbars>
  );
};

export default SideBarContentDoctors;
