import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";
import { tasksAPI } from '../api/tasks-api';

export default {
    title: 'API'
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '6aa5539f-800c-4a67-8d88-98b8337a14e3'
        const taskId = 'a2b7d82d-78ec-4a5a-b3dd-6465bef378b0'
        const title = 'great_task-----------------'
        tasksAPI.updateTask(todolistId, taskId, title)
            .then((res) => {
                debugger
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '6aa5539f-800c-4a67-8d88-98b8337a14e3';
        const taskId = 'bd247078-71ab-408d-9c84-0c696caad8a6';

        tasksAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "6aa5539f-800c-4a67-8d88-98b8337a14e3"
        const title = 'new task'
        tasksAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data);
            })


    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "6aa5539f-800c-4a67-8d88-98b8337a14e3"
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })


    }, [])

    return <div> {JSON.stringify(state)}</div>
}



export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })


    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "reaaaaaaaaaaaaaaaaaaaaaaaaaaaacccccccccccccccccccccccccctttttttttttttttttttttttttttttt"
        todolistAPI.createTodolist(title).then((res) => {
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'b8d9859b-e61b-44b6-9600-72764f2528cb';
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '0ced888d-9ca4-4ad6-b14b-20e2d1d7c459'
        const title = '-----------------------------------------'
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
