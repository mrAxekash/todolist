import * as React from 'react';
import {ChangeEvent, useCallback, useState} from "react";
import TextField from "@mui/material/TextField";

type Props = {
    value: string
    callback: (newTitle: string) => void
    disabled: boolean
};

export const EditableSpan = React.memo((props: Props) => {

    let [editMode, setEditMode] = useState(false)
    let [value, setValue] = useState(props.value)

    const activateEditMode = useCallback(() => {
        if(!props.disabled) {
            setEditMode(true)
            setValue(props.value)
        } else {
            setEditMode(false)
        }
    }, [props.value, editMode,props.disabled])

    const activateViewMode = useCallback(() => {
        setEditMode(false)
        props.callback(value)
    }, [props.callback, editMode, value])

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
                    type="text"
                    //disabled={props.disabled}
                /> :
                <span
                    onDoubleClick={activateEditMode}

                >
                    {props.value}
                    </span>}
        </>
    );
})