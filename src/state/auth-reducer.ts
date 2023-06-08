import {Dispatch} from "redux";
import {setAppStatusAC, setIsInitializedAC} from "../state/app-reducer";
import {authAPI, LoginParamsType} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

//action creators

export const setIsLoggedInAC = (value: boolean) => {
    return {
        type: 'SET-IS-LOGGED-IN',
        value
    }
}

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-IS-LOGGED-IN": {
            return {...state, isLoggedIn: action.value}
        }
        default:
            return state
    }
}

//thunks

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const meTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then(res => {
            if(res.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setIsInitializedAC(true))
            } else {
                handleServerAppError(res, dispatch)
                dispatch(setIsInitializedAC(true))
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
            dispatch(setIsInitializedAC(true))
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if(res.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

//type

type InitialStateType = typeof initialState

export type AuthActionsType = SetIsLoggedInACType

type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>


