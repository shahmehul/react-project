import './App.css';
import UserList from './Components/UserList/UserList';
import Kanban from './Components/Kanban/Kanban';
import Posts from './Components/Posts/Posts';
import { Routes, Route, Link } from "react-router-dom";
import React from 'react';

function App() {
  return (
    <>
      <nav className='navbar'>
        <Link to="/">Home | </Link> {" "}
        <Link to="/users">Users | </Link> {" "}
        <Link to="/kanban"> Board </Link> {" "}
      </nav>

      <Routes>
        <Route path="/" element={<UserList />}/>
        <Route path="/users" element={<UserList />} />
        <Route path="/kanban" element={<Kanban />} />
        <Route path="/posts/:userId" element={<Posts />} />
      </Routes>

      
    </>
  );
}

export default App;
