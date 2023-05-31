import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from './AddItemForm';
import {Header} from "./Header";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from './state/todolists-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type FilteredValuesType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string
    title: string
    filter: FilteredValuesType
}

export type TasksType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, TodolistsType[]>((state) => state.todolists)
    const dispatch = useDispatch()

    //tasks function
    const deleteTask = useCallback((taskId: string, todolistID: string) => {
        dispatch(removeTaskAC(taskId, todolistID))
    }, [])

    const addTask = useCallback((newTaskTitle: string, todolistID: string) => {
        dispatch(addTaskAC(newTaskTitle, todolistID))
    }, [])

    const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistID))
    }, [])

    const changeTaskTitle = useCallback((todolistID: string, taskID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(taskID, newTitle, todolistID))
    }, [])
    //todolists function

    const deleteTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [])

    const changeFilter = useCallback((todolistId: string, filter: FilteredValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [])

    const changeTodolistTitle = useCallback((todolistID: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistID, newTitle))
    }, [])

    return (
        <div className="App">
            <Header/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callback={addTodolist}/>
                </Grid>

                <Grid container spacing={3}>
                    {todolists.map(todolist => {
                        return (
                            <Grid item key={todolist.id}>
                                <Paper variant={'elevation'} elevation={6} style={{padding: '10px', margin: '10px'}}>
                                    <Todolist
                                        key={todolist.id}
                                        id={todolist.id}
                                        title={todolist.title}
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

export default AppWithRedux;
