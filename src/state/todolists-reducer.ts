import {FilterValuesType, TodoListType} from "../App.txt";
import {v1} from "uuid";

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
    addedDate: string,
    order: number
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

type ActionType = RemoveTodoListsAT |
    AddTodoListsAT |
    ChangeTodoListTitleAT |
    ChangeTodoListFilterAT |
    SetTodoListsAT

const initialState: Array<TodoListType> = []

export const todoListReducer = (state: Array<TodoListType> = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":{
            return state.filter(tl => tl.id !== action.id)
        }
        case "ADD-TODOLIST":{
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: action.addedDate,
                order: action.order
            }, ...state]
        }
        case "CHANGE-TODOLIST-TITLE":{
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER":{
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case "SET-TODOLISTS":
            return action.todos.map(tl => ({
                ...tl,
                filter: 'all'
            }))
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
export const setTodosAC = (todos: Array<TodoListType>) => {
    return ({
        type: "SET-TODOLISTS",
        todos
    }as const)
}
export type SetTodoListsAT = ReturnType<typeof setTodosAC>