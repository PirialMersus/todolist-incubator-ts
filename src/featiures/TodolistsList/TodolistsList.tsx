import React, {useCallback, useEffect} from 'react'
import '../../App.css'
import {Grid, Paper} from "@material-ui/core";
import {TodolistType} from '../../api/todolist-api';
import {RequestStatusType} from '../../state/app-reducer';
import {TaskStatuses, TaskType} from "../../api/tasks-api";
import {AppRootStateType} from '../../state/store';
import {useDispatch, useSelector} from 'react-redux';
import {
    addTodolistTC,
    changeTodoListFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC
} from "../../state/todolists-reducer";
import {addTaskTC, changeTaskTitleTC, removeTaskTC, updateTaskStatusTC} from "../../state/tasks-reducer";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import {Todolist} from './Todolist/Todolist';
import { Redirect } from 'react-router-dom';

export type TodolistsType = Array<TodolistType>

export type TasksType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

function TodolistsList(props: PropsType) {
    const dispatch = useDispatch()
    const isLogin = useSelector<AppRootStateType, boolean>(state => state.authReducer.isLoggedIn)


    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks
    )
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status
    )

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [, tasks])

    const addTodolist = useCallback((todolistTitle: string) => {
        const action = addTodolistTC(todolistTitle)
        dispatch(action)
    }, [])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodoListFilterAC(todolistId, value))
    }, [])

    const editTodolistTitle = useCallback((todoListId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todoListId, title))
    }, [])


    const addTask = useCallback((todolistId: string, taskValue: string) => {
        if (taskValue.trim().length !== 0) {
            (dispatch(addTaskTC(todolistId, taskValue)))
        }
    }, [])

    const editTaskTitle = useCallback((value: string, todolistId: string, taskId: string) => {
        dispatch(changeTaskTitleTC(taskId, todolistId, value))
    }, [])

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskTC(todolistId, id))
    }, [])

    const changeTaskStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskStatusTC(id, todolistId, status))
    }, [])

    if (!isLogin){
        return <Redirect to='/login'/>
    }

    return (
        <div className="App">
            <Grid container style={{padding: "10px"}}>
                <AddItemForm addItem={addTodolist} disabled={status === 'loading'}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        return (<Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist title={tl.title}
                                              filter={tl.filter}
                                              entityStatus={tl.entityStatus}
                                              clickOnCheckBox={changeTaskStatus}
                                              editTodolistTitle={editTodolistTitle}
                                              editTaskTitle={editTaskTitle}
                                              tasks={tasks[tl.id]}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              id={tl.id}
                                              removeTodolist={removeTodolist}
                                    /></Paper></Grid>
                        )
                    })
                }
            </Grid>
        </div>
    );
}

export default TodolistsList;
