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
};
export const Todolist = (props: Props) => {

    const [title, setTitle] = useState('')

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
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
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(task => {

                    const onClickHandler = () => props.deleteTask(task.id)

                    return <li
                        key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={onClickHandler}>✖</button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedChangeHandler}>Completed</button>
            </div>
        </div>
    );
};