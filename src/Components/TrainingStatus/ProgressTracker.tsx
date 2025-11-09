interface Subject {
    id: number,
    name: string,
    completed: boolean
}

function ProgressTracker({ trainings }: { trainings: Subject[] }) {
    const completed = trainings.filter(value => value.completed === true).length;
    const percentage = Math.round((completed / trainings.length) * 100 ) ; 

    return (
        <>
            <label htmlFor="progressbar" className="ptl">Progress {percentage}% </label>
            <progress id="progressbar" value={completed} max={trainings.length}>  </progress>
        </>
    )
}

export default ProgressTracker;