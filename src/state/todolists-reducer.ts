import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {RequestStatusType, setAppStatusAC, setErrorAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


export type FilterValuesType = "all" | "active" | "completed"

export type RemoveTodoListsAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
// export type SetTodoListsAT = {
//     type: "SET-TODOLISTS"
//     todolistId: string
// }
export type AddTodoListsAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
    addedDate: string
    order: number
}
type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string,
    title: string
}
type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    id: string
}

type ActionType = RemoveTodoListsAT
    | AddTodoListsAT
    | ChangeTodoListTitleAT
    | ChangeTodoListFilterAT
    | SetTodoListsAT
    | ChangeTodolistEntityStatusACType

const initialState: Array<TodolistDomainType> = []

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todoListReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case "ADD-TODOLIST": {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: action.addedDate,
                order: action.order,
                entityStatus: "succeeded"
            }, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case "SET-TODOLISTS":
            return action.todos.map(tl => {
                return {...tl, filter: 'all', entityStatus: "succeeded"}
            })
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему entityStatus
                todolist.entityStatus = action.entityStatus;
            }
            return [...state]
        default:
            return state
    }
}
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    id,
    entityStatus
} as const)
export type ChangeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>

export const changeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterAT => {
    return ({
        type: "CHANGE-TODOLIST-FILTER",
        id,
        filter
    })
}
export const changeTodoListTitleAC = (id: string,
                                      title: string): ChangeTodoListTitleAT => {
    return ({
        type: "CHANGE-TODOLIST-TITLE",
        id,
        title
    })
}
export const addTodoListsAC = (title: string, id: string, order: number, addedDate: string): AddTodoListsAT => {
    return ({
        type: 'ADD-TODOLIST',
        title,
        todolistId: id,
        order,
        addedDate
    })
}
export const removeTodoListsAC = (todolistId: string): RemoveTodoListsAT => {
    return ({
        type: "REMOVE-TODOLIST",
        id: todolistId
    })
}
export const setTodosAC = (todos: Array<TodolistType>) => {
    return ({
        type: "SET-TODOLISTS",
        todos
    } as const)
}
export type SetTodoListsAT = ReturnType<typeof setTodosAC>

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodoListsAC(title,
                        res.data.data.item.id,
                        res.data.data.item.order,
                        res.data.data.item.addedDate
                    ))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                    // if (res.data.messages.length) {
                    //     dispatch(setErrorAC(res.data.messages[0]))
                    // } else {
                    //     dispatch(setErrorAC('Some error occurred'))
                    // }
                    // dispatch(setAppStatusAC('failed'))
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    dispatch(setAppStatusAC('loading'))
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                const action = removeTodoListsAC(todolistId);
                dispatch(action);
                dispatch(setAppStatusAC('succeeded'))
                dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)

            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const allTodosFromState = getState().todolists;
    const todo = allTodosFromState.find(t => {
        return t.id === todolistId
    })
    if (todo) {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const action = changeTodoListTitleAC(todolistId, title)
                    dispatch(action)
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)

                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolists()
        .then((res) => {
            if (res.data) {
                dispatch(setTodosAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                dispatch(setErrorAC('Something is wrong'))
                dispatch(setAppStatusAC('failed'))
            }
        })
        .catch(error => {
            dispatch(setErrorAC('Unknown error'))
            dispatch(setAppStatusAC('failed'))
        })
}