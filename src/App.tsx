import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

import {v1} from "uuid";


export type FilterValuesType = "all" | "active" | "completed"

function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
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


    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(task => task.id != id)
        setTasks(filteredTasks)
    }
    const addTask = (title: string) => {

        let task = {id: v1(), title: title, isDone: true};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);

    }


    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasksForTodolist} removeTask={removeTask}
                      changeFilter={changeFilter} addTask={addTask}/>

        </div>
    )
}

export default App;
