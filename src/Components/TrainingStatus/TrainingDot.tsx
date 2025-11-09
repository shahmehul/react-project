function TrainingDot({ name, completed }: { name: string, completed: boolean }) {
    return (
        <>
            <p className={completed ? 'dot green' : 'dot gray'}></p>
            <p>{name}</p>
        </>
    )
}

export default TrainingDot;