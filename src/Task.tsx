import * as React from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {ChangeEvent, useCallback} from "react";
import {TaskStatuses} from "./api/task-api";
import {changeTaskEntityStatusAC, TaskDomainType} from "./state/tasks-reducer";
import {useAppDispatch} from "./state/store";


type Props = {
    todolistID: string
    taskID: string
    task: TaskDomainType
    changeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void
    deleteTask: (taskId: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, newStatus: TaskStatuses, todolistID: string) => void
};
export const Task = (props: Props) => {

    const dispatch = useAppDispatch()

    const changeTaskTitle = useCallback( (newTitle: string) => {
        dispatch(changeTaskEntityStatusAC('loading', props.taskID, props.todolistID))
        props.changeTaskTitle(props.todolistID, props.taskID, newTitle)
    }, [props.changeTaskTitle, props.todolistID, props.taskID])

    const onClickHandler = useCallback( () => {
        dispatch(changeTaskEntityStatusAC('loading', props.taskID, props.todolistID))
        props.deleteTask(props.taskID, props.todolistID)
    }, [props.deleteTask, props.taskID, props.todolistID])

    const onChangeHandler = useCallback ((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskEntityStatusAC('loading', props.taskID, props.todolistID))
        props.changeTaskStatus(props.taskID, e.currentTarget.checked ? 2 : 0, props.todolistID)
    }, [props.changeTaskStatus, props.taskID, props.todolistID, props.task.entityStatus])

    console.log(props.task.entityStatus === 'loading')

    return (<div
            key={props.todolistID}
            className={props.task.status === 2 ? 'is-done' : ''}
        >
            <Checkbox checked={props.task.status === 2} onChange={onChangeHandler} disabled={props.task.entityStatus === 'loading'}/>
            <EditableSpan value={props.task.title} callback={changeTaskTitle} disabled={props.task.entityStatus === 'loading'}/>

            {<IconButton aria-label="delete" size={'small'} onClick={onClickHandler} disabled={props.task.entityStatus === 'loading'}>
                <DeleteIcon fontSize={'small'}/>
            </IconButton>}
        </div>
    );
};