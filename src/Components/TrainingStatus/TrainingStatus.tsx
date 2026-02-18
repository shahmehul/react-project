import React, { useState } from "react";
import './TrainingStatus.css';

interface Subject {
    id: number,
    name: string,
    status: string
}
interface Employee {
    id: number,
    name: string,
    trainings: Subject[]
}

function TrainingStatus() {
    const employeesData: Employee[] = [
        {
            id: 1,
            name: "Alice",
            trainings: [
                { id: 1, name: "Security 101", status: "Completed" },
                { id: 2, name: "Compliance Basics", status: "Started" },
                { id: 3, name: "Advanced Training", status: "Invitation Sent" }
            ]
        },
        {
            id: 2,
            name: "Bob",
            trainings: [
                { id: 1, name: "Security 101", status: "Completed" },
                { id: 2, name: "Compliance Basics", status: "Completed" },
                { id: 3, name: "Advanced Training", status: "Completed" }
            ]
        },
        {
            id: 3,
            name: "Charlie",
            trainings: [
                { id: 1, name: "Security 101", status: "Started" },
                { id: 2, name: "Compliance Basics", status: "Invitation Sent" },
                { id: 3, name: "Advanced Training", status: "Invitation Sent" }
            ]
        },
        {
            id: 4,
            name: "Diana",
            trainings: [
                { id: 1, name: "Security 101", status: "Invitation Sent" },
                { id: 2, name: "Compliance Basics", status: "Invitation Sent" },
                { id: 3, name: "Advanced Training", status: "Invitation Sent" }
            ]
        },
        {
            id: 5,
            name: "Edward",
            trainings: [
                { id: 1, name: "Security 101", status: "Completed" },
                { id: 2, name: "Compliance Basics", status: "Completed" },
                { id: 3, name: "Advanced Training", status: "Started" }
            ]
        },
        {
            id: 6,
            name: "Fiona",
            trainings: [
                { id: 1, name: "Security 101", status: "Completed" },
                { id: 2, name: "Compliance Basics", status: "Started" },
                { id: 3, name: "Advanced Training", status: "Invitation Sent" }
            ]
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const currentEmployee = employeesData[currentIndex];

    return (
        <div className="training-container">
            <h1 className="pbl">Employee Training Status</h1>
            <div className='employee-container pbl' key={currentIndex}>
                <h4 className="center">{currentEmployee.name}</h4>
                <p>Employee {currentEmployee.id} of {employeesData.length}</p>
                <div className="progress-bar">
                    {currentEmployee.trainings.map((training, index) => (
                        <div key={training.id} className="step-container">
                            <div className={training.status === 'Completed' ? 'dot completed' :
                                training.status === 'Started' ? 'dot started' : 'dot pending'}>
                                {training.status === 'Completed' ? "✔" : index + 1}
                            </div>
                            {index < currentEmployee.trainings.length - 1 && (
                                <div className={training.status === 'Completed' &&
                                    (currentEmployee.trainings[index + 1].status === 'Completed' || currentEmployee.trainings[index + 1].status === 'Started')
                                    ? 'line green' : training.status === 'Started' ? 'line gray' : 'line'} ></div>)}
                            <p className="ptl">{training.name}</p>
                            <p>{training.status}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="action-container">
                <button className={currentIndex === 0 ? 'disabled' : 'green'} disabled={currentIndex === 0} onClick={() => setCurrentIndex(prev => prev > 0 ? prev - 1 : 0)}> Previous </button>
                <button className={currentIndex === employeesData.length - 1 ? 'disabled' : 'green'} disabled={currentIndex === employeesData.length - 1} onClick={() => setCurrentIndex(prev => prev + 1)}>Next</button>
            </div>
        </div>
    )
}

export default TrainingStatus;