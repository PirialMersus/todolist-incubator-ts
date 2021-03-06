import axios from 'axios'
import {RequestStatusType} from "../state/app-reducer";

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '9476c46e-7c10-4ffa-9254-18d86a739ede'
    }
})

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
    entityStatus: RequestStatusType
}

type ResponseType<D> = {
    resultCode: number
    fieldsErrors: Array<string>
    messages: Array<string>
    data: D
}
type GetTasksResponseType = {
    error: null | string
    items: Array<TaskType>
    totalCount: number
}
type DeleteTaskResponseType = {
    resultCode: number
    data: {}
    messages: Array<string>
    fieldsErrors: Array<string>
}
type UpdateTaskResponseType = {
    resultCode: number
    data: {item: TaskType}
    messages: Array<string>
    fieldsErrors: Array<string>
}

export const tasksAPI = {
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        const promise = instance.put<UpdateTaskResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {
        const promise = instance.delete<DeleteTaskResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    },
    createTask(todolistId: string, title: string) {
        const promise = instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
        return promise
    },
    getTasks(todolistId: string) {
        const promise = instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
        return promise
    }
}
