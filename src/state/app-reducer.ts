import {authAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {setIsLoggedInAC} from "./auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type TypeOfInitialState = {
    status: RequestStatusType
    error: null | string
    isInitialized: boolean
}

const initialState: TypeOfInitialState = {
    status: 'idle' as RequestStatusType,
    error: null,
    isInitialized: false
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALISED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS',
    status
}) as const
export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>

export const setIsInitialisedAC = (isInitialized: boolean) => ({
    type: 'APP/SET-IS-INITIALISED',
    isInitialized
}) as const
export type SetIsInitialisedACType = ReturnType<typeof setIsInitialisedAC>


export const setErrorAC = (error: null | string) => ({
    type: 'APP/SET-ERROR',
    error
}) as const
export type SetErrorACType = ReturnType<typeof setErrorAC>

type ActionsType = SetAppStatusACType | SetErrorACType | SetIsInitialisedACType

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()

        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setIsInitialisedAC(true))
            } else {
                dispatch(setIsInitialisedAC(true))
            }
        })
}
// export const setIsInitialisedTC = (isInitialized: boolean) => (dispatch: Dispatch) => {
//     debugger
//     dispatch(setIsInitialisedAC(isInitialized))
// }
