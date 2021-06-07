import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import { AppRootStateType } from "./store";

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

type ActionType = RemoveTodoListsAT |
    AddTodoListsAT |
    ChangeTodoListTitleAT |
    ChangeTodoListFilterAT |
    SetTodoListsAT

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
                order: action.order
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
                return {...tl, filter: 'all'}
            })
        default:
            return state
    }
}
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
        todolistAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodoListsAC(title,
                    res.data.data.item.id,
                    res.data.data.item.order,
                    res.data.data.item.addedDate
                ))
            })
    }
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistId)
        .then(() => {
            const action = removeTodoListsAC(todolistId);
            dispatch(action);
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const allTodosFromState = getState().todolists;
    const todo = allTodosFromState.find(t => {
        return t.id === todolistId
    })
    if (todo) {
        todolistAPI.updateTodolist(todolistId, title)
            .then(() => {
                const action = changeTodoListTitleAC(todolistId, title)
                dispatch(action)
            })
    }
}

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(setTodosAC(res.data))
        })
}