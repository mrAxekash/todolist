import * as React from 'react';
import {FilteredValuesType} from "./App";
import {ChangeEvent, useState, KeyboardEvent} from "react";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type Props = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: string) => void
    filter: FilteredValuesType
    changeFilter: (filter: FilteredValuesType) => void
    addTask: (newTaskTitle: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
};
export const Todolist = (props: Props) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if(title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Error! Title is required!')
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') addTask()
    }

    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => props.changeFilter('active')

    const onCompletedChangeHandler = () => props.changeFilter('completed')


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    onChange={onChangeHandler}
                    value={title}
                    onKeyDown={onKeyDownHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'errorText'}> {error} </div>}
            </div>
            <ul>
                {props.tasks.map(task => {

                    const onClickHandler = () => props.deleteTask(task.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(task.id, e.currentTarget.checked)
                    }

                    return <li
                        key={task.id}
                        className={task.isDone ? 'is-done' : ''}
                    >
                        <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                        <span>{task.title}</span>
                        <button onClick={onClickHandler}>✖</button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler} className={props.filter === 'all' ? 'active-filter' : ''}>All</button>
                <button onClick={onActiveClickHandler} className={props.filter === 'active' ? 'active-filter' : ''} >Active</button>
                <button onClick={onCompletedChangeHandler} className={props.filter === 'completed' ? 'active-filter' : ''} >Completed</button>
            </div>
        </div>
    );
};