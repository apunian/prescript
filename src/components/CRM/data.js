import React from "react";


export const taskList = [
  {
    id: 1,
    title: 'Make the home page dynamic',
    completed: false,
    user: {
      projectName: 'Chatbull',
      avatar: "https://via.placeholder.com/260x260"
    },
    dueDate: 'Today',
    tags: [1, 2]
  }, {
    id: 2,
    title: 'Design wireframes based on the requirements',
    completed: false,
    user: {
      projectName: 'Flexile',
      avatar: "https://via.placeholder.com/208x208"
    },
    dueDate: 'Today',
    tags: [2, 4]
  }, {
    id: 3,
    title: 'Need to define microinteraction on click of signin button',
    completed: false,
    user: {
      projectName: 'Jumbo',
      avatar: "https://via.placeholder.com/150x150"
    },
    dueDate: '21 July',
    tags: [1, 2, 3]
  }, {
    id: 4,
    title: 'New page need to be designed for property listing',
    completed: false,
    user: {
      projectName: 'Flexile',
      avatar: "https://via.placeholder.com/208x208"
    },
    dueDate: '23 July',
    tags: [2, 3, 4]
  }, {
    id: 5,
    title: 'Design wireframes based on the requirements',
    completed: false,
    user: {
      projectName: 'Flexile',
      avatar: "https://via.placeholder.com/150x150"
    },
    dueDate: '1 Aug',
    tags: [2, 4]
  }];

export const taskTags = [
  {
    id: 1,
    name: 'HTML',
    color: 'danger',
  }, {
    id: 2,
    name: 'React',
    color: 'success',
  }, {
    id: 3,
    name: 'JavaScript',
    color: 'info',
  }, {
    id: 4,
    name: 'CSS',
    color: 'warning',
  }];

