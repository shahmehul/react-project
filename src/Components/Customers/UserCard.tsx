import { useEffect, useState } from "react"
import type { User, Manager } from './models';
import {getManagerFromId} from './api';
import './Customer.css';

interface UserCardProps {
    user: User,
    managers: Manager[],
    onSave: (user: User) => void
}

export default function UserCard({ user, managers, onSave }: UserCardProps) {
    const [form, setForm] = useState<User>(user);
    const [isEdit, setIsEdit] = useState<Boolean>(false);

    useEffect(()=> {
        setForm(user);
    },[user])

    const onInputChange = (e: any) => {
        const { value, name } = e.target;
        setForm((prev: User) => ({
            ...prev,
            [name]: value
        }))
    }

    const onNumberChange = (e: any) => {
        const { value, name } = e.target;
        setForm((prev: User) => ({
            ...prev,
            [name]: Number(value)
        }))
    }


    const onFormSubmit = ()=> {
        const manager = getManagerFromId(Number(form.managerId), managers);
        onSave(
            {
                ...form,
                managerId: Number(manager?.id),
                managerName: String(manager?.name)
            }
        );
        setIsEdit(false);
    }

    if (isEdit) {
        return (
            <div className="row card mtl">
                <label htmlFor="name">User Name:</label>
                <input onChange={onInputChange} type="text" id="name" name="name" value={form.name}></input>
                <label htmlFor="email">Email:</label>
                <input onChange={onInputChange} type="text" id="email" name="email" value={form.email}></input>
                <label htmlFor="phone">Phone:</label>
                <input onChange={onInputChange} type="text" id="phone" name="phone" value={form.phone}></input>
                <label htmlFor="managerId" >Select Manager:</label>
                <select
                    name="managerId"
                    className="manager-select"
                    onChange={onNumberChange}
                    value={form.managerId}
                >
                    {managers.map(manager => (
                        <option key={manager.id} value={manager.id}>
                            {manager.name}
                        </option>
                    ))}
                </select>
                <div className="column mtl">
                    <button onClick={() => onFormSubmit()} className="primary-button mrl"> Save </button>
                    <button onClick={() => setIsEdit(false)} className="secondary-button"> Cancel </button>
                </div>
            </div>
        )
    } else {
        return (
            <div className="row card mtl">
                <div className="column">
                    <h3>{form.name}</h3>
                    <button onClick={() => setIsEdit(true)} className="primary-button end"> Edit </button>
                </div>
                <p>{form.email}</p>
                <p>{form.phone}</p>
                <p>{form.managerName}</p>
            </div>
        )
    }
}