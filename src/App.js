import {useState} from 'react';
import AddTaskForm from './components/AddTaskForm.jsx';
import UpdateForm from './components/UpdateForm.jsx';
import ToDo from './components/ToDo.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons'

import './App.css';

function App() {

// Tasks (ToDo List) state
  const [toDo, setToDo] = useState([]);

  // {id: 1, title: 'task 1', status: false},
  // {id: 2, title: 'task 2', status: false}

  // Temp State
  const [newTask, setNewTask] = useState(''); 
  const [updateData, setUpdateData] = useState('');
  // newTask will hold the data that will be added as new task in task list
  // updateData will hold the task that is being edited
  // quotes '' to ignore the error "a component is changing n uncontrolled input to be controlled" 

  // function to add task
  const addTask = () => {
    if(newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false}
      setToDo([...toDo, newEntry])
      setNewTask('');
    }
  }

  // function to Delete task
  const deleteTask = (id) => {
    let newTasks = toDo.filter( task => task.id !== id)
    // filter out the tasks in the toDo
    setToDo(newTasks);
  }

  // function to mark task done or completed
  const markDone = (id) => {
    let newTask = toDo.map(task => {
      if (task.id === id ) {
        return ({...task, status: !task.status})
      }
      return task;
    })
    setToDo(newTask);
  }

  // function to cancel the update
  const cancelUpdate = () => {
    setUpdateData('');
  }

  // function to Change task for update
  const changeTask = (e) => {
    // it will take an event and it will get the value from the event
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }

  // function to update task
  const updateTask = () => {
    let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
    let updatedObject = [...filterRecords, updateData]
    setToDo(updatedObject);
    setUpdateData('');
  }

  return (
    <div className="container App"> 
    {/* container class from the bootstrap */}
      
      <br /><br />
      <h2>To Do list App (ReactJS)</h2>
      <br /><br />

      {/* Update Task */}
      {updateData && updateData ? (
        // when task is to be updated/edited only then the update button will displayed
        <UpdateForm
          updateData={updateData}
          changeTask ={changeTask}
          updateTask ={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        < AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />
      )}

      {/* Display ToDos */}

      {toDo && toDo.length ? '' : 'No Tasks...'}
      {/* when theres no task display No Tasks... */}

        <ToDo 
         toDo ={toDo}
         markDone ={markDone}
         setUpdateData ={setUpdateData}
         deleteTask  ={deleteTask}
        />
      

    </div>
  );
}

export default App;