export const detailCards = [
  {
    cardColor: 'primary',
    imageIcon: require('../../../src/assets/images/dashboard/project-icon.png'),
    title: '05',
    subTitle: 'Patients Waiting'
  }, {
    cardColor: 'secondary',
    imageIcon: require('../../../src/assets/images/dashboard/tasks-icon.png'),
    title: '10',
    subTitle: 'Remaining Visits'
  }, {
    cardColor: 'info',
    imageIcon: require('../../../src/assets/images/dashboard/teams-icon.png'),
    title: '7',
    subTitle: 'Due Tasks'
  }, {
    cardColor: 'warning',
    imageIcon: require('../../../src/assets/images/dashboard/files-icon.png'),
    title: '03',
    subTitle: 'Other Notifications'
  },
]
export const recentActivity = [
  {
    id: 1,
    day: 'Today',
    tasks: [
      {
        id: 1,
        name: 'Mila Alba',
        title: [<span className="jr-link" key={1}>Eric Swanson</span>, ' left a 5 star review on ',
          <span className="jr-link" key={10}>Clinic Service.</span>],
        avatar: "",
        imageList: [],
      },
      {
        id: 4,
        name: 'Jack Punian',
        title: ['Jack Punian checked in at 9:30 AM. He is on time.'],
        avatar: '',
        imageList: [],
      },
    ]
  },
  {
    id: 2,
    day: 'Yesterday',
    tasks: [
      {
        id: 5,
        name: 'Kily Johns',
        title: ['Agent ',
          <span className="jr-link" key={2}>Kily Johns</span>, ' has added 7 new photos in the.',
          <span className="jr-link" key={3}>Patients' Vitals</span>],
        avatar: '',
        imageList: ["", "", "https://via.placeholder.com/150x150", "https://via.placeholder.com/150x150", "https://via.placeholder.com/128x128", "https://via.placeholder.com/150x150", "https://via.placeholder.com/150x150",],
      },
      {
        id: 6,
        name: 'Tom Moody',
        title: ['Welcome to a Tom Moody! ', <span className="jr-link" key={4}>A new account has been created for the new doctor.</span>],
        avatar: "",
        imageList: [],
      },
      {
        id: 7,
        name: 'Oliver Shorter',
        title: [<span className="jr-link" key={5}>Oliver Shorter</span>, ' has just checked in. She is here for her physical. ',
          <span className="jr-link" key={10}></span>],
        avatar: "https://via.placeholder.com/150x150",
        imageList: [],
      },
      {
        id: 8,
        name: 'Mila Alba',
        title: [<span className="jr-link" key={6}>Mila Alba</span>, ' left a 5 star review on ',
          <span className="jr-link" key={9}>Clinic services.</span>],
        avatar: "https://via.placeholder.com/150x150",
        imageList: [],
      },
      {
        id: 9,
        name: 'Bob Builder',
        title: ['Callback request from ', <span className="jr-link" key={7}>Bob Builder</span>, ' for a consultation. ',
          <span className="jr-link" key={8}>Dimitri House</span>],
        avatar: "https://via.placeholder.com/150x150",
        imageList: [],
      },
    ]
  }];


export const ticketList = [
  {
    id: 1,
    avatar: "https://via.placeholder.com/150x150",
    title: 'Need a quick support on setting',
    description: [<span className="jr-link" key={1}>Joy Parish</span>, "  created ticket 15 mins ago"],
    status: 2
  }, {
    id: 2,
    avatar: "https://via.placeholder.com/150x150",
    title: 'Pre-sale query about the product',
    description: [<span className="jr-link" key={2}>You</span>, " replied 2 days ago"],
    status: 1
  }, {
    id: 3,
    avatar: "https://via.placeholder.com/150x150",
    title: 'Regarding customization service',
    description: [<span className="jr-link" key={3}>Joy Parish</span>, " replied 2 days ago"],
    status: 4
  }
];

export const taskStatus = [
  {
    id: 1,
    title: 'Critical',
    color: 'danger'
  }, {
    id: 2,
    title: 'High',
    color: 'warning'
  }, {
    id: 3,
    title: 'Normal',
    color: 'success'
  }, {
    id: 4,
    title: 'Low',
    color: 'dark'
  }
];
export const siteVisit = [
  {name: '1', uv: 0, pv: 0},
  {name: '2', uv: 0, pv: 1},
  {name: '3', uv: 5, pv: 2},
  {name: '4', uv: 10, pv: 0},
  {name: '5', uv: 4, pv: 1},
  {name: '6', uv: 16, pv: 3},
  {name: '7', uv: 5, pv: 1},
  {name: '8', uv: 11, pv: 5},
  {name: '9', uv: 6, pv: 2},
  {name: '10', uv: 11, pv: 3},
  {name: '11', uv: 30, pv: 2},
  {name: '12', uv: 10, pv: 1},
  {name: '13', uv: 13, pv: 0},
  {name: '14', uv: 4, pv: 2},
  {name: '15', uv: 3, pv: 8},
  {name: '16', uv: 1, pv: 0},
  {name: '17', uv: 0, pv: 0},
];

export const totalSaleData = [
  {name: 'JAN', pv: 600},
  {name: 'FEB', pv: 3398},
  {name: 'MAR', pv: 1200},
  {name: 'APR', pv: 4908},
  {name: 'MAY', pv: 2908},
];
export const totalRevenueData = [
  {name: 'JAN', uv: 60},
  {name: 'FEB', uv: 90},
  {name: 'MAR', uv: 50},
  {name: 'APR', uv: 75},
  {name: 'MAY', uv: 60},
  {name: 'JUN', uv: 85},
  {name: 'JUL', uv: 20},
  {name: 'AUG', uv: 75},
  {name: 'SEP', uv: 60},
  {name: 'OCT', uv: 40},
  {name: 'NOV', uv: 75},
  {name: 'DEC', uv: 25},
];


export const trafficData = [
  {name: 'Page A', pv: 0},
  {name: 'Page B', pv: 2000},
  {name: 'Page C', pv: 600},
  {name: 'Page D', pv: 4400},
  {name: 'Page D', pv: 900},
  {name: 'Page H', pv: 4860},
];


