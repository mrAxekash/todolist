import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from './AddItemForm';
import {Header} from "./Header";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid";


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
    const addTask = (newTaskTitle: string, todolistID: string) => {
        let newTask: TaskType = {id: v1(), title: newTaskTitle, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(task => task.id === taskId ? {...task, isDone} : task)})
    }
    const changeTaskTitle = (todolistID: string, taskID: string, newTitle: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(task => task.id === taskID ? {...task, title: newTitle} : task)
        })
    }
    //todolists function
    const deleteTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistID))
        delete tasks[todolistID]
    }
    const addTodolist = (title: string) => {
        let newTodolist: TodolistsType = {id: v1(), title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolist.id]: []})
    }
    const changeFilter = (todolistId: string, filter: FilteredValuesType) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))

    }
    const changeTodolistTitle = (todolistID: string, newTitle: string) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistID ? {...todolist, title: newTitle} : todolist))
    }
    return (
        <div className="App">
            <Header/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callback={addTodolist}/>
                </Grid>

                <Grid container spacing={3}>
                    {todolists.map(todolist => {
                        let taskForTodolist = tasks[todolist.id]
                        if (todolist.filter === 'active') {
                            taskForTodolist = taskForTodolist.filter(task => !task.isDone)
                        }
                        if (todolist.filter === 'completed') {
                            taskForTodolist = taskForTodolist.filter(task => task.isDone)
                        }
                        return (
                            <Grid item>
                                <Paper variant={'outlined'} elevation={6} style={{padding: '10px', margin: '10px'}}>
                                    <Todolist
                                        key={todolist.id}
                                        id={todolist.id}
                                        title={todolist.title}
                                        //tasks={taskForTodolist}
                                        filter={todolist.filter}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        deleteTask={deleteTask}
                                        deleteTodolist={deleteTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>

            </Container>

        </div>
    );
}

export default App;
