import React, {ChangeEvent, useReducer, useState} from 'react'
import './App.css'
import {Todolist, TaskType} from './Todolist'
import {v1} from "uuid"
import InputPlusButton from "./components/InpuPlusButton/InputPlusButton";
import {AppBar, IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import {addTaskAC, tasksReducer, editTaskTitleAC, removeTaskAC, changeTaskStatusAC} from './state/tasks-reducer';
import {
    todoListReducer,
    removeTodoListsAC,
    addTodoListsAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC
} from './state/todolists-reducer';

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


function AppWithReducers() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
    });


    const [todolists, dispatchTodolists] = useReducer(todoListReducer, [{
        id: todolistId1,
        title: "First todoList",
        filter: "All"
    }, {
        id: todolistId2,
        title: "Second todoList",
        filter: "All"
    }])

    const [taskValue, setTaskValue] = useState('')

    function setTempTaskValue(text: string) {
        setTaskValue(text)
    }


    function removeTodolist(todolistId: string) {
        dispatchTodolists(removeTodoListsAC(todolistId))
        delete tasks[todolistId]
    }

    function addTodolist(todolistTitle: string) {
        const action = addTodoListsAC(todolistTitle)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchTodolists(changeTodoListFilterAC(value, todolistId))
    }

    function editTodolistTitle(todoListId: string, title: string) {
        dispatchTodolists(changeTodoListTitleAC(todoListId, title))
    }


    function addTask(todolistId: string, taskValue: string) {
        if (taskValue.trim().length !== 0) {
            dispatchTasks(addTaskAC(taskValue, todolistId))

        } else {

        }
    }

    const editTaskTitle = (value: string, todolistId: string, taskId: string) => {
        dispatchTasks(editTaskTitleAC(value, todolistId, taskId))
    }

    function removeTask(id: string, todolistId: string) {
        dispatchTasks(removeTaskAC(id, todolistId))
    }

    function changeTaskStatus(id: string, newIsDoneValue: boolean, todolistId: string) {
        dispatchTasks(changeTaskStatusAC(todolistId, id, newIsDoneValue))
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

export default AppWithReducers;
