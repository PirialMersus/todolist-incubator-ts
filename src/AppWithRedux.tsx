import React, {useState} from 'react'
import './App.css'
import {TaskType, Todolist} from './Todolist'
import InputPlusButton from "./components/InpuPlusButton/InputPlusButton";
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

    const [taskValue, setTaskValue] = useState('')

    function setTempTaskValue(text: string) {
        setTaskValue(text)
    }


    function removeTodolist(todolistId: string) {
        dispatch(removeTodoListsAC(todolistId))
        delete tasks[todolistId]
    }

    function addTodolist(todolistTitle: string) {
        const action = addTodoListsAC(todolistTitle)
        dispatch(action)
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch(changeTodoListFilterAC(value, todolistId))
    }

    function editTodolistTitle(todoListId: string, title: string) {
        dispatch(changeTodoListTitleAC(todoListId, title))
    }


    function addTask(todolistId: string, taskValue: string) {
        if (taskValue.trim().length !== 0) {
            dispatch(addTaskAC(taskValue, todolistId))

        } else {

        }
    }

    const editTaskTitle = (value: string, todolistId: string, taskId: string) => {
        dispatch(editTaskTitleAC(value, todolistId, taskId))
    }

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId))
    }

    function changeTaskStatus(id: string, newIsDoneValue: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(todolistId, id, newIsDoneValue))
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={""} color="inherit" aria-label="menu">
                        <Menu open={false}/>
                    </IconButton>
                    <Typography variant="h6" className={""}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <InputPlusButton addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            const allTodolistTasks = tasks[tl.id]
                            let tasksForTodolist = allTodolistTasks

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                            }
                            return (<Grid item key={tl.id}>
                                    <Paper style={{padding: "10px"}}>
                                        <Todolist title={tl.title}
                                                  filter={tl.filter}
                                                  clickOnCheckBox={changeTaskStatus}
                                                  editTodolistTitle={editTodolistTitle}
                                                  editTaskTitle={editTaskTitle}
                                                  tasks={tasksForTodolist}
                                                  removeTask={removeTask}
                                                  changeFilter={changeFilter}
                                                  tempTaskValue={taskValue}
                                                  setTempTaskValue={setTempTaskValue}
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
