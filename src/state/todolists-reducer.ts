import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodoListsAT = {
    type: "REMOVE-TODOLIST"
    todolistId: string
}
type AddTodoListsAT = {
    type: "ADD-TODOLIST"
    title: string
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


export const todoListReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todolistId)
        case "ADD-TODOLIST":
            const todolistId = v1()
            const newTodolist: TodoListType = {
                id: todolistId,
                title: action.title,
                filter: "All"
            }

            return [...todoLists, newTodolist]
        case "CHANGE-TODOLIST-TITLE":
            return [...todoLists.map(tl => {
                if (tl.id === action.todoListId) {
                    return {...tl, title: action.title}
                } else {
                    return tl
                }
            })]
        case "CHANGE-TODOLIST-FILTER":
            return [...todoLists.map(tl => {
                if (tl.id === action.todolistId) {
                    return {...tl, filter: action.value}
                } else {
                    return tl
                }
            })]


        default:
            return todoLists
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
        title
    })
}
export const removeTodoListsAC = (todolistId: string): RemoveTodoListsAT => {
    return ({
        type: "REMOVE-TODOLIST",
        todolistId
    })
}