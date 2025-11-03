import { useState, useEffect } from "react";
import './UserList.css';

interface User {
  id: string,
  name: string
  username: string
}

function UserList() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState<User[]>([])

  useEffect( ()=> {
    const fetchUsers = async ()=> {
      setLoading(true);
      setError(null);
      const response  = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) setError('there was some problem fetching user list...')
      const results = await response.json();
      setUserList(results);
      setLoading(false);
    }
    fetchUsers();
  },[])

  if (error) return (<p> {error} </p>)
  if (loading) return (<p> Loading ... </p>)

  return (
    <>
      <h1> User List </h1>
      <input className="input-field" type="text" placeholder="Please Enter Query"/>
      <button className="button-field" type="button" >Search</button>
      {error && (<p> {error} </p>)}
      <ul className="list-container">
        {userList.map((user) => (
          <li className="list-item" key={user.id}><p> {user.name}</p></li>
        ))}
      </ul>
    </>
  );
}

export default UserList;
