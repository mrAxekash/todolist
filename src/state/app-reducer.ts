import {Dispatch} from "redux";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = typeof initialState

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>

export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>

export type SetIsInitializedAC = ReturnType<typeof setIsInitializedAC>

type ActionType = SetAppStatusACType | SetAppErrorACType | SetIsInitializedAC


const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.newStatus}
        }
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
        }
        case 'APP/SET-IS-INITIALIZED': {
            return {...state, isInitialized: action.initializedValue}
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

export const setIsInitializedAC = (initializedValue: boolean) => {
    return {
        type: 'APP/SET-IS-INITIALIZED',
        initializedValue
    } as const
}


