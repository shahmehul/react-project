import { useState } from "react";
import './Kanban.css';

function Kanban(){
    const [tasks, setTasks] = useState({
        todo: { id: 1, values: ["vacuum", "wash dishes"], label: 'To Do'},
        inProgress: { id: 2, values: [], label: 'In Progress'},
        done: { id: 3, values: ["mow lawn"], label: 'Done'},
    });

    return (
        <>
            <h1> Kanban Board</h1>
            <div className='board-container'>
                <div>
                    
                    <div className="items-container">
                    <h3> To Do </h3>
                        {        
                            tasks.todo.values.map((task) => (
                                <div key={tasks.todo.id} className="item">
                                    <p>{task}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    
                    <div className="items-container">
                    <h3> In Progress </h3>
                        {
                            tasks.inProgress.values.map((task) => (
                                <div key={tasks.inProgress.id} className="item">
                                    <p>{task}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    
                    <div className="items-container">
                    <h3> Done </h3>
                        {
                            tasks.done.values.map((task) => (
                                <div key={tasks.done.id} className="item">
                                    <p>{task}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Kanban;