import './App.css';
import UserList from './Components/UserList/UserList';
import Posts from './Components/Posts/Posts';
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/users">Users</Link> |{" "}
      </nav>

      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/posts/:userId" element={<Posts />} />
      </Routes>

      
    </>
  );
}

export default App;
