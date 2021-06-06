import {v1} from "uuid";
import {AddTodoListsAT, RemoveTodoListsAT, SetTodoListsAT} from "./todolists-reducer";
import {TaskStatuses, TaskType} from "../api/tasks-api";
import {TasksType} from "../AppWithRedux";

type AddTaskAT = {
    type: "ADD_TASK"
    task: TaskType
}

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
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
    todolistId: string,
    taskId: string
}
type ChangeTaskStatusAT = {
    type: "CHANGE_TASK_STATUS"
    taskId: string
    todolistId: string
    status: TaskStatuses
}


type ActionType = AddTaskAT
    | EditTaskTitleAT
    | RemoveTaskAT
    | ChangeTaskStatusAT
    | AddTodoListsAT
    | RemoveTodoListsAT
    | SetTodoListsAT
    | SetTasksActionType

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: ActionType): TasksType => {
    switch (action.type) {
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case 'ADD_TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }

        case "EDIT_TASK_TITLE":{
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }

        case "CHANGE_TASK_STATUS":
        {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }

        case "REMOVE_TASK":{
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }

        case "ADD-TODOLIST":{
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST":{
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todos.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        default:
            return state
    }
}
export const addTaskAC = (task: TaskType): AddTaskAT => {
    return ({
        type: "ADD_TASK",
        task
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
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAT => {
    return ({
        type: "REMOVE_TASK",
        taskId,
        todolistId
    })
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusAT => {
    return ({
        type: "CHANGE_TASK_STATUS",
        status,
        todolistId,
        taskId
    })
}
