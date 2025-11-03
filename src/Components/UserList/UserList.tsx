import { useState, useEffect, useMemo } from "react";
import './UserList.css';

interface User {
  id: string,
  name: string
  username: string
}

const debounce = <T extends (...args: any[]) => void>(cb: T, delay = 1000) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function(this: any, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb.apply(this, args);
    }, delay);
  };
};

function UserList() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState(""); // debounced term

  // Update debouncedTerm with debounce
  const updateDebouncedTerm = useMemo(
    () =>
      debounce((val: string) => {
        setDebouncedTerm(val); // <-- triggers API
      }, 1000),
    []
  );

  const onSearchTermChange = (e: any) => {
    const { value } = e.target;
    // dSearch(value); // ✅ pass latest value
    setSearchTerm(value); // immediate update
    updateDebouncedTerm(value); // delayed API call
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


  if (error) return (<p> {error} </p>)
  if (loading) return (<p> Loading ... </p>)

  return (
    <>
      <h1> User List </h1>
      <input className="input-field" onChange={onSearchTermChange} type="text" value={searchTerm} placeholder="Please Enter Query"/>
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
