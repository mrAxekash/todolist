import {todolistsAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../state/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {FilteredValuesType} from "../AppWithRedux";

//types

export type TodolistsType = TodolistType & {
    filter: FilteredValuesType
    entityStatus: RequestStatusType
}

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType
    | ChangeTodolistEntityStatusActionType


export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>

//action-creators

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id
    } as const
}

export const addTodolistAC = (newTodolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        newTodolist
    } as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id, title
    } as const
}

export const changeTodolistFilterAC = (id: string, filter: FilteredValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id,
        filter
    } as const
}

export const setTodolistsAC = (data: TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        data
    } as const
}

export const changeTodolistEntityStatusAC = (entityStatus: RequestStatusType, todolistID: string) => {
    return {
        type: 'CHANGE-TODOLIST-ENTITY-STATUS',
        entityStatus, todolistID
    } as const
}

//reducer
const initialState: Array<TodolistsType> = []

export const todolistsReducer = (state: Array<TodolistsType> = initialState, action: ActionType): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(todo => todo.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.newTodolist, filter: 'all', entityStatus: 'idle'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(todolist => todolist.id === action.id ? {...todolist, title: action.title} : todolist)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(todo => todo.id === action.id ? {...todo, filter: action.filter} : todo)
        }
        case "SET-TODOLISTS": {
            return action.data.map(todo => {
                return {...todo, filter: 'all', entityStatus: 'idle'}
            })
        }
        case 'CHANGE-TODOLIST-ENTITY-STATUS': {
            return state.map(todo => todo.id === action.todolistID ? {...todo, entityStatus: action.entityStatus} : todo)
        }
        default:
            return state
    }
}

//thunks

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const deleteTodolistTC = (todolistID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC('loading', todolistID))
    todolistsAPI.deleteTodolist(todolistID)
        .then(res => {
            if(res.resultCode === 0) {
                dispatch(removeTodolistAC(todolistID))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const addTodolistTC = (newTitle: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.addTodolist(newTitle)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(addTodolistAC(res.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const changeTodolistTitleTC = (todolistID: string, newTitle: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.updateTodolistTitle(newTitle, todolistID)
        .then(res => {
            if(res.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todolistID, newTitle))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

