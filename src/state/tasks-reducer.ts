import {AddTodoListsAT, RemoveTodoListsAT, SetTodoListsAT, changeTodolistEntityStatusAC} from "./todolists-reducer";
import {tasksAPI, TaskStatuses, TaskType} from "../api/tasks-api";
import {TasksType} from "../App";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {RequestStatusType, setAppStatusAC, setErrorAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

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
    | ChangeTaskEntityStatusACType

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: ActionType): TasksType => {
    switch (action.type) {
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks.map((task => {
                return {...task, entityStatus: 'succeeded'}
            }))
            return stateCopy
        }
        case 'ADD_TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }

        case "EDIT_TASK_TITLE": {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }

        case "CHANGE_TASK_STATUS": {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }

        case "REMOVE_TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }

        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
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
        case 'CHANGE-TASK-ENTITY-STATUS':
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, entityStatus: action.entityStatus} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        default:
            return state
    }
}
export const changeTaskEntityStatusAC = (taskId: string, todolistId: string, entityStatus: RequestStatusType) => ({
    type: 'CHANGE-TASK-ENTITY-STATUS',
    taskId,
    todolistId,
    entityStatus
} as const)
export type ChangeTaskEntityStatusACType = ReturnType<typeof changeTaskEntityStatusAC>

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
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}

export const addTaskTC = (todolistId: string, taskTitile: string) => {
    return (dispatch: Dispatch) => {
        // dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
        tasksAPI.createTask(todolistId, taskTitile)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                    // dispatch(setAppStatusAC('succeeded'))
                    dispatch(changeTodolistEntityStatusAC(todolistId, "succeeded"))
                } else {
                    handleServerAppError(res.data, dispatch)
                    // if (res.data.messages.length) {
                    //     dispatch(setErrorAC(res.data.messages[0]))
                    // } else {
                    //     dispatch(setErrorAC('Some error occured'))
                    // }
                    // dispatch(setAppStatusAC('failed'))
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
                // dispatch(setErrorAC(error.message))
                // dispatch(setAppStatusAC('failed'))

            })
    }
}

export const changeTaskTitleTC = (taskId: string, todolistId: string, newTitle: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTaskEntityStatusAC(taskId, todolistId, "loading"))
        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })
        if (task) {
            tasksAPI.updateTask(todolistId, taskId, {
                title: newTitle,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            })
                .then((res) => {
                    // debugger
                    if (res.data.resultCode === 0) {
                        dispatch(changeTaskEntityStatusAC(taskId, todolistId, "succeeded"))
                        const action = editTaskTitleAC(newTitle, todolistId, taskId)
                        dispatch(action)
                        dispatch(setAppStatusAC('succeeded'))
                    } else {
                        handleServerAppError(res.data, dispatch)
                        dispatch(changeTaskEntityStatusAC(taskId, todolistId, "failed"))
                        // dispatch(setErrorAC(res.data.messages[0]))
                        // dispatch(setAppStatusAC('failed'))
                    }
                })
                .catch((error) => {
                    handleServerNetworkError(error, dispatch)
                    dispatch(changeTaskEntityStatusAC(taskId, todolistId, "failed"))
                    // dispatch(setErrorAC(error.message))
                    // dispatch(setAppStatusAC('failed'))

                })
        }
    }
}
export const removeTaskTC = (todolistId: string, id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC(id, todolistId, "loading"))
    tasksAPI.deleteTask(todolistId, id)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTaskEntityStatusAC(id, todolistId, "succeeded"))
                const action = removeTaskAC(id, todolistId);
                dispatch(action);
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(changeTaskEntityStatusAC(id, todolistId, "failed"))
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
            dispatch(changeTaskEntityStatusAC(id, todolistId, "failed"))

        })
}

export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(changeTaskEntityStatusAC(taskId, todolistId, "loading"))
        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })
        if (task) {
            dispatch(setAppStatusAC('loading'))

            tasksAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            })
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(changeTaskEntityStatusAC(taskId, todolistId, "succeeded"))
                        const action = changeTaskStatusAC(taskId, status, todolistId)
                        dispatch(action)
                        dispatch(setAppStatusAC('succeeded'))
                    } else {
                        handleServerAppError(res.data, dispatch)
                        dispatch(changeTaskEntityStatusAC(taskId, todolistId, "failed"))

                    }
                })
                .catch((error) => {
                    handleServerNetworkError(error, dispatch)
                    dispatch(changeTaskEntityStatusAC(taskId, todolistId, "failed"))

                })
        }
    }
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                if (!res.data.error) {
                    const tasks = res.data.items
                    const action = setTasksAC(tasks, todolistId)
                    dispatch(action)
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    dispatch(setErrorAC(res.data.error))
                    dispatch(setAppStatusAC('failed'))
                }
            })
            .catch((error) => {
                dispatch(setErrorAC(error.message))
                dispatch(setAppStatusAC('failed'))

            })
    }
}

