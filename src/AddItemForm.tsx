import * as React from 'react';
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    callback: (title: string) => void
};
export const AddItemForm = (props: Props) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
            <input
                onChange={onChangeHandler}
                value={title}
                onKeyDown={onKeyDownHandler}
                className={error ? 'error' : ''}
            />
            <button
                onClick={addItem}
            >
                +
            </button>
            {error && <div className={'errorText'}> {error} </div>}
        </div>
    );
};