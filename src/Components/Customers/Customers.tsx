import { useEffect, useState } from "react"
import { getCustomers, getManagerFromId, getManagers } from "./api"
import type { User, Manager } from "./models";
import UserCard from "./UserCard";
import './Customer.css';

export default function Customers(){
    const [managers, setManagers] = useState<Manager[]>([]);
    const [customers, setCustomers] = useState<User[]>([]);

    useEffect(()=> {
        const loadData = async ()=>{
            const customers = await getCustomers();
            const managers = await getManagers();
            setManagers(managers);
            const enrichedCustomers = customers.map((user:User)=>(
                {
                    ...user,
                    ['managerName']: String(getManagerFromId(user.managerId,managers)?.name)
                }
            ))
            setCustomers(enrichedCustomers);

        }
        loadData();
    },[])

    const onSave = (updatedUser:User)=> {
        setCustomers(prev => 
            prev.map((u:User) =>
             (u.id === updatedUser.id ? updatedUser : u)) )
    }

    const onAdd = ()=> {
        const defaultManager = managers[0];
        setCustomers((prev)=> (
            [
                ...prev,
                {
                    id: Date.now(),
                    name: 'New User',
                    managerId: defaultManager.id,
                    managerName: defaultManager.name,
                    phone: '1111111111',
                    email: 'abc@gmail.com' 
                }
            ]
        ))
    }

    return (
        <div className="customer-container">
            <button className="primary-button" onClick={onAdd}>Add User</button>
            {
                customers.map((user: User)=> (
                    // <div key={user.id}> {user.name}</div>
                    <UserCard key={user.id} user={user} managers={managers} onSave={onSave}></UserCard>
                ))
            }
            
        </div>
    )
}