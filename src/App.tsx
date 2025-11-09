import './App.css';
import UserList from './Components/UserList/UserList';
import Kanban from './Components/Kanban/Kanban';
import Posts from './Components/Posts/Posts';
import { Routes, Route, Link } from "react-router-dom";
import ToDoList from './Components/ToDoList/ToDoList';
import TrainingStatus from './Components/TrainingStatus/TrainingStatus';

import React from 'react';

function App() {
  return (
    <>
      <nav className='navbar'>
        <Link to="/">Home | </Link> {" "}
        <Link to="/users">Users | </Link> {" "}
        <Link to="/kanban"> Board | </Link> {" "}
        <Link to="/task"> Tasks |</Link> {" "}
        <Link to="/trainingstatus"> Training </Link> {" "}
      </nav>

      <Routes>
        <Route path="/" element={<UserList />}/>
        <Route path="/users" element={<UserList />} />
        <Route path="/kanban" element={<Kanban />} />
        <Route path="/task" element={<ToDoList/>} />  
        <Route path="/trainingstatus" element={<TrainingStatus/>} />
        <Route path="/posts/:userId" element={<Posts />} />
      </Routes>

      
    </>
  );
}

export default App;
