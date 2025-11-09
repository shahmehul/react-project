import { useState } from "react";
import "./ToDoList.css";

function ToDoList() {
    const initialTasks = [
        { id: 1, title: "Write unit tests", completed: false },
        { id: 2, title: "Review PR", completed: true },
        { id: 3, title: "Update docs", completed: false },
    ];

    const [items, setItems] = useState(initialTasks);
    const [newTask, setNewTask] = useState('');
    const [editText, setEditText] = useState('');
    const [editId, setEditId] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');

    // Handle checkbox toggle
    const toggleTask = (id: number) => {
        setItems(prev => prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    const handleAddTask = () => {
        setErrorMessage('')
        if (!newTask.trim()) {
            setErrorMessage('New Task can not be empty.')
            return;
        };
        setItems(prev => ([...prev, { id: prev.length + 1, title: newTask, completed: false }]));
        setNewTask("");
    }

    const handleEditTask = (e: any) => {
        console.log('inside handle edit task', e.key)
        if (e && "key" in e && e.key !== 'Enter') return;
        setErrorMessage('')
        if (!editText.trim()) {
            setErrorMessage(' Task name can not be empty.')
            return;
        };

        setItems(prev => prev.map(item => item.id === editId ? { id: item.id, title: editText, completed: item.completed } : item));
        stopEditing();
    }


    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    }

    const deleteTask = (id: number) => {
        setItems(prev => prev.filter(item => item.id != id));
    }

    const startEditing = (id: number, task: string) => {
        setEditId(id);
        setEditText(task);
    }

    const stopEditing = () => {
        setEditId(null);
        setEditText('');
    }

    const cancelEditing = () => {
        setEditId(null);
        setEditText("");
    }

    return (
        <>
            <div className="container">
                <h1>To Do List</h1>
                <div className="add-container">
                    <input value={newTask} onKeyDown={handleKeyDown} onChange={(e: any) => setNewTask(e.target.value)} placeholder="Add New Task"></input>
                    <button onClick={() => handleAddTask()}> Add New Task</button>
                </div>

                <p className="error-container pb10"> {errorMessage}</p>
                <h3 className="pb10">Pending Tasks</h3>
                <ul className="list">
                    {items
                        .filter((task: any) => !task.completed)
                        .map((task: any) => (
                            <li className="list-item" key={task.id}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)}
                                />
                                {
                                    editId && editId === task.id ?
                                        <>
                                            <input value={editText} onKeyDown={(e) => handleEditTask(e)} onChange={(e: any) => setEditText(e.target.value)}></input>
                                            <button className="action-button" onClick={(e) => handleEditTask(e)}> 💾 </button>
                                            <button className="action-button" onClick={() => cancelEditing()}> ✖️ </button>
                                        </>
                                        : <label>{task.title}</label>}
                                {editId !== task.id && (
                                    <button className="action-button" onClick={() => startEditing(task.id, task.title)}>✏️</button>
                                )}
                                <button className="action-button" onClick={() => deleteTask(task.id)}> 🗑️</button>
                            </li>
                        ))}
                </ul>

                <br />

                <h3 className="pb10">Completed Tasks</h3>
                <ul className="list">
                    {items
                        .filter((task) => task.completed)
                        .map((task) => (
                            <li className="list-item" key={task.id}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)}
                                />
                                <label>{task.title}</label>
                            </li>
                        ))}
                </ul>
            </div>

        </>
    );
}

export default ToDoList;
