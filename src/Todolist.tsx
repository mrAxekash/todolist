import * as React from 'react';
import {FilteredValuesType} from "./App";
import {ChangeEvent, useState, KeyboardEvent} from "react";
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type Props = {
    id: string
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: string, todolistID: string) => void
    filter: FilteredValuesType
    changeFilter: (todolistId: string, filter: FilteredValuesType) => void
    addTask: (newTaskTitle: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void
    deleteTodolist: (todolistID: string) => void
    changeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void
    changeTodolistTitle: (todolistID: string, newTitle: string) => void
};
export const Todolist = (props: Props) => {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onAllClickHandler = () => props.changeFilter(props.id, 'all')

    const onActiveClickHandler = () => props.changeFilter(props.id, 'active')

    const onCompletedChangeHandler = () => props.changeFilter(props.id, 'completed')


    const deleteTodolist = () => {
        props.deleteTodolist(props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }


    return (
        <div>
            <h3>
                <EditableSpan value={props.title} callback={changeTodolistTitle}/>
                <IconButton aria-label="delete">
                    <DeleteIcon onClick={deleteTodolist}/>
                </IconButton>
            </h3>
            <AddItemForm callback={addTask}/>
            <div>
                {props.tasks.map(task => {

                    const changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(props.id, task.id, newTitle)
                    }

                    const onClickHandler = () => props.deleteTask(task.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                    }

                    return <div
                        key={task.id}
                        className={task.isDone ? 'is-done' : ''}
                    >
                        <Checkbox checked={task.isDone} onChange={onChangeHandler} />
                        <EditableSpan value={task.title} callback={changeTaskTitle}/>

                        {<IconButton aria-label="delete" size={'small'}>
                            <DeleteIcon onClick={onClickHandler} fontSize={'small'} />
                        </IconButton>}
                    </div>
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
};