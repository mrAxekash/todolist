import * as React from 'react';
import {FilteredValuesType} from "./App";
import {useCallback, useEffect} from "react";
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./state/store";
import {Task} from "./Task";
import {setTasksTC} from "./state/tasks-reducer";
import {TaskStatuses, TaskType} from './api/task-api';

type Props = {
    id: string
    title: string
    deleteTask: (taskId: string, todolistID: string) => void
    filter: FilteredValuesType
    changeFilter: (todolistId: string, filter: FilteredValuesType) => void
    addTask: (newTaskTitle: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, newStatus: TaskStatuses, todolistID: string) => void
    deleteTodolist: (todolistID: string) => void
    changeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void
    changeTodolistTitle: (todolistID: string, newTitle: string) => void
};
export const Todolist = React.memo((props: Props) => {

    let stateTasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(setTasksTC(props.id))
    }, [])

    let tasks = stateTasks

    if (props.filter === 'active') {
        tasks = stateTasks.filter(task => task.status === 0)
    }
    if (props.filter === 'completed') {
        tasks = stateTasks.filter(task => task.status === 2)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.id, 'all'), [props.changeFilter, props.id])

    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, 'active'), [props.changeFilter, props.id])

    const onCompletedChangeHandler = useCallback(() => props.changeFilter(props.id, 'completed'), [props.changeFilter, props.id])


    const deleteTodolist = useCallback(() => {
        props.deleteTodolist(props.id)
    }, [props.deleteTodolist, props.id])

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.changeTodolistTitle, props.id])


    return (
        <div>
            <h3>
                <EditableSpan value={props.title} callback={changeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={deleteTodolist}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm callback={addTask}/>
            <div>
                {tasks.map(task => {
                    return <Task
                        key={task.id}
                        todolistID={props.id}
                        taskID={task.id}
                        task={task}
                        changeTaskTitle={props.changeTaskTitle}
                        deleteTask={props.deleteTask}
                        changeTaskStatus={props.changeTaskStatus}
                    />
                })}
            </div>
            <div>

                <Button
                    onClick={onAllClickHandler}
                    variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    size={'small'}
                >
                    All
                </Button>

                <Button
                    onClick={onActiveClickHandler}
                    variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    size={'small'}
                >
                    Active
                </Button>

                <Button
                    onClick={onCompletedChangeHandler}
                    variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    size={'small'}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
});