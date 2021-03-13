import React,{useState} from "react";

import Widget from "./Widget";

import TaskItem from "./TaskItem";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const myTaskList = [
  {
    id: 1,
    title: 'Run payroll for the employees. Call Amandeep Punian @954-604-4098 for a new contract. ',
    completed: false,
    user: {
      projectName: 'Official',
      avatar: "https://via.placeholder.com/260x260"
    },
    dueDate: 'Today',
    tags: [1, 2]
  }, {
    id: 2,
    title: 'Submit your next week schedule.',
    completed: false,
    user: {
      projectName: 'Critical',
      avatar: "https://via.placeholder.com/208x208"
    },
    dueDate: 'Today',
    tags: [2, 4]
  }, {
    id: 3,
    title: 'Set up an appointment with the accounting services.',
    completed: false,
    user: {
      projectName: 'Accounting',
      avatar: "https://via.placeholder.com/150x150"
    },
    dueDate: '21 July',
    tags: [1, 2, 3]
  }, {
    id: 4,
    title: 'Buy flowers for the wife. It is her birthday!',
    completed: false,
    user: {
      projectName: 'Important',
      avatar: "https://via.placeholder.com/208x208"
    },
    dueDate: '23 July',
    tags: [2, 3, 4]
  }, {
    id: 5,
    title: 'Remind Luka to add the guest names in the security guest list.',
    completed: false,
    user: {
      projectName: 'Flexile',
      avatar: "https://via.placeholder.com/150x150"
    },
    dueDate: '1 Aug',
    tags: [2, 4]
  }];

const TaskList =()=> {
  const [taskList,setTaskList]=useState(myTaskList);
  const [value,setValue]=useState(0);


  const  handleChange = (event, value) => {
    setValue(value);
  };

  const onChange = (data, index) => {
    setTaskList(taskList.map(task => {
        if (task.id === data.id) {
          task.completed = !data.completed;
        }
        return task;
      }))
  };


    return (
      <Widget>
        <div className="d-flex flex-row">
          <h4 className="mb-0"> TODO List</h4>
          <span className="text-primary font-weight-medium pointer ml-auto"><i
            className="zmdi zmdi-search jr-fs-xxl ml-2 d-inline-block align-middle"/> </span>
        </div>
        <div className="jr-tabs-classic">
          <Tabs className="jr-tabs-up" value={value} onChange={handleChange} centered>
            <Tab className="jr-tabs-label" label="All Tasks"/>
            <Tab className="jr-tabs-label" label="My Tasks"/>
          </Tabs>
          <div className="jr-tabs-content jr-task-list">
            {value === 0 && taskList.map((task, index) => <TaskItem key={index} data={task} onChange={onChange}/>)}
            {value === 1 && taskList.map((task, index) => <TaskItem key={index} data={task} onChange={onChange}/>)}
          </div>
        </div>
      </Widget>
    );
  }

export default TaskList;
