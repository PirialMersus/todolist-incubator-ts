export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: 'Super buper'
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
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
type SetAppStatusAC = ReturnType<typeof setAppStatusAC>
export const setErrorAC = (error: null | string) => ({
    type: 'APP/SET-ERROR',
    error
}) as const
type SetErrorAC = ReturnType<typeof setErrorAC>

type ActionsType = SetAppStatusAC | SetErrorAC