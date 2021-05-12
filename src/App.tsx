import React, {ChangeEvent, useState} from 'react'
import './App.css'
import {Todolist, TaskType} from './Todolist'
import {v1} from "uuid"
import AddItemForm from "./components/InpuPlusButton/AddItemForm";
import {AppBar, IconButton, Typography, Button, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";

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


function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    let [tasks, setTasks] = useState<TasksType>({
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


    const [todolists, setTodolists] = useState<TodolistsType>([{
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
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }

    function addTodolist(todolistTitle: string) {
        const todolistId = v1()
        const newTodolist: TodoListType = {
            id: todolistId,
            title: todolistTitle,
            filter: "All"
        }

        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [todolistId]: []})
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        setTodolists([...todolists.map(tl => {
            if (tl.id === todolistId) {
                return {...tl, filter: value}
            } else {
                return tl
            }
        })]);
    }

    function editTodolistTitle(todoListId: string, title: string) {
        setTodolists([...todolists.map(tl => {
            if (tl.id === todoListId) {
                return {...tl, title: title}
            } else {
                return tl
            }
        })])
    }


    function addTask(todolistId: string, taskValue: string) {
        if (taskValue.trim().length !== 0) {
            const newTask = {
                id: v1(), title: taskValue, isDone: false
            }
            const todolistTasks = tasks[todolistId]
            tasks[todolistId] = [newTask, ...todolistTasks]
            setTasks({...tasks})
        } else {

        }
    }

    const editTaskTitle = (value: string, todolistId: string, taskId: string) => {
        setTasks({
            ...tasks, [todolistId]: [...tasks[todolistId].map(task => {
                if (task.id === taskId) {
                    return {...task, title: value}
                } else {
                    return task
                }
            })]
        })
    }

    function removeTask(id: string, todolistId: string) {
        const todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function changeTaskStatus(id: string, newIsDoneValue: boolean, todolistId: string) {
        const todolistTasks = tasks[todolistId]
        const task = todolistTasks.find(task => task.id === id)
        if (task) {
            task.isDone = newIsDoneValue
            setTasks({...tasks});
        }
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
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {

                            return (<Grid item key={tl.id}>
                                    <Paper style={{padding: "10px"}}>
                                        <Todolist
                                            title={tl.title}
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

export default App;
