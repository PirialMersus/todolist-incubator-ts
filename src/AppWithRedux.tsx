import React, {useCallback} from 'react'
import './App.css'
import {TaskType, Todolist} from './Todolist'
import AddItemForm from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import {addTaskAC, changeTaskStatusAC, editTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {
    addTodoListsAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListsAC
} from './state/todolists-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "All" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TodolistsType = Array<TodoListType>

export type TasksType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks
    )
    const dispatch = useDispatch()

    // const [taskValue, setTaskValue] = useState('')

    // function setTempTaskValue(text: string) {
    //     setTaskValue(text)
    // }


    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodoListsAC(todolistId))
        delete tasks[todolistId]
    },[dispatch, tasks])

    const addTodolist = useCallback((todolistTitle: string) => {
        const action = addTodoListsAC(todolistTitle)
        dispatch(action)
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodoListFilterAC(value, todolistId))
    }, [dispatch])

    const editTodolistTitle = useCallback((todoListId: string, title: string) => {
        dispatch(changeTodoListTitleAC(todoListId, title))
    }, [dispatch])


    const addTask = useCallback((todolistId: string, taskValue: string) => {
        if (taskValue.trim().length !== 0) {
            dispatch(addTaskAC(taskValue, todolistId))

        }
    }, [dispatch])

    const editTaskTitle = useCallback((value: string, todolistId: string, taskId: string) => {
        dispatch(editTaskTitleAC(value, todolistId, taskId))
    }, [dispatch])

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    }, [dispatch])

    const changeTaskStatus = useCallback((id: string, newIsDoneValue: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(todolistId, id, newIsDoneValue))
    }, [dispatch])


    return (
        <div className="App">
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
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            // const allTodolistTasks = tasks[tl.id]
                            // let tasksForTodolist = allTodolistTasks
                            //
                            // if (tl.filter === "active") {
                            //     tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                            // }
                            // if (tl.filter === "completed") {
                            //     tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                            // }
                            return (<Grid item key={tl.id}>
                                    <Paper style={{padding: "10px"}}>
                                        <Todolist title={tl.title}
                                                  filter={tl.filter}
                                                  clickOnCheckBox={changeTaskStatus}
                                                  editTodolistTitle={editTodolistTitle}
                                                  editTaskTitle={editTaskTitle}
                                                  tasks={tasks[tl.id]}
                                                  removeTask={removeTask}
                                                  changeFilter={changeFilter}
                                            // tempTaskValue={taskValue}
                                            // setTempTaskValue={setTempTaskValue}
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
