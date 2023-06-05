import {Dispatch} from "redux";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = typeof initialState

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>

export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>

type ActionType = SetAppStatusACType | SetAppErrorACType


const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
} as const

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.newStatus}
        }
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
        }
        default:
            return state
    }
}

//action creator

export const setAppStatusAC = (newStatus: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        newStatus
    } as const
}

export const setAppErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}


