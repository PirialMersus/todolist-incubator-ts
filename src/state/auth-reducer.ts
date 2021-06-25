import { Dispatch } from 'redux'
import { SetErrorACType, setAppStatusAC, SetAppStatusACType } from './app-reducer'
import {authAPI} from "../api/todolist-api";
import {changeTodolistEntityStatusAC} from "./todolists-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {addTaskAC} from "./tasks-reducer";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (email: string, password: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(email, password)
        .then((res) => {
            // debugger
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                // debugger
                handleServerAppError(res.data, dispatch)
                // if (res.data.messages.length) {
                //     dispatch(setErrorAC(res.data.messages[0]))
                // } else {
                //     dispatch(setErrorAC('Some error occured'))
                // }
                // dispatch(setAppStatusAC('failed'))
            }
        })
        .catch((error) => {
            debugger
            handleServerNetworkError(error, dispatch)
            // dispatch(setErrorAC(error.message))
            // dispatch(setAppStatusAC('failed'))

        })

}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusACType | SetErrorACType
