import {FilteredValuesType} from "../App";
import {v1} from "uuid";
import {TodolistsType} from '../AppWithReducers';

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistID: string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilteredValuesType
}

//action-creators

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title, todolistID: v1()
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


const initialState: Array<TodolistsType> = []

export const todolistsReducer = (state: Array<TodolistsType> = initialState, action: ActionType): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(todo => todo.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const newTask: TodolistsType = {id: action.todolistID, title: action.title, filter: 'all'}
            return [...state, newTask]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(todolist => todolist.id === action.id ? {...todolist, title: action.title} : todolist)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(todo => todo.id === action.id ? {...todo, filter: action.filter} : todo)
        }
        default:
            return state
    }
}