import * as React from 'react';
import {FilteredValuesType} from "./App";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type Props = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: number) => void
    filter: FilteredValuesType
    changeFilter: (filter: FilteredValuesType) => void
};
export const Todolist = (props: Props) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(task => <li
                    key={task.id}
                >
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={() => props.deleteTask(task.id)}>✖</button>
                </li>)}
            </ul>
            <div>
                <button onClick={() => props.changeFilter('all')} >All</button>
                <button onClick={() => props.changeFilter('active')} >Active</button>
                <button onClick={() => props.changeFilter('completed')} >Completed</button>
            </div>
        </div>
    );
};