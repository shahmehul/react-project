import './App.css';
import UserList from './Components/UserList/UserList';
import Kanban from './Components/Kanban/Kanban';
import Posts from './Components/Posts/Posts';
import { Routes, Route, Link } from "react-router-dom";
import ToDoList from './Components/ToDoList/ToDoList';
import TrainingStatus from './Components/TrainingStatus/TrainingStatus';
import { PaginationTest } from './Components/Pagination/PaginationTest';
import AutoComplete from './Components/AutoComplete/AutoComplete';
import Customers from './Components/Customers/Customers';
import Books from './Components/Books/Books';
import Product from './Components/Product/Product';
import Catalog from './Components/ Catalog/Catalog';
import Trading from './Components/Trading/Trading';
import NavBar from './Components/NavBar/NavBar';
import Chat from './Components/Chat/Chat';
import BarChart from './Components/BarChart/BarChart';

import React from 'react';

function App() {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight:'2rem'}} >
          <NavBar></NavBar>
        </div>
        <div>
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/kanban" element={<Kanban />} />
            <Route path="/task" element={<ToDoList />} />
            <Route path="/trainingstatus" element={<TrainingStatus />} />
            <Route path="/paginationTest" element={<PaginationTest />} />
            <Route path="/autocomplete" element={<AutoComplete />} />
            <Route path="/posts/:userId" element={<Posts />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/books" element={<Books />} />
            <Route path="/products" element={<Product />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/tradingPage" element={<Trading />} />
            <Route path="/navBar" element={<NavBar />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/barChart" element={<BarChart/>} />
          </Routes>
        </div>
      </div>
      </>
      );
}

export default App;
