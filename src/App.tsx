import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {logDOM} from "@testing-library/react";


export type FilterValuesType = "all" | "active" | "completed"

function App() {
    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Rest API", isDone: false},
        {id: 5, title: "GraphQL", isDone: false}
    ])

    let [filter, setFilter] = useState<FilterValuesType>("all")
    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter((task) => !task.isDone)
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter((task) => task.isDone)
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }


    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter(task => task.id != id)
        setTasks(filteredTasks)
    }
    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasksForTodolist} removeTask={removeTask}
                      changeFilter={changeFilter}/>
            {/* <Todolist title="Songs" tasks={tasks2} />*/}
        </div>
    );
}

export default App;
