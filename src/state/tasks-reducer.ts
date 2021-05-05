import {TasksType} from "../App";
import {v1} from "uuid";
import {AddTodoListsAT, RemoveTodoListsAT} from "./todolists-reducer";

type AddTaskAT = {
    type: "ADD_TASK"
    title: string
    todolistId: string
}
type EditTaskTitleAT = {
    type: "EDIT_TASK_TITLE"
    title: string
    todolistId: string
    taskId: string
}
type RemoveTaskAT = {
    type: "REMOVE_TASK"
    todoListId: string,
    taskId: string
}
type ChangeTaskStatusAT = {
    type: "CHANGE_TASK_STATUS"
    taskId: string
    todolistId: string
    newIsDoneValue: boolean
}


type ActionType = AddTaskAT
    | EditTaskTitleAT
    | RemoveTaskAT
    | ChangeTaskStatusAT
    | AddTodoListsAT
    | RemoveTodoListsAT

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: ActionType): TasksType => {
    switch (action.type) {
        case "ADD_TASK":
            const tasksCopy1 = {...state}
            if (action.title.trim().length !== 0) {
                const newTask = {
                    id: v1(), title: action.title, isDone: false
                }
                const todolistTasks = tasksCopy1[action.todolistId]
                tasksCopy1[action.todolistId] = [newTask, ...todolistTasks]
            }
            return tasksCopy1

        case "EDIT_TASK_TITLE":
            return {
                ...state, [action.todolistId]: [...state[action.todolistId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, title: action.title}
                    } else {
                        return task
                    }
                })]
            }

        case "CHANGE_TASK_STATUS":
            let todolistTasks = state[action.todolistId]
            const task = todolistTasks.find(task => task.id === action.taskId)
            if (task) {
                task.isDone = action.newIsDoneValue
            }
            return {...state}

        case "REMOVE_TASK":
            const tasksCopy = {...state}
            const tasksFromOurTodolist = tasksCopy[action.todoListId]
            const filteredTasks = tasksFromOurTodolist.filter(t => t.id !== action.taskId);
            tasksCopy[action.todoListId] = filteredTasks
            return tasksCopy

        case "ADD-TODOLIST":
            const newTodoListObj = {...state, [action.id]: []}
            return newTodoListObj
            // const copyState= {...tasks}
            // copyState[action.id] = []
            // return copyState
        case "REMOVE-TODOLIST":
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        default:
            return state
    }
}
export const addTaskAC = (title: string,
                          todolistId: string): AddTaskAT => {
    return ({
        type: "ADD_TASK",
        todolistId,
        title
    })
}
export const editTaskTitleAC = (title: string, todolistId: string, taskId: string
): EditTaskTitleAT => {
    return ({
        type: "EDIT_TASK_TITLE",
        todolistId,
        title,
        taskId
    })
}
export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskAT => {
    return ({
        type: "REMOVE_TASK",
        taskId,
        todoListId
    })
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, newIsDoneValue: boolean): ChangeTaskStatusAT => {
    return ({
        type: "CHANGE_TASK_STATUS",
        taskId,
        todolistId,
        newIsDoneValue
    })
}
