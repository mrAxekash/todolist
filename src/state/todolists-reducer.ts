import {FilteredValuesType} from "../App";
import {todolistsAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

//types

export type TodolistsType = TodolistType & {
    filter: FilteredValuesType
}

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType


export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

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

//reducer
const initialState: Array<TodolistsType> = []

export const todolistsReducer = (state: Array<TodolistsType> = initialState, action: ActionType): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(todo => todo.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.newTodolist, filter: 'all'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(todolist => todolist.id === action.id ? {...todolist, title: action.title} : todolist)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(todo => todo.id === action.id ? {...todo, filter: action.filter} : todo)
        }
        case "SET-TODOLISTS": {
            return action.data.map(todo => {
                return {...todo, filter: 'all'}
            })
        }
        default:
            return state
    }
}

//thunks

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res))
        })
}

export const deleteTodolistTC = (todolistID: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(todolistID)
        .then(res => {
            dispatch(removeTodolistAC(todolistID))
        })
}

export const addTodolistTC = (newTitle: string) => (dispatch: Dispatch) => {
    todolistsAPI.addTodolist(newTitle)
        .then(res => {
            dispatch(addTodolistAC(res.data.item))
        })
}

export const changeTodolistTitleTC = (todolistID: string, newTitle: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolistTitle(newTitle, todolistID)
        .then(res => {
            dispatch(changeTodolistTitleAC(todolistID, newTitle))
        })
}

