import axios from 'axios'

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
        'API-KEY': '58f1b79a-5b08-4add-9043-639dedc61352'
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
        debugger
        const promise = instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
        return promise
    },
    getTasks(todolistId: string) {
        const promise = instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
        return promise
    }
}
