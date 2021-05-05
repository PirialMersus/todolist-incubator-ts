import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListsAT = {
    type: "REMOVE-TODOLIST"
    todolistId: string
}
 export type AddTodoListsAT = {
    type: "ADD-TODOLIST"
    title: string
     id: string
}
type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    todoListId: string,
    title: string
}
type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    value: FilterValuesType,
    todolistId: string
}

type ActionType = RemoveTodoListsAT | AddTodoListsAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

const initialState: Array<TodoListType> = []

export const todoListReducer = (state: Array<TodoListType> = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todolistId)
        case "ADD-TODOLIST":
            const newTodolist: TodoListType = {
                id: action.id,
                title: action.title,
                filter: "All"
            }
            const newTodoLists = [...state, newTodolist]
            return newTodoLists
        case "CHANGE-TODOLIST-TITLE":
            return [...state.map(tl => {
                if (tl.id === action.todoListId) {
                    return {...tl, title: action.title}
                } else {
                    return tl
                }
            })]
        case "CHANGE-TODOLIST-FILTER":
            return [...state.map(tl => {
                if (tl.id === action.todolistId) {
                    return {...tl, filter: action.value}
                } else {
                    return tl
                }
            })]


        default:
            return state
    }
}
export const changeTodoListFilterAC = (value: FilterValuesType,
                                       todolistId: string): ChangeTodoListFilterAT => {
    return ({
        type: "CHANGE-TODOLIST-FILTER",
        todolistId,
        value
    })
}
export const changeTodoListTitleAC = (todoListId: string,
                                      title: string): ChangeTodoListTitleAT => {
    return ({
        type: "CHANGE-TODOLIST-TITLE",
        todoListId,
        title
    })
}
export const addTodoListsAC = (title: string): AddTodoListsAT => {
    return ({
        type: "ADD-TODOLIST",
        title,
        id: v1()
    })
}
export const removeTodoListsAC = (todolistId: string): RemoveTodoListsAT => {
    return ({
        type: "REMOVE-TODOLIST",
        todolistId
    })
}