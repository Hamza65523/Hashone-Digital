import React, { useEffect, useState } from 'react';
import folder from "./assets/folder.svg";
import arrow from "./assets/arrow.svg";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (taskInput.trim() !== '') {
      setTasks((prevTasks) => [...prevTasks, { task: taskInput, subTasks: [], status: false }]);
      setTaskInput('');
    }
  };

  const deleteTask = (taskIndex) => {
    setTasks((prevTasks) => prevTasks.filter((_, index) => index !== taskIndex));
  };

  const deleteSubTask = (taskIndex, subTaskIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].subTasks.splice(subTaskIndex, 1);
    setTasks(updatedTasks);
  };

  const updateTask = (taskIndex, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].task = updatedTask;
    setTasks(updatedTasks);
  };

  const updateSubTask = (taskid, subtaskid, updatedSubTask) => {
    // let updatedTasks = [...tasks];
    // console.log(updatedTasks)
    // updatedTasks =updatedTasks.filter((items)=>items._id ==taskid?items.subTasks.filter((item)=>item.id ==subtaskid?{title:updatedSubTask}:item):items)
    // setTasks(updatedTasks);
    
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "title": updatedSubTask,
});

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`http://localhost:5000/api/Task/${taskid}/${subtaskid}`, requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  };

  const SubTask = ({ taskIndex }) => {
    const [subTaskInput, setSubTaskInput] = useState('');

    const addSubTask = (e) => {
      e.preventDefault();
      if (subTaskInput.trim() !== '') {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex].subTasks.push({ title: subTaskInput, status: false, });
        setTasks(updatedTasks);
        setSubTaskInput('');
      }
    };

    
    return (
      <>
        <form onSubmit={addSubTask} className="ml-4 flex gap-2">
          <input
            type="text"
            placeholder="Write a sub-task..."
            value={subTaskInput}
            onChange={(e) => setSubTaskInput(e.target.value)}
          />
        </form>
      </>
    );
  };

  const markDone = (name,id,id1) => {
    const updatedTasks = [...tasks];
    if(name == 'taask'){
      updatedTasks[id].status = !updatedTasks[id].status;
      setTasks(updatedTasks);
    }else{
      updatedTasks[id].subTasks[id1].status = !updatedTasks[id].subTasks[id1].status;
      setTasks(updatedTasks);
    }
    
  };


  const [Switch,setSwitch]  =useState(true)
  const handlerSubmit =()=>{
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify(tasks);
console.log(raw)
var requestOptions = {
method: 'POST',
headers: myHeaders,
body: raw,
redirect: 'follow'
};
fetch("http://localhost:5000/api/Task/", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
  }
      
useEffect(()=>{
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://localhost:5000/api/Task/", requestOptions)
  .then(response => response.json())
  .then((result )=> setTasks(result))
  .catch(error => console.log('error', error));
  
},[])


  return (
    <div className='px-4 py-4 rounded-xl'>
      <button onClick={handlerSubmit}>CLick</button>
      <div className="flex gap-2 items-center" onClick={()=>setSwitch(!Switch)}>
        <img src={folder} alt="" />
        <h1 className="font-bold font-mono">Productivity</h1>
        <div className="h-[1px] w-44 bg-gray-500"></div>
        <img src={arrow} alt="" />
        <span className='px-2  py-1 text-white rounded-md bg-gray-700'>
        {tasks.length}
        </span>
      </div>
      {Switch&&<div className="">
        
      <div>
        <form onSubmit={addTask} className="flex gap-2">
          <input
            type="text"
            className="outline-none"
            placeholder="Write a task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
        </form>
      </div>
      <ul>
        {tasks.map((task, taskIndex) => (
          <li key={taskIndex}>
            <div className="flex gap-2">
              <input type="checkbox" onClick={() => markDone('taask',taskIndex)} />
              <span className={`${task.status === true && 'line-through'}`}>
                {task.task}
              </span>
            </div>
            <SubTask taskIndex={taskIndex} />
            <ul className="ml-4">
              {task.subTasks.map((subTask, subTaskIndex) => (
                <li key={subTaskIndex}>
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      checked={
                        subTask.status === true
                          ? true
                          : task.status === true && true
                      }
                      onClick={() => markDone('subtask',taskIndex, subTaskIndex)}
                    />
                    <span
                      className={`${
                        subTask.status === true
                          ? 'line-through'
                          : task.status === true && 'line-through'
                      }`}
                    >
                      {subTask.title}
                    </span>
                  </div>
                  {/* <button
                    onClick={() => deleteSubTask(taskIndex, subTaskIndex)}
                  >
                    Delete sub task
                  </button> */}
                  {/* <button
                className='ml-4'
              onClick={() => {
                const updatedSubTask = prompt('Update sub task Task', subTask.title);
                if (updatedSubTask) {
                  updateSubTask(task._id, subTask._id,updatedSubTask);
                }
              }}
            >
              Update Sub Task
            </button> */}
                </li>
              ))}
            </ul>
            {/* <button onClick={() => deleteTask(taskIndex)}>Delete Task</button> */}
            {/* <button
            className='ml-4'
              onClick={() => {
                const updatedTask = prompt('Update Task', task.task);
                if (updatedTask) {
                  updateTask(taskIndex, updatedTask);
                }
              }}
            >
              Update Task
            </button> */}
          </li>
        ))}
      </ul>
      </div>}
    </div>
  );
};

export default TodoList;
