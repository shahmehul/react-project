import React, { useState } from "react";
import TrainingDot from "./TrainingDot";
import './TrainingStatus.css';
import ProgressTracker from "./ProgressTracker";

interface Subject {
    id: number,
    name: string,
    completed: boolean
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
                { id: 1, name: "Security 101", completed: true },
                { id: 2, name: "Compliance Basics", completed: true },
                { id: 3, name: "Advanced Training", completed: false }
            ]
        },
        {
            id: 2,
            name: "Bob",
            trainings: [
                { id: 1, name: "Security 101", completed: true },
                { id: 2, name: "Compliance Basics", completed: true },
                { id: 3, name: "Advanced Training", completed: true }
            ]
        },
        {
            id: 3,
            name: "Charlie",
            trainings: [
                { id: 1, name: "Security 101", completed: true },
                { id: 2, name: "Compliance Basics", completed: false },
                { id: 3, name: "Advanced Training", completed: false }
            ]
        },
        {
            id: 4,
            name: "Diana",
            trainings: [
                { id: 1, name: "Security 101", completed: false },
                { id: 2, name: "Compliance Basics", completed: false },
                { id: 3, name: "Advanced Training", completed: false }
            ]
        },
        {
            id: 5,
            name: "Edward",
            trainings: [
                { id: 1, name: "Security 101", completed: true },
                { id: 2, name: "Compliance Basics", completed: true },
                { id: 3, name: "Advanced Training", completed: false }
            ]
        },
        {
            id: 6,
            name: "Fiona",
            trainings: [
                { id: 1, name: "Security 101", completed: true },
                { id: 2, name: "Compliance Basics", completed: false },
                { id: 3, name: "Advanced Training", completed: false }
            ]
        }
    ];

    const [employees, setEmployees] = useState(employeesData);
    const [currentIndex, setCurrentIndex] = useState(1);

    return (
        <>
            <h2 className="pbl">Employee Training Status</h2>
            {employees.map((employee: Employee, index) =>
                currentIndex === index && (
                    <div className='employee-container pbl' key={employee.id}>
                        <h4 className="center">{employee.name}</h4>
                        <p>Employee {employee.id} of {employees.length}</p>
                        {employee.trainings.map((training) => (
                            <div key={training.id} className="class-container">
                                <TrainingDot name={training.name} completed={training.completed}></TrainingDot>
                            </div>
                        ))}
                        <div className="flex-item ptl">
                            <ProgressTracker trainings={employee.trainings}></ProgressTracker>
                        </div>
                        
                    </div>
                )
            )}
            <div className="action-container">
                <button className={currentIndex === 0 ? 'disabled': 'green'} disabled={currentIndex === 0} onClick={()=> setCurrentIndex(prev => prev > 0 ? prev-1 : 0)  }> Previous </button>
                <button className={currentIndex === employees.length - 1 ? 'disabled': 'green'} disabled={currentIndex === employees.length - 1} onClick={()=> setCurrentIndex(prev => prev+1)  }>Next</button>
            </div>
            
        </>

    )
}

export default TrainingStatus;