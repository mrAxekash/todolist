import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {Header} from "./Header";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid";
import {
    addTaskTC,
    changeTaskTitleAndStatusTC,
    deleteTaskTC,
} from "./state/tasks-reducer";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC, deleteTodolistTC, fetchTodolistsTC,
    TodolistsType,
} from './state/todolists-reducer';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./state/store";
import {TaskStatuses, TaskType} from "./api/task-api";
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";


export type FilteredValuesType = 'all' | 'active' | 'completed'


export type TasksType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, TodolistsType[]>((state) => state.todolists)
    const dispatch = useAppDispatch()

    //tasks function
    const deleteTask = useCallback((taskId: string, todolistID: string) => {
        dispatch(deleteTaskTC(todolistID, taskId))
    }, [])

    const addTask = useCallback((newTaskTitle: string, todolistID: string) => {
        dispatch(addTaskTC(newTaskTitle, todolistID))
    }, [])

    const changeTaskStatus = useCallback((taskId: string, newStatus: TaskStatuses, todolistID: string) => {
        //dispatch(changeTaskStatusAC(taskId, isDone, todolistID))
        dispatch(changeTaskTitleAndStatusTC(todolistID, taskId, {status: newStatus}))
    }, [])

    const changeTaskTitle = useCallback((todolistID: string, taskID: string, newTitle: string) => {
        // dispatch(changeTaskTitleTC(todolistID, taskID, newTitle))
        dispatch(changeTaskTitleAndStatusTC(todolistID, taskID, {title: newTitle}))
    }, [])

    //todolists function

    const deleteTodolist = useCallback((todolistID: string) => {
        dispatch(deleteTodolistTC(todolistID))
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])

    const changeFilter = useCallback((todolistId: string, filter: FilteredValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [])

    const changeTodolistTitle = useCallback((todolistID: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(todolistID, newTitle))
    }, [])


    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    return (
        <div className="App">
            <ErrorSnackbar />
            <Header/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callback={addTodolist} />
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
                                        entityStatus={todolist.entityStatus}
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
