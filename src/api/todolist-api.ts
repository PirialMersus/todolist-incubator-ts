import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '58f1b79a-5b08-4add-9043-639dedc61352'
    }
})

type TodolistType= {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title: title})
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title})
        return promise
    },
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>('todo-lists')
        return promise
    }
}
