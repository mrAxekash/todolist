import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilteredValuesType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string
    title: string
    filter: FilteredValuesType
}

export type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Node JS", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false}
    // ])
    //
    // let [filter, setFilter] = useState<FilteredValuesType>('all')

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},

    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    //tasks function
    const deleteTask = (taskId: string, todolistID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(task => task.id !== taskId)})
    }

    const changeFilter = (todolistId: string, filter: FilteredValuesType) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))

    }

    const addTask = (newTaskTitle: string, todolistID: string) => {
        let newTask: TaskType = {id: v1(), title: newTaskTitle, isDone: false}
        setTasks({...tasks, [todolistID]: [ newTask , ...tasks[todolistID]]})
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(task => task.id === taskId ? {...task, isDone } : task)})
    }

    //todolists function

    const deleteTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistID))
        delete tasks[todolistID]
    }




    return (
        <div className="App">
            {todolists.map(todolist => {

                let taskForTodolist = tasks[todolist.id]

                if (todolist.filter === 'active') {
                    taskForTodolist = taskForTodolist.filter(task => !task.isDone)
                }
                if (todolist.filter === 'completed') {
                    taskForTodolist = taskForTodolist.filter(task => task.isDone)
                }

                return (
                    <Todolist
                        key={todolist.id}
                        id={todolist.id}
                        title={todolist.title}
                        tasks={taskForTodolist}
                        filter={todolist.filter}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        deleteTask={deleteTask}
                        deleteTodolist={deleteTodolist}
                    />
                )
            })}
            {/*<Todolist*/}
            {/*    title={'What to learn'}*/}
            {/*    tasks={filteredTasks}*/}
            {/*    deleteTask={deleteTask}*/}
            {/*    filter={filter}*/}
            {/*    changeFilter={changeFilter}*/}
            {/*    addTask={addTask}*/}
            {/*    changeTaskStatus={changeTaskStatus}*/}
            {/*/>*/}
        </div>
    );
}

export default App;
