import React, {useState} from 'react';
import {FilterValuesType} from "./App";

type TaskType = {
    id: string
    isDone: boolean
    title: string
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatusTask: (id: string, isDone: boolean) => void
    filter: string

}


export function Todolist(props: PropsType) {
    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const addTasks = () => {
        if (title.trim() != "") {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError("Title is required")
        }
    }
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
    const onKeyPressHandler = ((event: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key == "Enter") {
            addTasks()
        }
    })
    const onAllClickHAndler = () => props.changeFilter("all")

    const onActiveClickHAndler = () => props.changeFilter("active")

    const onCompletedClickHAndler = () => props.changeFilter("completed")


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTasks}>+</button>
        </div>
        {error && <div className="error-message">{error}</div>}
        {props.tasks.map((task) => {
            const onRemoveTask = () => props.removeTask(task.id)
            const onChangeStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
                let isDonValue = e.currentTarget.checked
                props.changeStatusTask(task.id, isDonValue)

            }

            return (
                <li key={task.id} className={task.isDone ? "is-done" : ""}>
                    <input type="checkbox" checked={task.isDone} onChange={onChangeStatusHandler}/>
                    <span>{task.title}</span>
                    <button onClick={onRemoveTask}>✖️
                    </button>
                </li>
            )
        })}
        <div>
            <button className={props.filter === "all" ? "active-filter" : ''} onClick={onAllClickHAndler}>All
            </button>
            <button className={props.filter === "active" ? "active-filter" : ''} onClick={onActiveClickHAndler}>Active
            </button>
            <button className={props.filter === "completed" ? "active-filter" : ''}
                    onClick={onCompletedClickHAndler}>Completed
            </button>
        </div>
    </div>
}
