export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type TypeOfInitialState = {
    status: RequestStatusType
    error: null | string
}

const initialState: TypeOfInitialState = {
    status: 'idle' as RequestStatusType,
    error: null
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS',
    status
}) as const
export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export const setErrorAC = (error: null | string) => ({
    type: 'APP/SET-ERROR',
    error
}) as const
export type SetErrorACType = ReturnType<typeof setErrorAC>

type ActionsType = SetAppStatusACType | SetErrorACType