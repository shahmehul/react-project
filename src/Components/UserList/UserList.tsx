import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import './UserList.css';
import React from "react";

interface User {
  id: string,
  name: string
  username: string
}

function UserList() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState(""); // debounced term

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);
  
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const onSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect( ()=> {
    const fetchUsers = async ()=> {
      setLoading(true);
      setError(null);
      const response  = await fetch(`https://jsonplaceholder.typicode.com/users?q=${debouncedTerm}`);
      if (!response.ok) setError('there was some problem fetching user list...')
      const results = await response.json();
      setUserList(results);
      setLoading(false);
    }
    fetchUsers();
  },[debouncedTerm])

  return (
    <div className="user-container">
      <h1> User List </h1>
      <div className="search-container">
        <input className="input-field" onChange={onSearchTermChange} type="text" value={searchTerm} placeholder="Please Enter Query"/>
        <button className="button-field" type="button" >Search</button>
      </div>
      
      {error && (<p> {error} </p>)}
      {loading && (<p> Loading ... </p>)}
      <ul className="list-container">
        {userList.map((user) => (
          <li className="list-item" key={user.id}><Link to={`/posts/${user.id}?name=${user.name}`}> {user.name}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
