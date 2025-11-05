import { useState } from "react";
import './Kanban.css';

type status = "todo" | "inProgress" | "done";

function Kanban(){
    const [tasks, setTasks] = useState({
        todo: { id: 1, values: ["vacuum", "wash dishes"], label: 'To Do'},
        inProgress: { id: 2, values: [], label: 'In Progress'},
        done: { id: 3, values: ["mow lawn"], label: 'Done'},
    });

    const [errorMessage, setErrorMessage] = useState<string>('')

    const stages:status[] = ['todo','inProgress','done'];

    const onTaskClick = (currentTask:any, currentStage: status)=> {
        setErrorMessage('');
        const indexOfCurrentStage = stages.indexOf(currentStage);
        const nextStage = stages[indexOfCurrentStage+1];
        if(!nextStage){
            setErrorMessage('this task is already complete');
            return;
        }

        setTasks( prev => ({
            ...prev,
            [currentStage]: {
                ...prev[currentStage],
                values: prev[currentStage].values.filter((t: any) => t !== currentTask)
            },
            [nextStage]: {
                ...prev[nextStage],
                values: [...prev[nextStage].values, currentTask]
            }
        }))
    }

    return (
        <>
            <h1> Kanban Board</h1>
            <p className="error-message"> {errorMessage} </p>
            <div className='board-container'>
                {
                    Object.entries(tasks).map(([columnKey, columnValue]) => (
                        <div className="items-container">
                            <h3> {columnValue.label} </h3>
                            {
                                columnValue.values?.map((task, index) => (
                                    <div key={index} className="item">
                                        <p onClick={() => onTaskClick(task, columnKey as status)}>{task}</p>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Kanban;