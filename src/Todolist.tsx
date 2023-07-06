import React, {useState} from 'react';
import {FilterValuesType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void

}


export function Todolist(props: PropsType) {
    const [title, setTitle] = useState("");

    const addTasks = () => {
        props.addTask(title);
        setTitle("");

    }
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
    const onKeyPressHandler = ((event: React.KeyboardEvent<HTMLInputElement>) => {
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
            />
            <button onClick={addTasks}>+</button>
        </div>
        {props.tasks.map((task) => {
            const onRemoveTask = () => props.removeTask(task.id)

            return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={onRemoveTask}>✖️
                    </button>
                </li>
            )
        })}
        <div>
            <button onClick={onAllClickHAndler}>All
            </button>
            <button onClick={onActiveClickHAndler}>Active
            </button>
            <button onClick={onCompletedClickHAndler}>Completed
            </button>
        </div>
    </div>
}
