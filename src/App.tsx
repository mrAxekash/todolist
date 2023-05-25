import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilteredValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Node JS", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false }
    ])

    let [filter, setFilter] = useState<FilteredValuesType>('all')

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const changeFilter = (filter: FilteredValuesType) => {
        setFilter(filter)
    }

    const addTask = (newTaskTitle: string) => {
        let newTask: TaskType = {id: v1(), title: newTaskTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(task => task.id === taskId ? {...task, isDone} : task))
    }


    let filteredTasks = tasks

    if(filter === 'active') {
        filteredTasks = filteredTasks.filter(task => !task.isDone)
    }
    if(filter === 'completed') {
        filteredTasks = filteredTasks.filter(task => task.isDone)
    }


    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                filter={filter}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
