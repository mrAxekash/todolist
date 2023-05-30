import * as React from 'react';
import {ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";

type Props = {
    value: string
    callback: (newTitle: string) => void
};
export const EditableSpan = (props: Props) => {

    let [editMode, setEditMode] = useState(false)
    let [value, setValue] = useState(props.value)

    const activateEditMode = () => {
        setEditMode(true)
        setValue(props.value)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.callback(value)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        <>
            {editMode ?
                <TextField
                    variant="outlined"
                    value={value}
                    autoFocus
                    onBlur={activateViewMode}
                    onChange={onChangeHandler}
                    type="text"/> :
                <span
                    onDoubleClick={activateEditMode}>
                    {props.value}
                    </span>}


        </>
    );
};