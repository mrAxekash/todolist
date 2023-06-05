import * as React from 'react';
import {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton/IconButton";
import {AddBox} from "@mui/icons-material";

type Props = {
    callback: (title: string) => void
    disabled?: boolean
};
export const AddItemForm = React.memo( (props: Props) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null) {
            setError(null)
        }
        if(e.key === 'Enter') {
            props.callback(title)
            setTitle('')
        }
    }

    const addItem = () => {
        if (title.trim() !== '') {
            props.callback(title.trim())
            setTitle('')
        } else {
            setError('Error! Title is required!')
        }
    }

    return (
        <div>
            <TextField
                error={!!error}
                variant="outlined"
                onChange={onChangeHandler}
                value={title}
                onKeyDown={onKeyDownHandler}
                label={'Title'}
                helperText={error}
                disabled={props.disabled}
            />
            <IconButton color={'primary'} onClick={addItem} disabled={props.disabled} >
                <AddBox />
            </IconButton>
        </div>
    );
});