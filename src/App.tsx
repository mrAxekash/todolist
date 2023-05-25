import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilteredValuesType = 'all' | 'active' | 'completed'

function App() {

    let [state, setState] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "Node JS", isDone: false },
        { id: 5, title: "GraphQL", isDone: false }
    ])

    let [filter, setFilter] = useState<FilteredValuesType>('all')

    const deleteTask = (taskId: number) => {
        // tasks1 = tasks1.filter(task => task.id !== taskId)
        // console.log(tasks1)
        setState(state.filter(task => task.id !== taskId))
    }

    const changeFilter = (filter: FilteredValuesType) => {
        setFilter(filter)
    }

    let filteredTasks = state

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
            />
        </div>
    );
}

export default App;
