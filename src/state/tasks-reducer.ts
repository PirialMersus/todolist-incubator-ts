import {v1} from "uuid";
import {AddTodoListsAT, RemoveTodoListsAT, SetTodoListsAT} from "./todolists-reducer";
import {TaskStatuses, TaskType, tasksAPI} from "../api/tasks-api";
import {TasksType} from "../AppWithRedux";
import { Dispatch } from "redux";
import {AppRootStateType} from "./store";

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
            debugger
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
    debugger
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
    debugger
    return (dispatch: Dispatch) => {
        debugger
        tasksAPI.createTask(todolistId, taskTitile)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export const changeTaskTitleTC = (taskId: string, todolistId: string, newTitle: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
// те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком
// чтобы у неё отобрать остальные св-ва

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
            }).then(() => {
                const action = editTaskTitleAC(taskId, newTitle, todolistId)
                dispatch(action)
            })
        }
    }
}
export const removeTaskTC = (todolistId: string, id: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todolistId, id)
        .then(() => {
            const action = removeTaskAC(id, todolistId);
            dispatch(action);
        })
}

export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
// те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва

        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => {
            return t.id === taskId
        })


        if (task) {
            tasksAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            }).then(() => {
                const action = changeTaskStatusAC(taskId, status, todolistId)
                dispatch(action)
            })
        }
    }
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
            })
    }
}

