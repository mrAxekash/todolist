import * as React from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {ChangeEvent, useCallback} from "react";
import {TaskStatuses, TaskType} from "./api/task-api";


type Props = {
    todolistID: string
    taskID: string
    task: TaskType
    changeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void
    deleteTask: (taskId: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, newStatus: TaskStatuses, todolistID: string) => void
};
export const Task = (props: Props) => {

    const changeTaskTitle = useCallback( (newTitle: string) => {
        props.changeTaskTitle(props.todolistID, props.taskID, newTitle)
    }, [props.changeTaskTitle, props.todolistID, props.taskID])

    const onClickHandler = useCallback( () => props.deleteTask(props.taskID, props.todolistID), [props.deleteTask, props.taskID, props.todolistID])

    const onChangeHandler = useCallback ((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.taskID, e.currentTarget.checked ? 2 : 0, props.todolistID)
    }, [props.changeTaskStatus, props.taskID, props.todolistID])

    return (<div
            key={props.todolistID}
            className={props.task.status === 2 ? 'is-done' : ''}
        >
            <Checkbox checked={props.task.status === 2} onChange={onChangeHandler}/>
            <EditableSpan value={props.task.title} callback={changeTaskTitle}/>

            {<IconButton aria-label="delete" size={'small'} onClick={onClickHandler}>
                <DeleteIcon fontSize={'small'}/>
            </IconButton>}
        </div>
    );
};