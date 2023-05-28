import * as React from 'react';
import {FilteredValuesType} from "./App";
import {ChangeEvent, useState, KeyboardEvent} from "react";
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';


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

    const onAllClickHandler = () => props.changeFilter( props.id ,'all')

    const onActiveClickHandler = () => props.changeFilter(props.id ,'active')

    const onCompletedChangeHandler = () => props.changeFilter(props.id ,'completed')


    const deleteTodolist = () => {
        props.deleteTodolist(props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }


    return (
        <div>
            <h3>
                <EditableSpan value={props.title} callback={changeTodolistTitle} />
                <button onClick={deleteTodolist}>X</button>
            </h3>
            <AddItemForm callback={addTask} />
            <ul>
                {props.tasks.map(task => {

                    const changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(props.id, task.id, newTitle)
                    }

                    const onClickHandler = () => props.deleteTask(task.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                    }

                    return <li
                        key={task.id}
                        className={task.isDone ? 'is-done' : ''}
                    >
                        <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>

                        <EditableSpan value={task.title} callback={changeTaskTitle} />
                        {/*<span>{task.title}</span>*/}

                        <button onClick={onClickHandler}>✖</button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler} className={props.filter === 'all' ? 'active-filter' : ''}>All
                </button>
                <button onClick={onActiveClickHandler}
                        className={props.filter === 'active' ? 'active-filter' : ''}>Active
                </button>
                <button onClick={onCompletedChangeHandler}
                        className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
                </button>
            </div>
        </div>
    );
};