import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import './UserList.css';

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

  const debounce = useCallback((func: Function, delay: number) => {
    let timeoutId: number;
    return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

      // Debounced search function
      const debouncedSearch = useCallback(
        debounce((searchValue: string) => {
          setDebouncedTerm(searchValue);
        }, 500),
        [debounce]
    );

  const onSearchTermChange = (e: any) => {
    const { value } = e.target;
    // dSearch(value); // ✅ pass latest value
    setSearchTerm(value); // immediate update
    debouncedSearch(value); // delayed API call
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
          <li className="list-item" key={user.id}><Link to={`/posts/${user.id}?name=${user.name}`}> {user.name}</Link></li>
        ))}
      </ul>
    </>
  );
}

export default UserList;
