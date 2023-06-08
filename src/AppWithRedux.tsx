import React, {useEffect} from 'react';
import './App.css';

import {Header} from "./Header";
import Container from '@mui/material/Container';

import {
    TaskDomainType,
} from "./state/tasks-reducer";

import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {TodolistList} from "./features/TodolistList/TodolistList";
import {Login} from "./features/Login/Login";
import {useAppDispatch, useAppSelector} from "./state/store";
import {meTC} from "./state/auth-reducer";
import {CircularProgress} from "@mui/material";


export type FilteredValuesType = 'all' | 'active' | 'completed'


export type TasksType = {
    [key: string]: TaskDomainType[]
}

function AppWithRedux() {

    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(meTC())
    }, [])

    if(!isInitialized) {
        return (
            <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        )

    }


    return (
        <div className="App">
            <ErrorSnackbar />
            <Header/>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistList /> } />
                    <Route path={'/login'} element={<Login /> } />
                    <Route path={'/404'} element={<h1>ERROR 404</h1>} />
                    <Route path={'*'} element={ <Navigate to={'/404'}/>} />
                </Routes>
            </Container>

        </div>
    );
}

export default AppWithRedux;
