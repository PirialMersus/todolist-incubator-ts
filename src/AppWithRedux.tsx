import React, {useCallback, useEffect} from 'react'
import './App.css'
import {Todolist} from './Todolist'
import AddItemForm from "./components/AddItemForm/AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import {addTaskTC, changeTaskTitleTC, removeTaskTC, updateTaskStatusTC} from './state/tasks-reducer';
import {
    addTodolistTC,
    changeTodoListFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC
} from './state/todolists-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from './api/tasks-api';
import {RequestStatusType} from './state/app-reducer';
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import {TodolistType} from "./api/todolist-api";

// export type TodoListType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
export type TodolistsType = Array<TodolistType>

export type TasksType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks
    )
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status
    )

    // const [taskValue, setTaskValue] = useState('')

    // function setTempTaskValue(text: string) {
    //     setTaskValue(text)
    // }


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
        dispatch(changeTaskTitleTC(taskId, todolistId, value ))
    }, [])

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskTC(todolistId, id))
    }, [])

    const changeTaskStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskStatusTC(id, todolistId, status))
    }, [])

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={""} color="inherit" aria-label="menu">
                        <Menu open={false}/>
                    </IconButton>
                    <Typography variant="h6" className={""}>
                        Ne
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress color={"secondary"}/>}
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodolist}/>
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
            </Container>


        </div>
    );
}

export default AppWithRedux;
